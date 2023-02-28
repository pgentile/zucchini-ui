package io.zucchiniui.backend.scenario.domainimpl;

import io.zucchiniui.backend.scenario.domain.Scenario;
import io.zucchiniui.backend.scenario.domain.ScenarioRepository;
import io.zucchiniui.backend.scenario.domain.ScenarioStatus;
import io.zucchiniui.backend.support.ddd.PreparedQuery;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

/**
 * Created by yoga on 11/02/17.
 */
@ExtendWith(MockitoExtension.class)
public class ScenarioServiceImplTest {

    @Mock
    private ScenarioRepository scenarioRepository;

    @Mock
    private Scenario newScenario;

    @Mock
    private Scenario existingScenario;

    @Mock
    private PreparedQuery<Scenario> preparedQuery;

    @InjectMocks
    private ScenarioServiceImpl scenarioService;

    @BeforeEach
    void prepareMocks() {
        Optional<Scenario> optionalScenario = Optional.of(existingScenario);
        given(preparedQuery.tryToFindOne()).willReturn(optionalScenario);
        given(scenarioRepository.query(any())).willReturn(preparedQuery);
    }

    @Test
    void tryToMergeWithExistingScenario_not_mergeOnlyNewPassedScenarii() {
        // given

        // when
        Scenario mergedScenario = scenarioService.tryToMergeWithExistingScenario(newScenario, false);

        // then
        verify(existingScenario).mergeWith(newScenario);
        assertThat(mergedScenario).isSameAs(existingScenario);
    }

    @Test
    void tryToMergeWithExistingScenario_with_mergeOnlyNewPassedScenarii_and_existingScenario_passed_new_faild() {
        // given
        given(newScenario.getStatus()).willReturn(ScenarioStatus.FAILED);

        // when
        Scenario mergedScenario = scenarioService.tryToMergeWithExistingScenario(newScenario, true);

        // then
        verify(existingScenario, never()).mergeWith(newScenario);
        assertThat(mergedScenario).isSameAs(existingScenario);
    }

    @Test
    void tryToMergeWithExistingScenario_with_mergeOnlyNewPassedScenarii_and_existingScenario_faild_new_passed() {
        // given
        given(newScenario.getStatus()).willReturn(ScenarioStatus.PASSED);
        given(existingScenario.getStatus()).willReturn(ScenarioStatus.FAILED);

        // when
        Scenario mergedScenario = scenarioService.tryToMergeWithExistingScenario(newScenario, true);

        // then
        verify(existingScenario, times(1)).mergeWith(newScenario);
        assertThat(mergedScenario).isSameAs(existingScenario);
    }

    @Test
    void tryToMergeWithExistingScenario_with_mergeOnlyNewPassedScenarii_and_existingScenario_passed_new_passed() {
        // given
        given(newScenario.getStatus()).willReturn(ScenarioStatus.PASSED);
        given(existingScenario.getStatus()).willReturn(ScenarioStatus.PASSED);

        // when
        Scenario mergedScenario = scenarioService.tryToMergeWithExistingScenario(newScenario, true);

        // then
        verify(existingScenario, never()).mergeWith(newScenario);
        assertThat(mergedScenario).isSameAs(existingScenario);
    }

    @Test
    void tryToMergeWithExistingScenario_with_mergeOnlyNewPassedScenarii_and_existingScenario_failed_new_failed() {
        // given
        given(newScenario.getStatus()).willReturn(ScenarioStatus.FAILED);

        // when
        Scenario mergedScenario = scenarioService.tryToMergeWithExistingScenario(newScenario, true);

        // then
        verify(existingScenario, never()).mergeWith(newScenario);
        assertThat(mergedScenario).isSameAs(existingScenario);
    }

}
