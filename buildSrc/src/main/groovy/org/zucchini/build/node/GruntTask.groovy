package org.zucchini.build.node

import org.gradle.api.DefaultTask
import org.gradle.api.tasks.Input
import org.gradle.api.tasks.Optional
import org.gradle.api.tasks.TaskAction

class GruntTask extends DefaultTask {

    @Input
    @Optional
    String command

    @TaskAction
    void run() {
        project.logger.info('Executing Grunt with command: {}', command)

        // Determine grunt command to lauch based on current OS
        String gruntCmd = 'grunt'
        if (project.osdetector.os == 'windows') {
            gruntCmd += '.cmd'
        }

        List<String> gruntArgs = [gruntCmd]
        if (command != null) {
            gruntArgs << command
        }

        project.exec {
            commandLine gruntArgs
        }
    }

}
