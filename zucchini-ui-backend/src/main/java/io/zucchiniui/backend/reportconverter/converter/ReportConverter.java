package io.zucchiniui.backend.reportconverter.converter;

import io.zucchiniui.backend.feature.domain.Feature;
import io.zucchiniui.backend.reportconverter.report.*;
import io.zucchiniui.backend.scenario.domain.BackgroundBuilder;
import io.zucchiniui.backend.scenario.domain.Scenario;
import io.zucchiniui.backend.scenario.domain.ScenarioBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Consumer;


@Component
public class ReportConverter {

    private static final Logger LOGGER = LoggerFactory.getLogger(ReportConverter.class);

    private final ReportFeatureConverter reportFeatureConverter;

    private final ReportScenarioConverter reportScenarioConverter;

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
            } else if (reportFeatureElement instanceof ReportScenarioOutline) {
                LOGGER.debug("Ignoring scenario outline: {}", reportFeatureElement);
            } else {
                throw new IllegalStateException("Unhandled type: " + reportFeatureElement);
            }
        }

        return scenarioBuilders.stream()
            .map(ScenarioBuilder::build)
            .toList();
    }

}
