package io.zucchini.build.docker

import org.gradle.api.DefaultTask
import org.gradle.api.Project
import org.gradle.api.tasks.TaskAction

class DockerPushTask extends DefaultTask {

    @TaskAction
    void push() {
        Project projectRef = project
        project.docker.fullTags.each { tag ->
            projectRef.exec {
                commandLine 'docker', 'push', tag
            }
        }
    }

}
