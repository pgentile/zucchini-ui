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

        if (project.file('yarn.lock').isFile()) {
            initYarnTasks(project)
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

    private void initYarnTasks(Project project) {
        project.task('yarnInstall', type: YarnTask, group: TASK_GROUP, description: 'Install Node dependencies with Yarn') {
            command = 'install'
        }

        project.task('yarnUpgrade', type: YarnTask, group: TASK_GROUP, description: 'Update Node dependencies with Yarn') {
            command = 'upgrade'
        }
    }

}
