package example.reporting.reporttomodel;

import example.reporting.model.Background;
import example.reporting.model.Feature;
import example.reporting.model.FeatureElement;
import example.reporting.model.Scenario;
import example.reporting.model.Step;
import example.reporting.report.ReportFeature;
import ma.glasnost.orika.BoundMapperFacade;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

public class ReportConverter {

    private final ReportMapper reportMapper = new ReportMapper();

    private final BoundMapperFacade<ReportFeature, Feature> mapper = reportMapper.dedicatedMapperFor(
            ReportFeature.class,
            Feature.class,
            false
    );

    public List<Feature> convertFeatures(List<ReportFeature> reportFeatures) {
        return reportFeatures.stream()
                .map(this::convertFeature)
                .collect(Collectors.toList());
    }

    public Feature convertFeature(ReportFeature reportFeature) {
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

        attachBackgroundsToScenarii(feature.getElements());

        return feature;
    }

    private static void attachBackgroundsToScenarii(List<FeatureElement> elements) {
        Optional<Background> optionalBackground = Optional.empty();
        int index = 0;

        // Find first background element
        for (int i = 0; i < elements.size(); i++) {
            final FeatureElement current = elements.get(i);
            if (current instanceof Background) {
                optionalBackground = Optional.of((Background) current);
                index = i;
                break;
            }
        }

        final int backgroundIndex = index;
        optionalBackground.ifPresent(background -> {
            // Attach background to next scenario
            elements.stream()
                    .skip(1 + backgroundIndex)
                    .filter(elem -> elem instanceof Scenario)
                    .map(elem -> (Scenario) elem)
                    .findFirst()
                    .ifPresent(scenario -> scenario.setBackground(background));

            // Remove background from elements
            elements.remove(backgroundIndex);

            // And next...
            attachBackgroundsToScenarii(elements);
        });
    }

}
