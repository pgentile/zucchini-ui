package io.zucchiniui.backend.scenario.domain;

import io.zucchiniui.backend.scenario.views.ScenarioListItemView;
import org.apache.commons.lang3.StringUtils;

import java.util.*;

/**
 * Utility class for regrouping errorMessages
 */
public final class ErrorMessageGroupingUtils {

    // Number of characters to process for computing distances
    public static final int NB_CHARACTERS_TO_PROCESS = 300;

    // Maximum computed distance to consider 2 error messages as similar
    private static final int MAX_DISTANCE_FOR_GROUPING = NB_CHARACTERS_TO_PROCESS / 10;

    private ErrorMessageGroupingUtils() {
        // Utils class should not be instantiated
    }

    /**
     * Method indicating if a message can be considered similar, based on Levenshtein distance calculation with an allowed variation of 10%
     *
     * <b>Note:</b> Max tolerated distance is derived from the current scenario's error message
     * The arbitrary "10" means we consider 10% change to be acceptable
     *
     * @param referenceText the reference text
     * @param targetText the target text for the comparison
     * @return true if the can be considered similar else false
     */
    public static boolean isSimilar(String referenceText, String targetText) {
        int distance = StringUtils.getLevenshteinDistance(referenceText, targetText);

        return distance < referenceText.length() / 10;
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
    public static Map<String, List<String>> computeDistance(List<ScenarioListItemView> scenarii) {
        Map<String, List<String>> distances = new TreeMap<>();
        scenarii.forEach(scenario -> {
            String currentErrMsgText = StringUtils.left(scenario.getErrorMessage(), NB_CHARACTERS_TO_PROCESS);
            String closestMatch = computeClosest(distances.keySet(), currentErrMsgText);
            if (closestMatch != null) {
                distances.get(closestMatch).add(scenario.getId());
            } else {
                List<String> noMatch = new ArrayList<>();
                noMatch.add(scenario.getId());
                distances.put(currentErrMsgText, noMatch);
            }
        });
        return distances;
    }

    /**
     * Method computing the closest existing errorMessage if it exists
     *
     * @param existingMatches already computed error message matches
     * @param targetText      the text to check against the existing matches
     * @return the closest key satisfying the MAX_DISTANCE_FOR_GROUPING, or null if none was found
     */
    private static String computeClosest(Set<String> existingMatches, String targetText) {

        int closestDistance = Integer.MAX_VALUE;
        String closestExistingMatchKey = null;

        // FIXME Optimize processing time by avoiding unnecessary calls to the greedy LevenshteinDistance
        for (String current : existingMatches) {

                int distance = StringUtils.getLevenshteinDistance(current, targetText);
                if (distance == 0) {
                    // Exact match
                    closestExistingMatchKey = current;
                    break;
                } else if (distance < MAX_DISTANCE_FOR_GROUPING && distance < closestDistance) {
                    // Current existingMatchKey is closer to targetText
                    closestDistance = distance;
                    closestExistingMatchKey = current;
                }

        }
        return closestExistingMatchKey;
    }
}
