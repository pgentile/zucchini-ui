package org.zucchini.build.docker

import org.gradle.api.Plugin
import org.gradle.api.Project

/**
 * Docker plugin, to build and push images.
 */
class DockerPlugin implements Plugin<Project> {

    static String TASK_GROUP = 'Docker'

    @Override
    void apply(Project project) {
        project.extensions.create('dockerCmd', DockerCommandsExtension, project)
        project.extensions.create('docker', DockerExtension, project)

        // Add Docker tasks if Dockerfile exists
        if (project.file('DockerFile').isFile()) {
            project.logger.debug('Dockerfile detected in project {}, adding Docker tasks', project.name)
            initTasks(project)
        }
    }

    private void initTasks(Project project) {
        project.task('dockerBuild', group: TASK_GROUP, description: 'Build Docker image', dependsOn: 'assemble') << {
            project.dockerCmd.build(tags: project.docker.fullTagNames, buildArgs: project.docker.buildArgs)
        }

        project.task('dockerPush', group: TASK_GROUP, description: 'Push Docker image', dependsOn: 'dockerBuild') << {
            project.dockerCmd.push(project.docker.fullTagNames)
        }

    }

}
