package io.zucchiniui.backend.reportconverter.converter;

import io.zucchiniui.backend.feature.domain.Feature;
import io.zucchiniui.backend.scenario.domain.Scenario;

import java.util.List;

public class ConversionResult {

    private final Feature feature;

    private final List<Scenario> scenarii;

    public ConversionResult(final Feature feature, final List<Scenario> scenarii) {
        this.feature = feature;
        this.scenarii = scenarii;
    }

    public Feature getFeature() {
        return feature;
    }

    public List<Scenario> getScenarii() {
        return scenarii;
    }

}
