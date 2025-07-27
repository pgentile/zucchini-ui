package io.zucchini.build.docker

import org.gradle.api.DefaultTask
import org.gradle.api.tasks.Input
import org.gradle.api.tasks.Optional
import org.gradle.api.tasks.TaskAction
import org.gradle.process.ExecOperations

import javax.inject.Inject

class DockerComposePullTask extends DefaultTask {

    private ExecOperations execOperations

    @Inject
    DockerComposePullTask(ExecOperations execOperations) {
        this.execOperations = execOperations
    }

    @TaskAction
    void build() {
        List<String> args = ['docker', 'compose', 'pull']
        Map<String, String> env = project.dockerCompose.env

        project.logger.info('Executing Docker Compose with arguments: {}', args)
        project.logger.info('Executing Docker Compose with env: {}', env)

        execOperations.exec {
            it.commandLine args
            it.environment env
        }
    }

}
