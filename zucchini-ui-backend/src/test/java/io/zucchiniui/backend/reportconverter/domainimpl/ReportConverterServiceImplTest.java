package io.zucchiniui.backend.reportconverter.domainimpl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;
import com.fasterxml.jackson.databind.type.TypeFactory;
import io.zucchiniui.backend.feature.domain.Feature;
import io.zucchiniui.backend.feature.domain.FeatureRepository;
import io.zucchiniui.backend.feature.domain.FeatureService;
import io.zucchiniui.backend.reportconverter.converter.ConversionResult;
import io.zucchiniui.backend.reportconverter.converter.ReportConverter;
import io.zucchiniui.backend.reportconverter.report.ReportFeature;
import io.zucchiniui.backend.scenario.domain.Scenario;
import io.zucchiniui.backend.scenario.domain.ScenarioRepository;
import io.zucchiniui.backend.scenario.domain.ScenarioService;
import io.zucchiniui.backend.scenario.domain.ScenarioStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InOrder;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.InputStream;
import java.util.List;
import java.util.Optional;
import java.util.function.Consumer;

import static java.util.Collections.singletonList;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willAnswer;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ReportConverterServiceImplTest {

    @Mock
    private FeatureRepository featureRepository;

    @Mock
    private FeatureService featureService;

    @Mock
    private ScenarioRepository scenarioRepository;

    @Mock
    private ScenarioService scenarioService;

    @Mock
    private ReportConverter reportConverter;

    @Mock
    private ObjectMapper objectMapper;

    @InjectMocks
    private ReportConverterServiceImpl service;

    private CollectionType featureListJavaType;

    @BeforeEach
    void initMocks() {
        final TypeFactory typeFactory = TypeFactory.defaultInstance();
        featureListJavaType = typeFactory.constructCollectionType(List.class, ReportFeature.class);

        given(objectMapper.getTypeFactory()).willReturn(typeFactory);
    }

    @Test
    void should_convert_and_save_features() throws Exception {
        // given
        final String testRunId = "1234";
        final InputStream inputStream = mock(InputStream.class);
        final Optional<String> group = Optional.of("toto");

        final ReportFeature reportFeature = mock(ReportFeature.class);
        final List<ReportFeature> reportFeatures = singletonList(reportFeature);

        given(objectMapper.readValue(inputStream, featureListJavaType)).willReturn(reportFeatures);

        final Feature feature = mock(Feature.class);
        final Scenario scenario = mock(Scenario.class);
        final ConversionResult conversionResult = new ConversionResult(feature, singletonList(scenario));

        given(reportConverter.convert(testRunId, group, reportFeature)).willReturn(conversionResult);
        given(featureService.tryToMergeWithExistingFeature(feature)).willReturn(feature);
        given(scenarioService.tryToMergeWithExistingScenario(scenario, false)).willReturn(scenario);

        // when
        service.convertAndSaveFeatures(testRunId, inputStream, group, false, false, false);

        // then

        final InOrder inOrder = inOrder(featureRepository, featureService, scenarioRepository,
            scenarioService, reportConverter, feature, scenario);

        inOrder.verify(reportConverter).convert(testRunId, group, reportFeature);
        inOrder.verify(featureService).tryToMergeWithExistingFeature(feature);
        inOrder.verify(scenarioService).tryToMergeWithExistingScenario(scenario, false);
        inOrder.verify(scenarioRepository).save(scenario);
        inOrder.verify(featureService).calculateStatusFromScenarii(feature);
        inOrder.verify(featureRepository).save(feature);
        inOrder.verify(featureService).updateScenariiWithFeatureTags(feature);
        inOrder.verifyNoMoreInteractions();
    }

    @Test
    void should_convert_and_save_features_with_dry_run() throws Exception {
        // given
        final String testRunId = "1234";
        final InputStream inputStream = mock(InputStream.class);
        final Optional<String> group = Optional.of("toto");

        final ReportFeature reportFeature = mock(ReportFeature.class);
        final List<ReportFeature> reportFeatures = singletonList(reportFeature);

        given(objectMapper.readValue(inputStream, featureListJavaType)).willReturn(reportFeatures);

        final Feature feature = mock(Feature.class);
        final Scenario scenario = mock(Scenario.class);
        final ConversionResult conversionResult = new ConversionResult(feature, singletonList(scenario));

        willAnswer(invocation -> {
            final Consumer<Scenario> consumer = invocation.getArgument(0);
            consumer.accept((Scenario) invocation.getMock());
            return null;
        }).given(scenario).doIgnoringChanges(any());

        given(reportConverter.convert(testRunId, group, reportFeature)).willReturn(conversionResult);
        given(featureService.tryToMergeWithExistingFeature(feature)).willReturn(feature);
        given(scenarioService.tryToMergeWithExistingScenario(scenario, false)).willReturn(scenario);

        // when
        service.convertAndSaveFeatures(testRunId, inputStream, group, true, false, false);

        // then

        final InOrder inOrder = inOrder(featureRepository, featureService, scenarioRepository,
            scenarioService, reportConverter, feature, scenario);

        inOrder.verify(reportConverter).convert(testRunId, group, reportFeature);
        inOrder.verify(scenario).doIgnoringChanges(any());
        inOrder.verify(scenario).setStatus(ScenarioStatus.NOT_RUN);
        inOrder.verify(featureService).tryToMergeWithExistingFeature(feature);
        inOrder.verify(scenarioService).tryToMergeWithExistingScenario(scenario, false);
        inOrder.verify(scenarioRepository).save(scenario);
        inOrder.verify(featureService).calculateStatusFromScenarii(feature);
        inOrder.verify(featureRepository).save(feature);
        inOrder.verify(featureService).updateScenariiWithFeatureTags(feature);
        inOrder.verifyNoMoreInteractions();
    }

    @Test
    void should_convert_and_save_features_with_already_existing_feature() throws Exception {
        // given
        final String testRunId = "1234";
        final InputStream inputStream = mock(InputStream.class);
        final Optional<String> group = Optional.of("toto");

        final ReportFeature reportFeature = mock(ReportFeature.class);
        final List<ReportFeature> reportFeatures = singletonList(reportFeature);

        given(objectMapper.readValue(inputStream, featureListJavaType)).willReturn(reportFeatures);

        final Feature feature = mock(Feature.class, "feature");
        final Scenario scenario = mock(Scenario.class);
        final ConversionResult conversionResult = new ConversionResult(feature, singletonList(scenario));

        given(reportConverter.convert(testRunId, group, reportFeature)).willReturn(conversionResult);

        final Feature existingFeature = mock(Feature.class, "existingFeature");

        given(featureService.tryToMergeWithExistingFeature(feature)).willReturn(existingFeature);

        given(scenarioService.tryToMergeWithExistingScenario(scenario, false)).willReturn(scenario);

        // when
        service.convertAndSaveFeatures(testRunId, inputStream, group, false, false, false);

        // then

        final InOrder inOrder = inOrder(featureRepository, featureService, scenarioRepository,
            scenarioService, reportConverter, feature, scenario);

        inOrder.verify(reportConverter).convert(testRunId, group, reportFeature);
        inOrder.verify(featureService).tryToMergeWithExistingFeature(feature);
        inOrder.verify(scenarioService).tryToMergeWithExistingScenario(scenario, false);
        inOrder.verify(scenarioRepository).save(scenario);
        inOrder.verify(featureService).calculateStatusFromScenarii(existingFeature);
        inOrder.verify(featureRepository).save(existingFeature);
        inOrder.verify(featureService).updateScenariiWithFeatureTags(existingFeature);
        inOrder.verifyNoMoreInteractions();
    }

    @Test
    void should_convert_and_save_features_with_already_existing_scenario_and_only_new_scenarii_activated() throws Exception {
        // given
        final String testRunId = "1234";
        final InputStream inputStream = mock(InputStream.class);
        final Optional<String> group = Optional.of("toto");

        final ReportFeature reportFeature = mock(ReportFeature.class);
        final List<ReportFeature> reportFeatures = singletonList(reportFeature);

        given(objectMapper.readValue(inputStream, featureListJavaType)).willReturn(reportFeatures);

        final Feature feature = mock(Feature.class, "feature");
        final Scenario scenario = mock(Scenario.class);
        final ConversionResult conversionResult = new ConversionResult(feature, singletonList(scenario));

        given(reportConverter.convert(testRunId, group, reportFeature)).willReturn(conversionResult);

        final Feature existingFeature = mock(Feature.class, "existingFeature");

        given(featureService.tryToMergeWithExistingFeature(feature)).willReturn(existingFeature);

        final Scenario existingScenario = mock(Scenario.class, "existingScenario");

        given(scenarioService.tryToMergeWithExistingScenario(scenario, false)).willReturn(existingScenario);

        // when
        service.convertAndSaveFeatures(testRunId, inputStream, group, false, true, false);

        // then

        final InOrder inOrder = inOrder(featureRepository, featureService, scenarioRepository,
            scenarioService, reportConverter, feature, scenario, existingScenario);

        inOrder.verify(reportConverter).convert(testRunId, group, reportFeature);
        inOrder.verify(featureService).tryToMergeWithExistingFeature(feature);
        inOrder.verify(scenarioService).tryToMergeWithExistingScenario(scenario, false);
        inOrder.verify(scenarioRepository, never()).save(existingScenario);
        inOrder.verify(featureService).calculateStatusFromScenarii(existingFeature);
        inOrder.verify(featureRepository).save(existingFeature);
        inOrder.verify(featureService).updateScenariiWithFeatureTags(existingFeature);
        inOrder.verifyNoMoreInteractions();
    }

}
