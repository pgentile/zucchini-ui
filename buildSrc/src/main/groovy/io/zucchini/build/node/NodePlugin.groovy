package io.zucchini.build.node

import org.gradle.api.Plugin
import org.gradle.api.Project

/**
 * Node plugin, that integrates Gradle with NPM.
 */
class NodePlugin implements Plugin<Project> {

    static String TASK_GROUP = 'Node'

    @Override
    void apply(Project project) {
        project.apply plugin: 'com.google.osdetector'

        if (project.file('package.json').isFile()) {
            initNPMTasks(project)
        }
    }

    private void initNPMTasks(Project project) {
        project.task('npmInstall', type: NPMTask, group: TASK_GROUP, description: 'Install NPM components') {
            command = 'install'
        }

        project.task('npmUpdate', type: NPMTask, group: TASK_GROUP, description: 'Update NPM components') {
            command = 'update'
        }
    }

}
