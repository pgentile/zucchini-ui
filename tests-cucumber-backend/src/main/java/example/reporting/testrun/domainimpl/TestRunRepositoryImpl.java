package example.reporting.testrun.domainimpl;

import example.reporting.testrun.domain.TestRun;
import example.reporting.testrun.domain.TestRunQuery;
import example.reporting.testrun.domain.TestRunRepository;
import example.support.ddd.morphia.MorphiaQueriableRepository;
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
