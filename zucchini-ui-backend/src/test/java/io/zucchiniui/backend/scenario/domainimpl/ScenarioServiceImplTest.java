package io.zucchiniui.backend.scenario.domainimpl;

import io.zucchiniui.backend.scenario.domain.Scenario;
import io.zucchiniui.backend.scenario.domain.ScenarioRepository;
import io.zucchiniui.backend.scenario.domain.ScenarioStatus;
import io.zucchiniui.backend.support.ddd.PreparedQuery;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

/**
 * Created by yoga on 11/02/17.
 */
@ExtendWith(MockitoExtension.class)
public class ScenarioServiceImplTest {

    @Mock
    ScenarioRepository scenarioRepository;

    @InjectMocks
    private ScenarioServiceImpl scenarioService;

    @Test
    void tryToMergeWithExistingScenario_not_mergeOnlyNewPassedScenarii() throws Exception {
        // given
        Scenario newScenario = Mockito.mock(Scenario.class);
        Scenario existingScenario = Mockito.mock(Scenario.class);
        PreparedQuery preparedQuery = Mockito.mock(PreparedQuery.class);
        Optional optionalScenarii = Optional.of(existingScenario);
        given(preparedQuery.tryToFindOne()).willReturn(optionalScenarii);
        given(scenarioRepository.query(any())).willReturn(preparedQuery);

        // when
        Scenario mergedScenario = scenarioService.tryToMergeWithExistingScenario(newScenario, false);

        // then
        verify(existingScenario).mergeWith(newScenario);
        assertThat(mergedScenario).isSameAs(existingScenario);
    }

    @Test
    void tryToMergeWithExistingScenario_with_mergeOnlyNewPassedScenarii_and_existingScenario_passed_new_faild() throws Exception {
        // given
        Scenario newScenario = Mockito.mock(Scenario.class);
        Scenario existingScenario = Mockito.mock(Scenario.class);
        PreparedQuery preparedQuery = Mockito.mock(PreparedQuery.class);
        Optional optionalScenarii = Optional.of(existingScenario);
        given(preparedQuery.tryToFindOne()).willReturn(optionalScenarii);
        given(scenarioRepository.query(any())).willReturn(preparedQuery);
        given(newScenario.getStatus()).willReturn(ScenarioStatus.FAILED);

        // when
        Scenario mergedScenario = scenarioService.tryToMergeWithExistingScenario(newScenario, true);

        // then
        verify(existingScenario, times(0)).mergeWith(newScenario);
        assertThat(mergedScenario).isSameAs(existingScenario);
    }

    @Test
    void tryToMergeWithExistingScenario_with_mergeOnlyNewPassedScenarii_and_existingScenario_faild_new_passed() throws Exception {
        // given
        Scenario newScenario = Mockito.mock(Scenario.class);
        Scenario existingScenario = Mockito.mock(Scenario.class);
        PreparedQuery preparedQuery = Mockito.mock(PreparedQuery.class);
        Optional optionalScenarii = Optional.of(existingScenario);
        given(preparedQuery.tryToFindOne()).willReturn(optionalScenarii);
        given(scenarioRepository.query(any())).willReturn(preparedQuery);
        given(newScenario.getStatus()).willReturn(ScenarioStatus.PASSED);
        given(existingScenario.getStatus()).willReturn(ScenarioStatus.FAILED);

        // when
        Scenario mergedScenario = scenarioService.tryToMergeWithExistingScenario(newScenario, true);

        // then
        verify(existingScenario, times(1)).mergeWith(newScenario);
        assertThat(mergedScenario).isSameAs(existingScenario);
    }

    @Test
    void tryToMergeWithExistingScenario_with_mergeOnlyNewPassedScenarii_and_existingScenario_passed_new_passed() throws Exception {
        // given
        Scenario newScenario = Mockito.mock(Scenario.class);
        Scenario existingScenario = Mockito.mock(Scenario.class);
        PreparedQuery preparedQuery = Mockito.mock(PreparedQuery.class);
        Optional optionalScenarii = Optional.of(existingScenario);
        given(preparedQuery.tryToFindOne()).willReturn(optionalScenarii);
        given(scenarioRepository.query(any())).willReturn(preparedQuery);
        given(newScenario.getStatus()).willReturn(ScenarioStatus.PASSED);
        given(existingScenario.getStatus()).willReturn(ScenarioStatus.PASSED);

        // when
        Scenario mergedScenario = scenarioService.tryToMergeWithExistingScenario(newScenario, true);

        // then
        verify(existingScenario, times(0)).mergeWith(newScenario);
        assertThat(mergedScenario).isSameAs(existingScenario);
    }

    @Test
    void tryToMergeWithExistingScenario_with_mergeOnlyNewPassedScenarii_and_existingScenario_failed_new_failed() throws Exception {
        // given
        Scenario newScenario = Mockito.mock(Scenario.class);
        Scenario existingScenario = Mockito.mock(Scenario.class);
        PreparedQuery preparedQuery = Mockito.mock(PreparedQuery.class);
        Optional optionalScenarii = Optional.of(existingScenario);
        given(preparedQuery.tryToFindOne()).willReturn(optionalScenarii);
        given(scenarioRepository.query(any())).willReturn(preparedQuery);
        given(newScenario.getStatus()).willReturn(ScenarioStatus.FAILED);

        // when
        Scenario mergedScenario = scenarioService.tryToMergeWithExistingScenario(newScenario, true);

        // then
        verify(existingScenario, times(0)).mergeWith(newScenario);
        assertThat(mergedScenario).isSameAs(existingScenario);
    }
}
