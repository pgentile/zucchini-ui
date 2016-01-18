package io.testscucumber.backend.reportconverter.converter;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionLikeType;
import com.google.common.io.Resources;
import io.testscucumber.backend.feature.domain.Feature;
import io.testscucumber.backend.feature.domain.FeatureFactory;
import io.testscucumber.backend.reportconverter.report.ReportFeature;
import io.testscucumber.backend.scenario.domain.Scenario;
import io.testscucumber.backend.scenario.domain.ScenarioFactory;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import java.io.InputStream;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Matchers.anyString;

@RunWith(MockitoJUnitRunner.class)
public class ReportMapperTest {

    @Mock
    private FeatureFactory featureFactory;

    @Mock
    private ScenarioFactory scenarioFactory;

    private ReportMapper reportMapper;

    @Before
    public void setUp() throws Exception {
        reportMapper = new ReportMapper(featureFactory, scenarioFactory);
        reportMapper.initMapper();
    }

    @Test
    public void should_parse_report() throws Exception {
        // given
        final ObjectMapper objectMapper = new ObjectMapper()
            .findAndRegisterModules()
            .disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);

        final CollectionLikeType reportFeatureListType = objectMapper.getTypeFactory().constructCollectionType(List.class, ReportFeature.class);

        final List<ReportFeature> reportFeatures;
        try (InputStream stream = Resources.asByteSource(Resources.getResource("report.json")).openStream()) {
            reportFeatures = objectMapper.readValue(stream, reportFeatureListType);
        }

        given(featureFactory.create(anyString(), anyString())).willAnswer(args -> new Feature());
        given(scenarioFactory.create(anyString(), anyString())).willAnswer(args -> new Scenario());

        // when
        final List<Feature> features = reportMapper.mapAsList(reportFeatures, Feature.class);

        // then
        assertThat(features).hasSameSizeAs(reportFeatures);
    }

}
