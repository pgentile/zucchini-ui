package io.testscucumber.backend.reportconverter.converter;

import io.testscucumber.backend.feature.domain.Feature;
import io.testscucumber.backend.reportconverter.report.ReportFeature;
import io.testscucumber.backend.reportconverter.report.Tag;
import io.testscucumber.backend.shared.domain.BasicInfo;
import io.testscucumber.backend.shared.domain.Location;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Component
class ReportFeatureConverter {

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

        final Feature feature = new Feature(featureKey, testRunId, info, location);
        feature.setDescription(reportFeature.getDescription());
        group.ifPresent(feature::setGroup);

        final Set<String> tags = reportFeature.getTags().stream()
            .map(Tag::getName)
            .map(ConversionUtils::stripAtSign)
            .collect(Collectors.toSet());

        feature.setTags(tags);

        return feature;
    }

}
