package io.zucchini.build.node

import org.gradle.api.DefaultTask
import org.gradle.api.tasks.Input
import org.gradle.api.tasks.Optional
import org.gradle.api.tasks.TaskAction

class YarnTask extends DefaultTask {

    @Input
    @Optional
    String command

    @Input
    @Optional
    List<String> args = []

    @TaskAction
    void run() {
        project.logger.info('Executing Yarn with command {} and arguments: {}', command, args)

        // Determine yarn command to lauch based on current OS
        String yarnCmd = 'yarn'
        if (project.osdetector.os == 'windows') {
            yarnCmd += '.cmd'
        }

        List<String> yarnArgs = [yarnCmd]
        if (command != null) {
            yarnArgs << command
        }
        yarnArgs += args

        project.exec {
            commandLine yarnArgs
        }
    }

}
