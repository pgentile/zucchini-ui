package io.testscucumber.backend.testrun.domainimpl;

import io.testscucumber.backend.testrun.domain.TestRun;
import io.testscucumber.backend.testrun.domain.TestRunFactory;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.UUID;


@Component
class TestRunFactoryImpl implements TestRunFactory {

    @Override
    public TestRun create(final String env) {
        final TestRun testRun = new TestRun();
        testRun.setId(UUID.randomUUID().toString());
        testRun.setDate(ZonedDateTime.now());
        testRun.setEnv(env);
        return testRun;
    }

}
