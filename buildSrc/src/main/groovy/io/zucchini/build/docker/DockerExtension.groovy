package io.zucchini.build.docker

import groovy.transform.PackageScope
import org.gradle.api.Project
import org.gradle.api.tasks.Input
import org.gradle.api.tasks.Optional


class DockerExtension {

    String name

    @Input
    @Optional
    List<String> repositories = []

    @Input
    @Optional
    List<String> tags = []

    DockerExtension(Project project) {
        name = project.name
        tags << (project.version as String)
    }

    @PackageScope
    List<String> getFullTags() {
        return repositories
            .collect { repository ->
                tags.collect { tag -> "$repository/${name}:$tag" }
            }
            .flatten()
    }

}
