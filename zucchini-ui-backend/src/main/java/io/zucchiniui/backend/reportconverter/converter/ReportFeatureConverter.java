package io.zucchiniui.backend.reportconverter.converter;

import com.google.common.base.Strings;
import io.zucchiniui.backend.feature.domain.Feature;
import io.zucchiniui.backend.reportconverter.report.ReportComment;
import io.zucchiniui.backend.reportconverter.report.ReportFeature;
import io.zucchiniui.backend.reportconverter.report.Tag;
import io.zucchiniui.backend.shared.domain.BasicInfo;
import io.zucchiniui.backend.shared.domain.Location;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
class ReportFeatureConverter {

    private static final Pattern LANGUAGE_PATTERN = Pattern.compile("#\\s*language:\\s*(\\S+)\\s*");

    public Feature convert(final String testRunId, final Optional<String> group, final ReportFeature reportFeature) {
        final String featureKey = ConversionUtils.stringToSha1Sum(reportFeature.getId());

        final BasicInfo info = new BasicInfo(
            ConversionUtils.trimString(reportFeature.getKeyword()),
            ConversionUtils.trimString(reportFeature.getName())
        );

        final Location location = new Location(
            ConversionUtils.trimString(reportFeature.getFilename()),
            reportFeature.getLine()
        );

        final String language = getLanguage(reportFeature);
        final Feature feature = new Feature(featureKey, testRunId, info, location, language);
        feature.setDescription(reportFeature.getDescription());
        group.ifPresent(feature::setGroup);

        final Set<String> tags = reportFeature.getTags().stream()
            .map(Tag::getName)
            .map(ConversionUtils::stripAtSign)
            .collect(Collectors.toSet());

        feature.setTags(tags);

        return feature;
    }

    private String getLanguage(ReportFeature reportFeature) {
        return reportFeature.getComments().stream()
            .map(ReportComment::getValue)
            .filter(comment -> !Strings.isNullOrEmpty(comment))
            .flatMap(comment -> {
                // Grep language in comment
                final Matcher matcher = LANGUAGE_PATTERN.matcher(comment);
                if (matcher.find()) {
                    final String language = matcher.group(1);
                    return Stream.of(language);
                }

                // No language found
                return Stream.empty();
            })
            .findFirst()
            .orElse("en");
    }

}
