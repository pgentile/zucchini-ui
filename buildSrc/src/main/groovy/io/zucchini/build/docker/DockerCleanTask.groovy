package io.zucchini.build.docker

import org.gradle.api.DefaultTask
import org.gradle.api.tasks.TaskAction
import org.gradle.process.ExecOperations

import javax.inject.Inject

class DockerCleanTask extends DefaultTask {

    private ExecOperations execOperations

    @Inject
    DockerCleanTask(ExecOperations execOperations) {
        this.execOperations = execOperations
    }

    @TaskAction
    void build() {
        def operations = this.execOperations

        project.docker.fullTags.each { tag ->
            project.logger.info('Removing Docker image with tag {}', tag)

            operations.exec {
                it.commandLine = args
                it.ignoreExitValue = true
            }
        }
    }

}
