package io.testscucumber.backend.testrun.domainimpl;

import io.testscucumber.backend.testrun.domain.TestRun;
import io.testscucumber.backend.testrun.domain.TestRunQuery;
import io.testscucumber.backend.testrun.domain.TestRunRepository;
import io.testscucumber.backend.support.ddd.morphia.MorphiaQueriableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
class TestRunRepositoryImpl extends MorphiaQueriableRepository<TestRun, String, TestRunQuery> implements TestRunRepository {

    private final TestRunDAO dao;

    @Autowired
    public TestRunRepositoryImpl(final TestRunDAO dao) {
        super(dao);
        this.dao = dao;
    }

}
