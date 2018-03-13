package io.zucchiniui.backend.scenario.views;

import org.apache.commons.text.similarity.LevenshteinDistance;

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
     * <p>
     * <b>Note:</b> Max tolerated distance is derived from the current scenario's error message
     * The arbitrary MAX_DISTANCE_DIFF_RATIO (10%) means we consider 10% change to be acceptable
     *
     * @param referenceText the reference text
     * @param targetText    the target text for the comparison
     * @return true if the can be considered similar else false
     */
    public static boolean isSimilar(String referenceText, String targetText) {
        final int threshold = Math.round(MAX_DISTANCE_DIFF_RATIO * referenceText.length());
        final LevenshteinDistance levenshteinDistance = new LevenshteinDistance(threshold);
        return levenshteinDistance.apply(referenceText, targetText) != -1;
    }

}
