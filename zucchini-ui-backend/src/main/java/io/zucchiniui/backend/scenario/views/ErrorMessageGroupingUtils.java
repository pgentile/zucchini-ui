package io.zucchiniui.backend.scenario.views;

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
     * Method computing the distances between the error messages output
     *
     * @param scenarii All scenarii to consider during the computation
     * @return List of failed scenarii grouped by their errorMessage
     */
    public static List<GroupedFailuresListItemView> computeDistance(List<FailedScenarioListItemView> scenarii) {
        List<GroupedFailuresListItemView> distances =  new ArrayList<>();
        scenarii.forEach(scenario -> {
            boolean matchFound = false;
            for (GroupedFailuresListItemView current : distances) {
                if(isSimilar(current.getErrorMessage(), scenario.getErrorMessage())){
                    current.addFailedScenario(scenario);
                    matchFound = true;
                    break;
                }
            }
            if (!matchFound) {
                GroupedFailuresListItemView noMatch = new GroupedFailuresListItemView();
                noMatch.setErrorMessage(scenario.getErrorMessage());
                noMatch.addFailedScenario(scenario);
                distances.add(noMatch);
            }
        });
        return distances;
    }
}
