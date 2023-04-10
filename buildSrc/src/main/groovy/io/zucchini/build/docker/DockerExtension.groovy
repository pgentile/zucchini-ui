package io.zucchini.build.docker

import groovy.transform.PackageScope
import org.gradle.api.Project
import org.gradle.api.tasks.Input
import org.gradle.api.tasks.Optional


class DockerExtension {

    String name

    String repository

    @Input
    @Optional
    List<String> tags = []

    @Input
    @Optional
    Map<String, String> buildArgs = [:]

    DockerExtension(Project project) {
        repository = project.properties['docker.baseRepository']
        name = project.name
        tags << (project.version as String)
    }

    void tag(String tag) {
        tags << tag
    }

    void buildArg(Map<String, String> args) {
        buildArgs.putAll(args)
    }

    @PackageScope
    List<String> getFullTags() {
        String fullName = repository == null ? name : "${repository}/${name}"
        return tags.collect { "${fullName}:${it}" }
    }

}
