package io.zucchini.build.node

import org.gradle.api.DefaultTask
import org.gradle.api.tasks.Input
import org.gradle.api.tasks.Optional
import org.gradle.api.tasks.TaskAction

class PNPMTask extends DefaultTask {

    @Input
    @Optional
    String command

    @Input
    @Optional
    List<String> args = []

    @TaskAction
    void run() {
        project.logger.info('Executing PNPM with command {} and arguments: {}', command, args)

        // Determine pnpm command to lauch based on current OS
        String pnpmCmd = 'pnpm'
        if (project.osdetector.os == 'windows') {
            pnpmCmd += '.cmd'
        }

        List<String> pnpmArgs = [pnpmCmd]
        if (command != null) {
            pnpmArgs << command
        }
        pnpmArgs += args

        project.exec {
            commandLine pnpmArgs
        }
    }

}
