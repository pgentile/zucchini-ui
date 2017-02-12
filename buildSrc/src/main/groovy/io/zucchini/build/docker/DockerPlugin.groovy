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
        File dockerfile = project.file('Dockerfile')
        if (dockerfile.isFile()) {
            project.logger.debug('Dockerfile detected in project {} at {}, adding Docker tasks', project.name, dockerfile)
            initTasks(project)
        }
    }

    private static void initTasks(Project project) {
        Task buildTask = project.task('dockerBuild', type: DockerBuildTask, group: TASK_GROUP, description: 'Build Docker image')

        project.task('dockerPush', type: DockerPushTask, group: TASK_GROUP, description: 'Push Docker image', dependsOn: buildTask)

        project.afterEvaluate {

            if (project.tasks.findByName('assemble') != null) {
                buildTask.dependsOn 'assemble'
            }

        }
    }

}
