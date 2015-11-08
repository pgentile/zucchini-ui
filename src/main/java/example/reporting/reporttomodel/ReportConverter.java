package example.reporting.reporttomodel;

import example.reporting.model.Feature;
import example.reporting.model.FeatureElement;
import example.reporting.model.Scenario;
import example.reporting.model.Step;
import example.reporting.report.ReportFeature;
import ma.glasnost.orika.BoundMapperFacade;

import java.util.Set;

public class ReportConverter {

    private final ReportMapper reportMapper = new ReportMapper();

    private final BoundMapperFacade<ReportFeature, Feature> mapper = reportMapper.dedicatedMapperFor(
            ReportFeature.class,
            Feature.class,
            false
    );

    public Feature convert(ReportFeature reportFeature) {
        Feature feature = mapper.map(reportFeature);

        final String featureFilename = feature.getLocation().getFilename();

        feature.getElements().stream()
                .map(FeatureElement::getLocation)
                .forEach(location -> location.setFilename(featureFilename));

        feature.getElements().stream()
                .flatMap(e -> e.getSteps().stream())
                .map(Step::getLocation)
                .forEach(location -> location.setFilename(featureFilename));

        final Set<String> featureTags = feature.getTags();
        feature.getElements().stream()
                .filter(element -> element instanceof Scenario)
                .map(Scenario.class::cast)
                .map(Scenario::getTags)
                .forEach(tags -> tags.addAll(featureTags));

        return feature;
    }

}
