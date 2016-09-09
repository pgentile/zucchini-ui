package io.zucchini.build.docker

import org.gradle.api.Project


class DockerExtension {

    String repository

    String name

    List<String> tags = []

    Map<String, String> buildArgs = [:]

    boolean pull = true

    DockerExtension(Project project) {
        repository = project.properties['docker.baseRepository']
        name = project.name

        if (project.version) {
            tags << (project.version as String)
        }
    }

    String getFullName() {
        if (repository == null) {
            return name
        }
        return "${repository}/${name}"
    }

    List<String> getFullTagNames() {
        return tags.collect { "${fullName}:${it}" }
    }

    void tag(String tag) {
        tags << tag
    }

    void buildArg(String name, String value) {
        buildArgs[name] = value
    }

}
