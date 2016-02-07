package io.testscucumber.backend.reportconverter.converter;

import io.testscucumber.backend.feature.domain.Feature;
import io.testscucumber.backend.reportconverter.report.ReportBackground;
import io.testscucumber.backend.reportconverter.report.ReportFeature;
import io.testscucumber.backend.reportconverter.report.ReportFeatureElement;
import io.testscucumber.backend.reportconverter.report.ReportScenario;
import io.testscucumber.backend.scenario.domain.BackgroundBuilder;
import io.testscucumber.backend.scenario.domain.Scenario;
import io.testscucumber.backend.scenario.domain.ScenarioBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Consumer;
import java.util.stream.Collectors;


@Component
public class ReportConverter {

    private final ReportFeatureConverter reportFeatureConverter;

    private final ReportScenarioConverter reportScenarioConverter;

    @Autowired
    public ReportConverter(
        final ReportFeatureConverter reportFeatureConverter,
        final ReportScenarioConverter reportScenarioConverter
    ) {
        this.reportFeatureConverter = reportFeatureConverter;
        this.reportScenarioConverter = reportScenarioConverter;
    }

    public ConversionResult convert(
        final String testRunId,
        final Optional<String> group,
        final ReportFeature reportFeature
    ) {
        final Feature feature = reportFeatureConverter.convert(testRunId, group, reportFeature);
        final List<Scenario> scenarii = convertFeatureElementsToScenarii(feature, reportFeature.getElements());
        return new ConversionResult(feature, scenarii);
    }

    private List<Scenario> convertFeatureElementsToScenarii(
        final Feature feature,
        final List<ReportFeatureElement> reportFeatureElements
    ) {

        final List<ScenarioBuilder> scenarioBuilders = new ArrayList<>(reportFeatureElements.size());

        Consumer<BackgroundBuilder> backgroundBuilderConsumer = null;

        for (final ReportFeatureElement reportFeatureElement : reportFeatureElements) {
            if (reportFeatureElement instanceof ReportScenario) {

                final ScenarioBuilder scenarioBuilder = reportScenarioConverter.createScenarioBuilder(
                    feature,
                    (ReportScenario) reportFeatureElement
                );

                if (backgroundBuilderConsumer != null) {
                    scenarioBuilder.withBackground(backgroundBuilderConsumer);
                }

                scenarioBuilders.add(scenarioBuilder);

            } else if (reportFeatureElement instanceof ReportBackground) {
                backgroundBuilderConsumer = reportScenarioConverter.createBackgroundBuilderConsumer((ReportBackground) reportFeatureElement);
            } else {
                throw new IllegalStateException("Unhandled type: " + reportFeatureElement);
            }
        }

        return scenarioBuilders.stream()
            .map(ScenarioBuilder::build)
            .collect(Collectors.toList());
    }

}
