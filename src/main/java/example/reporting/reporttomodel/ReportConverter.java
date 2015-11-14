package example.reporting.reporttomodel;

import example.reporting.model.Background;
import example.reporting.model.Feature;
import example.reporting.model.FeatureElement;
import example.reporting.model.Scenario;
import example.reporting.report.ReportFeature;
import example.reporting.report.ReportFeatureElement;
import ma.glasnost.orika.BoundMapperFacade;

import java.util.ArrayList;
import java.util.List;

public class ReportConverter {

    private final ReportMapper reportMapper = new ReportMapper();

    private final BoundMapperFacade<ReportFeature, Feature> featureMapper = reportMapper.dedicatedMapperFor(
            ReportFeature.class,
            Feature.class,
            false
    );

    private final BoundMapperFacade<ReportFeatureElement, FeatureElement> featureElementMapper = reportMapper.dedicatedMapperFor(
            ReportFeatureElement.class,
            FeatureElement.class,
            false
    );

    public ConversionResult convert(final String testRunId, final ReportFeature reportFeature) {
        final Feature feature = featureMapper.map(reportFeature);
        final List<Scenario> scenarii = convertFeatureElementsToScenarii(reportFeature.getElements());

        feature.setTestRunId(testRunId);

        for (final Scenario scenario: scenarii) {
            scenario.setFeatureId(feature.getId());
            scenario.setTestRunId(testRunId);
            scenario.getTags().addAll(feature.getTags());
        }

        return new ConversionResult(feature, scenarii);
    }

    private List<Scenario> convertFeatureElementsToScenarii(final List<ReportFeatureElement> reportFeatureElements) {
        Background currentBackground = null;

        final List<Scenario> scenarii = new ArrayList<>(reportFeatureElements.size());

        for (final ReportFeatureElement reportFeatureElement: reportFeatureElements) {
            final FeatureElement featureElement = featureElementMapper.map(reportFeatureElement);
            if (featureElement instanceof Scenario) {
                final Scenario scenario = (Scenario) featureElement;
                if (currentBackground != null) {
                    scenario.setBackground(currentBackground);
                }
                scenarii.add(scenario);
            } else if (featureElement instanceof Background) {
                currentBackground = (Background) featureElement;
            } else {
                throw new IllegalStateException("Unhandled type: " + featureElement.getClass());
            }
        }

        return scenarii;
    }

}
