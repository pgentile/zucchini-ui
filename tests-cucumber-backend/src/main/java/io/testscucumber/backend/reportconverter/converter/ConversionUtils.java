package io.testscucumber.backend.reportconverter.converter;

import com.google.common.base.CharMatcher;
import com.google.common.hash.Hashing;
import io.testscucumber.backend.reportconverter.report.ReportComment;
import io.testscucumber.backend.reportconverter.report.TableRow;
import io.testscucumber.backend.scenario.domain.StepStatus;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

final class ConversionUtils {

    private static final CharMatcher AT_SIGN_MATCHER = CharMatcher.is('@');

    private ConversionUtils() {
    }

    public static String stringToSha1Sum(final String source) {
        if (source == null) {
            return null;
        }
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
        return CharMatcher.WHITESPACE.trimFrom(source);
    }

    public static String[][] convertTable(final List<TableRow> source) {
        if (source == null || source.isEmpty()) {
            return null;
        }

        final String[][] table = new String[source.size()][];

        int i = 0;
        for (final TableRow sourceRow : source) {
            final String[] targetRow = new String[sourceRow.getCells().size()];
            int j = 0;
            for (final String cell : sourceRow.getCells()) {
                targetRow[j] = cell;
                j++;
            }
            table[i] = targetRow;
            i++;
        }

        return table;
    }

    public static String convertComment(final List<ReportComment> source) {
        if (source == null || source.isEmpty()) {
            return null;
        }

        return source.stream()
            .map(ReportComment::getValue)
            .collect(Collectors.joining("\n"));
    }

    public static StepStatus convertStepStatus(final String source) {
        if (source == null) {
            return null;
        }
        return StepStatus.valueOf(source.toUpperCase());
    }

}
