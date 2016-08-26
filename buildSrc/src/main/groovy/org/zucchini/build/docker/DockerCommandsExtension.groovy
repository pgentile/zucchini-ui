package org.zucchini.build.docker

import org.gradle.api.Project

/**
 * Project extension that provides wrapper around Docker commands.
 */
class DockerCommandsExtension {

    private final Project project

    DockerCommandsExtension(Project project) {
        this.project = project
    }

    /**
     * Build a Docker image.
     *
     * @param params Build arguments
     */
    void build(Map<String, Object> params) {
        params.putIfAbsent('basePath', '.')
        params.putIfAbsent('dockerFile', null)
        params.putIfAbsent('tags', [])
        params.putIfAbsent('pull', false)
        params.putIfAbsent('buildArgs', [:])

        List<String> args = ['docker', 'build']

        String dockerFile = params['dockerFile'] as String
        if (dockerFile != null) {
            args += ['-f', dockerFile]
        }

        List<String> tags = params['tags'] as List<String>
        args += tags.collect({ ['-t', it] }).flatten()

        Map<String, String> buildArgs = params['buildArgs'] as Map<String, String>
        args += buildArgs.collect { name, value -> ['--build-arg', "${name}=${value}"] }.flatten()

        if (params['pull'] == true) {
            args << '--pull'
        }

        String basePath = params['basePath'] as String
        args << basePath

        project.exec {
            commandLine args
        }
    }

    /**
     * Push a Docker image.
     *
     * @param localTags Local tags to push to remote repository
     */
    void push(List<String> localTags) {
        Project currentProject = project
        localTags.each { localTag ->
            currentProject.exec {
                commandLine 'docker', 'push', localTag
            }
        }
    }

}
