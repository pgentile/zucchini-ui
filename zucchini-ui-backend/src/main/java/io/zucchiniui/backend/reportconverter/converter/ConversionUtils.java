package io.zucchiniui.backend.reportconverter.converter;

import com.google.common.base.CharMatcher;
import com.google.common.hash.Hashing;

import java.nio.charset.StandardCharsets;

final class ConversionUtils {

    private static final CharMatcher AT_SIGN_MATCHER = CharMatcher.is('@');

    private ConversionUtils() {
    }

    @SuppressWarnings("deprecation")
    public static String stringToSha1Sum(final String source) {
        if (source == null) {
            return null;
        }

        // Can't use another algorithm. It will break links between features and scenarios of different test runs
        return Hashing.sha1().hashString(source, StandardCharsets.UTF_8).toString();
    }

    public static String stripAtSign(final String source) {
        if (source == null) {
            return null;
        }
        return AT_SIGN_MATCHER.trimLeadingFrom(source);
    }

    public static String trimString(final String source) {
        if (source == null) {
            return null;
        }
        return CharMatcher.whitespace().trimFrom(source);
    }

}
