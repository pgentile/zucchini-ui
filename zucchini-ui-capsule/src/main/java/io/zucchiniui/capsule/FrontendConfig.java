package io.zucchiniui.capsule;

/**
 * Configuration injectée sous forme de JSON au chargement de l'UI.
 *
 * Cet objet est sérialisé en JSON pour transmission vers l'UI. Par contre, sa configuration
 * se fait bien dans le fichier YAML du serveur.
 */
public class FrontendConfig {

    private int testRunPurgeDelayInDays = 30;

    public int getTestRunPurgeDelayInDays() {
        return testRunPurgeDelayInDays;
    }

    public void setTestRunPurgeDelayInDays(int testRunPurgeDelayInDays) {
        this.testRunPurgeDelayInDays = testRunPurgeDelayInDays;
    }

}
