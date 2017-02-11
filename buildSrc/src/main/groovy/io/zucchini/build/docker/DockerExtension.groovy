package io.zucchini.build.docker

import org.gradle.api.Project
import org.gradle.api.tasks.Input
import org.gradle.api.tasks.Optional


class DockerExtension {

    String name

    String repository

    @Input
    @Optional
    List<String> tags = []

    DockerExtension(Project project) {
        repository = project.properties['docker.baseRepository']
        name = project.name
        tags << (project.version as String)
    }

    List<String> getFullTags() {
        String fullName = repository == null ? name : "${repository}/${name}"
        return tags.collect { "${fullName}:${it}" }
    }

    void tag(String tag) {
        tags << tag
    }

}
