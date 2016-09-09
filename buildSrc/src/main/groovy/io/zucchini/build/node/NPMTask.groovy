package io.zucchini.build.node

import org.gradle.api.DefaultTask
import org.gradle.api.tasks.Input
import org.gradle.api.tasks.Optional
import org.gradle.api.tasks.TaskAction

class NPMTask extends DefaultTask {

    @Input
    String command

    @Input
    @Optional
    List<String> args = []

    @TaskAction
    void run() {
        project.logger.info('Executing NPM with command {} and arguments: {}', command, args)

        // Determine npm command to lauch based on current OS
        String npmCmd = 'npm'
        if (project.osdetector.os == 'windows') {
            npmCmd += '.cmd'
        }

        List<String> npmArgs = [npmCmd, command]
        npmArgs += args

        project.exec {
            commandLine npmArgs
        }
    }

}
