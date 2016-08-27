package org.zucchini.build.node

import org.gradle.api.Plugin
import org.gradle.api.Project

/**
 * Node plugin, that integrates Gradle with common Node programs, like: Grunt, Bower, NPM.
 */
class NodePlugin implements Plugin<Project> {

    static String TASK_GROUP = 'Node'

    @Override
    void apply(Project project) {
        project.apply plugin: 'com.google.osdetector'

        if (project.file('bower.json').isFile()) {
            initBowerTasks(project)
        }

        if (project.file('package.json').isFile()) {
            initNPMTasks(project)
        }

        if (project.file('Gruntfile.js').isFile()) {
            initGruntTasks(project)
        }
    }

    private void initBowerTasks(Project project) {
        project.task('bowerInstall', type: BowerTask, group: TASK_GROUP, description: 'Install Bower components') {
            command = 'install'
        }

        project.task('bowerUpdate', type: BowerTask, group: TASK_GROUP, description: 'Update Bower components') {
            command = 'update'
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

    private void initGruntTasks(Project project) {
        project.task('gruntBuild', type: GruntTask, group: TASK_GROUP, description: 'Lauch Grunt build')
    }

}
