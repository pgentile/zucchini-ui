package io.zucchini.build.docker

import org.gradle.api.DefaultTask
import org.gradle.api.tasks.Input
import org.gradle.api.tasks.Optional
import org.gradle.api.tasks.TaskAction

class DockerBuildTask extends DefaultTask {

    @Input
    @Optional
    String basePath = '.'

    @Input
    @Optional
    String dockerFile = null

    @Input
    boolean pull = true

    @Input
    @Optional
    Map<String, String> buildArgs = [:]

    @TaskAction
    void build() {

        List<String> args = ['docker', 'buildx', 'build']

        if (dockerFile != null) {
            args += ['-f', dockerFile]
        }

        args += project.docker.fullTags.collect({ ['-t', it] }).flatten()

        args += buildArgs.collect { name, value -> ['--build-arg', "${name}=${value}"] }.flatten()

        // TODO Add an option to set the target platforms
        args += ['--platform', 'linux/amd64,linux/arm64']

        args += ['--output', 'type=image']

        if (pull) {
            args << '--pull'
        }

        args << basePath

        project.logger.info('Executing Docker build with arguments: {}', args)
        project.exec {
            commandLine args
        }
    }

    void buildArg(Map<String, String> args) {
        buildArgs.putAll(args)
    }

}
