package io.zucchini.build.docker

import org.gradle.api.DefaultTask
import org.gradle.api.Project
import org.gradle.api.tasks.Input
import org.gradle.api.tasks.TaskAction

class DockerPushTask extends DefaultTask {

    @Input
    List<String> localTags

    @TaskAction
    void push() {
        Project projectRef = project
        localTags.each { localTag ->
            projectRef.exec {
                commandLine 'docker', 'push', localTag
            }
        }
    }

}
