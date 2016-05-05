package io.testscucumber.backend.feature.domainimpl;

import io.testscucumber.backend.feature.domain.Feature;
import io.testscucumber.backend.feature.domain.FeatureRepository;
import io.testscucumber.backend.feature.domain.FeatureStatus;
import io.testscucumber.backend.scenario.domain.Scenario;
import io.testscucumber.backend.scenario.domain.ScenarioRepository;
import io.testscucumber.backend.scenario.views.ScenarioStats;
import io.testscucumber.backend.scenario.views.ScenarioViewAccess;
import io.testscucumber.backend.support.ddd.PreparedQuery;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import static org.mockito.BDDMockito.given;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

@RunWith(MockitoJUnitRunner.class)
public class FeatureServiceImplTest {

    @Mock
    private FeatureRepository featureRepository;

    @Mock
    private ScenarioRepository scenarioRepository;

    @Mock
    private ScenarioViewAccess scenarioViewAccess;

    @InjectMocks
    private FeatureServiceImpl featureService;

    @Test
    public void should_calculate_status_from_scenarii() throws Exception {
        // given
        final Feature feature = mock(Feature.class);

        final ScenarioStats stats = mock(ScenarioStats.class);
        given(scenarioViewAccess.getStats(any())).willReturn(stats);

        final FeatureStatus featureStatus = FeatureStatus.FAILED;
        given(stats.computeFeatureStatus()).willReturn(featureStatus);

        // when
        featureService.calculateStatusFromScenarii(feature);

        // then
        verify(scenarioViewAccess).getStats(any());
        verify(stats).computeFeatureStatus();

        verify(feature).setStatus(featureStatus);
    }

    @Test
    public void should_update_status_from_scenarii() throws Exception {
        // given
        final String featureId = "featureId";

        final Feature feature = mock(Feature.class);
        given(featureRepository.getById(featureId)).willReturn(feature);

        final ScenarioStats stats = mock(ScenarioStats.class);
        given(scenarioViewAccess.getStats(any())).willReturn(stats);

        final FeatureStatus featureStatus = FeatureStatus.FAILED;
        given(stats.computeFeatureStatus()).willReturn(featureStatus);

        // when
        featureService.updateStatusFromScenarii(featureId);

        // then
        verify(featureRepository).getById(featureId);
        verify(scenarioViewAccess).getStats(any());
        verify(stats).computeFeatureStatus();
        verify(featureRepository).save(feature);

        verify(feature).setStatus(featureStatus);
    }

    @Test
    public void should_delete_feature_by_test_run_id() throws Exception {
        // given
        final String testRunId = "testRunId";

        final PreparedQuery<Feature> featureQuery = mock(PreparedQuery.class, "featureQuery");
        given(featureRepository.query(any())).willReturn(featureQuery);

        final PreparedQuery<Scenario> scenarioQuery = mock(PreparedQuery.class, "scenarioQuery");
        given(scenarioRepository.query(any())).willReturn(scenarioQuery);

        // when
        featureService.deleteByTestRunId(testRunId);

        // then
        verify(featureQuery).delete();
        verify(scenarioQuery).delete();
    }

    @Test
    public void should_delete_feature_by_id() throws Exception {
        // given
        final String featureId = "featureId";

        final Feature feature = mock(Feature.class);
        given(featureRepository.getById(featureId)).willReturn(feature);

        final PreparedQuery<Scenario> scenarioQuery = mock(PreparedQuery.class, "scenarioQuery");
        given(scenarioRepository.query(any())).willReturn(scenarioQuery);

        // when
        featureService.deleteById(featureId);

        // then
        verify(scenarioQuery).delete();
        verify(featureRepository).delete(feature);
    }

}
