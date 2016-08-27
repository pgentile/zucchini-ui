package org.zucchini.build.node

import org.gradle.api.DefaultTask
import org.gradle.api.tasks.Input
import org.gradle.api.tasks.Optional
import org.gradle.api.tasks.TaskAction

class NodeTask extends DefaultTask {

    @Input
    @Optional
    List<String> args = []

    @TaskAction
    void run() {
        project.logger.info('Executing Node with arguments: {}', args)

        List<String> nodeArgs = ['node']
        nodeArgs += args

        project.exec {
            commandLine nodeArgs
        }
    }

}
