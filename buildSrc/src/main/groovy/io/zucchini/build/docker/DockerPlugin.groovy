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
        project.extensions.create('dockerCompose', DockerComposeExtension, project)

        // Add Docker tasks if Dockerfile exists
        File dockerfile = project.file('Dockerfile')
        if (dockerfile.isFile()) {
            project.logger.debug('Dockerfile detected in project {} at {}, adding Docker tasks', project.name, dockerfile)
            initDockerTasks(project)
        }

        // Add Docker Compose tasks if docker-compose.yml exists
        File dockerComposeFile = project.file("docker-compose.yml")
        if (dockerComposeFile.isFile()) {
            project.logger.debug('Docker Compose detected in project {} at {}, adding Docker Compose tasks', project.name, dockerComposeFile)
            initDockerComposeTasks(project)
        }
    }

    private static void initDockerTasks(Project project) {
        project.task(
            'dockerBuild',
            type: DockerBuildTask,
            group: TASK_GROUP,
            description: 'Build Docker image'
        )

        project.task(
            'dockerPush',
            type: DockerBuildTask,
            group: TASK_GROUP,
            description: 'Push Docker image',
        ) {
            push = true
        }

        project.task(
            'dockerClean',
            type: DockerCleanTask,
            group: TASK_GROUP,
            description: 'Clean generated Docker images'
        )
    }

    private static void initDockerComposeTasks(Project project) {
        project.task(
            'dockerComposeUp',
            type: DockerComposeUpTask,
            group: TASK_GROUP,
            description: 'Docker Compose up'
        )

        project.task(
            'dockerComposePull',
            type: DockerComposePullTask,
            group: TASK_GROUP,
            description: 'Docker Compose pull'
        )
    }

}
