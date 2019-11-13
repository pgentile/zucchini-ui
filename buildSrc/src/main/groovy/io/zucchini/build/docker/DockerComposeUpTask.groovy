package io.zucchini.build.docker

import org.gradle.api.DefaultTask
import org.gradle.api.tasks.Input
import org.gradle.api.tasks.Optional
import org.gradle.api.tasks.TaskAction

class DockerComposeUpTask extends DefaultTask {

    @Input
    boolean detach = false

    @Input
    @Optional
    Map<String, String> env = [:]

    @TaskAction
    void build() {

        List<String> args = ['docker-compose', 'up']

        if (detach) {
            args << "-d"
        }

        project.logger.info('Executing Docker build with arguments: {}', args)
        project.exec {
            environment env
            commandLine args
        }
    }

    void environment(String name, String value) {
        env.put(name, value)
    }

    void environment(Map<String, String> otherEnv) {
        env.putAll(otherEnv)
    }

}
