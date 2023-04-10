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
    boolean push = false

    @TaskAction
    void build() {

        List<String> args = ['docker', 'buildx', 'build']

        if (dockerFile != null) {
            args += ['-f', dockerFile]
        }

        args += project.docker.fullTags.collect({ ['--tag', it] }).flatten()

        args += project.docker.buildArgs.collect { name, value -> ['--build-arg', "${name}=${value}"] }.flatten()

        if (push) {
            args += ['--output', 'type=registry', '--platform', 'linux/amd64,linux/arm64']
        } else {
            args += ['--output', 'type=docker']
        }

        if (pull) {
            args << '--pull'
        }

        args << basePath

        project.logger.info('Executing Docker build with arguments: {}', args)
        project.exec {
            commandLine args
        }
    }

}
