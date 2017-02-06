package io.zucchini.build.docker

import org.gradle.api.Plugin
import org.gradle.api.Project
import org.gradle.api.Task

/**
 * Docker plugin, to build and push images.
 */
class DockerPlugin implements Plugin<Project> {

    static String TASK_GROUP = 'Docker'

    @Override
    void apply(Project project) {
        project.extensions.create('docker', DockerExtension, project)

        // Add Docker tasks if Dockerfile exists
        if (project.file('DockerFile').isFile()) {
            project.logger.debug('Dockerfile detected in project {}, adding Docker tasks', project.name)
            initTasks(project)
        }
    }

    private void initTasks(Project project) {
        Task buildTask = project.task('dockerBuild', type: DockerBuildTask, group: TASK_GROUP, description: 'Build Docker image') {
            tags = project.docker.fullTagNames
            buildArgs = project.docker.buildArgs
            pull = project.docker.pull
        }

        project.task('dockerPush', type: DockerPushTask, group: TASK_GROUP, description: 'Push Docker image', dependsOn: buildTask) {
            localTags = project.docker.fullTagNames
        }

        project.afterEvaluate {

            if (project.tasks.findByName('assemble') != null) {
                buildTask.dependsOn 'assemble'
            }

        }
    }

}
