package io.zucchiniui.backend.scenario.domain;

import io.zucchiniui.backend.scenario.views.ScenarioListItemView;
import org.apache.commons.lang3.StringUtils;

import java.util.*;

/**
 * Utility class for regrouping errorMessages
 */
public final class ErrorMessageGroupingUtils {

    // Maximum computed distance ratio to consider 2 error messages as similar
    private static final float MAX_DISTANCE_DIFF_RATIO = 0.1f;

    private ErrorMessageGroupingUtils() {
        // Utils class should not be instantiated
    }

    /**
     * Method indicating if a message can be considered similar, based on Levenshtein distance calculation with an allowed variation of 10%
     *
     * <b>Note:</b> Max tolerated distance is derived from the current scenario's error message
     * The arbitrary MAX_DISTANCE_DIFF_RATIO (10%) means we consider 10% change to be acceptable
     *
     * @param referenceText the reference text
     * @param targetText the target text for the comparison
     * @return true if the can be considered similar else false
     */
    public static boolean isSimilar(String referenceText, String targetText) {
        return StringUtils.getLevenshteinDistance(referenceText, targetText, Math.round(MAX_DISTANCE_DIFF_RATIO * referenceText.length())) != -1;
    }

    /**
     * Utility method returning the error message in the scenario if present
     * @param scenario the current scenario
     * @return the error message contained in one of the steps (if any)
     */
    public static String extractErrorMessage(Scenario scenario) {
        return scenario.getSteps()
            .stream()
            .filter(step -> StringUtils.isNotBlank(step.getErrorMessage()))
            .findFirst()
            .map(Step::getErrorMessage)
            .orElse(StringUtils.EMPTY);
    }

    /**
     * Method computing the distances between the error messages output
     *
     * @param scenarii All scenarii to consider during the computation
     * @return Map containing the error message as key and all similar failedScenarioIds as value
     */
    public static Map<String, List<ScenarioListItemView>> computeDistance(List<ScenarioListItemView> scenarii) {
        Map<String, List<ScenarioListItemView>> distances = new TreeMap<>();
        scenarii.forEach(scenario -> {
            String closestMatch = null;


            for (String current : distances.keySet()) {
                if(isSimilar(current, scenario.getErrorMessage())){
                    closestMatch = current;
                    break;
                }
            }

            if (closestMatch != null) {
                distances.get(closestMatch).add(scenario);
            } else {
                List<ScenarioListItemView> noMatch = new ArrayList<>();
                noMatch.add(scenario);
                distances.put(scenario.getErrorMessage(), noMatch);
            }
        });
        return distances;
    }
}
