package io.zucchini.build.docker

import org.gradle.api.DefaultTask
import org.gradle.api.tasks.Input
import org.gradle.api.tasks.Optional
import org.gradle.api.tasks.TaskAction
import org.gradle.process.ExecOperations

import javax.inject.Inject

class DockerComposeUpTask extends DefaultTask {

    @Input
    boolean detach = false

    private ExecOperations execOperations

    @Inject
    DockerComposeUpTask(ExecOperations execOperations) {
        this.execOperations = execOperations
    }

    @TaskAction
    void build() {
        List<String> args = ['docker', 'compose', 'up']

        if (detach) {
            args << "-d"
        }

        project.logger.info('Executing Docker Compose with arguments: {}', args)

        Map<String, String> env = project.dockerCompose.env

        execOperations.exec {
            it.commandLine args
            it.environment env
        }
    }

}
