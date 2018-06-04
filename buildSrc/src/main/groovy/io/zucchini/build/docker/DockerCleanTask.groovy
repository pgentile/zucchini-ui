package io.zucchini.build.docker

import org.gradle.api.DefaultTask
import org.gradle.api.tasks.TaskAction

class DockerCleanTask extends DefaultTask {

    @TaskAction
    void build() {
        project.docker.fullTags.each { tag ->
            project.logger.info('Removing Docker image with tag {}', tag)
            project.exec {
                commandLine "docker", "image", "rm", tag
                ignoreExitValue = true
            }
        }
    }

}
