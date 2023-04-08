package io.zucchini.build.docker

import org.gradle.api.DefaultTask
import org.gradle.api.tasks.Input
import org.gradle.api.tasks.Optional
import org.gradle.api.tasks.TaskAction

class DockerBuildTask extends DefaultTask {

    @Input
    boolean pull = true

    @Input
    boolean push = false

    @TaskAction
    void build() {

        List<String> args = ['docker', 'buildx', 'build']

        if (project.docker.dockerFile != null) {
            args += ['-f', project.docker.dockerFile]
        }

        args += project.docker.fullTags.collect({ ['--tag', it] }).flatten()

        args += project.docker.buildArgs.collect { name, value -> ['--build-arg', "${name}=${value}"] }.flatten()

        if (push) {
            args += ['--output', 'type=registry']

            if (!project.docker.platforms.isEmpty()) {
                args << '--platform'
                args << project.docker.platforms.join(',')
            }
        } else {
            args += ['--output', 'type=docker']
        }

        // TODO Add an option to set the target platforms
        args += ['--platform', 'linux/amd64,linux/arm64']

        args += ['--output', 'type=image']

        if (pull) {
            args << '--pull'
        }

        args << project.docker.basePath

        project.logger.info('Executing Docker build with arguments: {}', args)
        project.exec {
            commandLine args
        }
    }

}
