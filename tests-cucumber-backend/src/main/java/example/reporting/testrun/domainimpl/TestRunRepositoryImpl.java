package example.reporting.testrun.domainimpl;

import example.reporting.testrun.domain.TestRun;
import example.reporting.testrun.domain.TestRunQuery;
import example.reporting.testrun.domain.TestRunRepository;
import example.support.morphiaddd.MorphiaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
class TestRunRepositoryImpl extends MorphiaRepository<TestRun, String> implements TestRunRepository {

    private final TestRunDAO dao;

    @Autowired
    public TestRunRepositoryImpl(TestRunDAO dao) {
        super(dao);
        this.dao = dao;
    }

    @Override
    public TestRunQuery query() {
        return dao.createTypedQuery();
    }

}
