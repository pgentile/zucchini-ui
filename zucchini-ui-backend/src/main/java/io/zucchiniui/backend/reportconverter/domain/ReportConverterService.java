package io.zucchiniui.backend.reportconverter.domain;

import java.io.InputStream;
import java.util.Optional;

public interface ReportConverterService {

    void convertAndSaveFeatures(String testRunId, InputStream featureStream, Optional<String> group, boolean dryRun, boolean onlyNewScenarii);

}
