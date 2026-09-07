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

        if (project.file('pnpm-lock.yaml').isFile()) {
            initPNPMTasks(project)
        }
    }

    private void initNPMTasks(Project project) {
        project.task('npmInstall', type: NPMTask, group: TASK_GROUP, description: 'Install Node dependencies with NPM') {
            command = 'install'
        }

        project.task('npmUpdate', type: NPMTask, group: TASK_GROUP, description: 'Update Node dependencies with NPM') {
            command = 'update'
        }
    }

    private void initPNPMTasks(Project project) {
        project.task('pnpmInstall', type: PNPMTask, group: TASK_GROUP, description: 'Install Node dependencies with PNPM') {
            command = 'install'
        }

        project.task('pnpmUpdate', type: PNPMTask, group: TASK_GROUP, description: 'Update Node dependencies with PNPM') {
            command = 'update'
        }
    }

}
