package io.zucchiniui.backend.reportconverter.converter;

import io.zucchiniui.backend.feature.domain.Feature;
import io.zucchiniui.backend.scenario.domain.Scenario;

import java.util.List;

public record ConversionResult(Feature feature, List<Scenario> scenarii) {

}
