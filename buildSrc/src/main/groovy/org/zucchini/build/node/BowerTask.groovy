package org.zucchini.build.node

import org.gradle.api.DefaultTask
import org.gradle.api.tasks.Input
import org.gradle.api.tasks.Optional
import org.gradle.api.tasks.TaskAction

class BowerTask extends DefaultTask {

    @Input
    String command

    @Input
    @Optional
    List<String> args = []

    @TaskAction
    void run() {
        project.logger.info('Executing Bower with arguments: {}', args)

        // Determine bower command to lauch based on current OS
        String bowerCmd = 'bower'
        if (project.osdetector.os == 'windows') {
            bowerCmd += '.cmd'
        }

        List<String> bowerArgs = [bowerCmd, command]
        bowerArgs += args

        project.exec {
            commandLine bowerArgs
        }
    }

}
