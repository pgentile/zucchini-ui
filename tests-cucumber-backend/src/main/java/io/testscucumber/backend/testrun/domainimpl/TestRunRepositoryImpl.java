package io.testscucumber.backend.testrun.domainimpl;

import io.testscucumber.backend.support.ddd.morphia.MorphiaQueriableRepository;
import io.testscucumber.backend.testrun.dao.TestRunDAO;
import io.testscucumber.backend.testrun.domain.TestRun;
import io.testscucumber.backend.testrun.domain.TestRunQuery;
import io.testscucumber.backend.testrun.domain.TestRunRepository;
import org.springframework.stereotype.Component;

@Component
class TestRunRepositoryImpl extends MorphiaQueriableRepository<TestRun, String, TestRunQuery> implements TestRunRepository {

    public TestRunRepositoryImpl(final TestRunDAO dao) {
        super(dao);
    }

}
