package io.zucchini.build.docker

import org.gradle.api.DefaultTask
import org.gradle.api.tasks.Input
import org.gradle.api.tasks.Optional
import org.gradle.api.tasks.TaskAction

class DockerComposePullTask extends DefaultTask {

    @TaskAction
    void build() {
        List<String> args = ['docker', 'compose', 'pull']
        Map<String, String> env = project.dockerCompose.env

        project.logger.info('Executing Docker Compose with arguments: {}', args)
        project.logger.info('Executing Docker Compose with env: {}', env)

        project.exec {
            environment env
            commandLine args
        }
    }

}
