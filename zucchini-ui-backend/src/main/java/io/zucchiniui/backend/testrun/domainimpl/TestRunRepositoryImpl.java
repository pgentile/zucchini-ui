package io.zucchiniui.backend.testrun.domainimpl;

import io.zucchiniui.backend.support.ddd.PreparedQuery;
import io.zucchiniui.backend.support.ddd.morphia.MorphiaRepository;
import io.zucchiniui.backend.testrun.dao.TestRunDAO;
import io.zucchiniui.backend.testrun.domain.TestRun;
import io.zucchiniui.backend.testrun.domain.TestRunQuery;
import io.zucchiniui.backend.testrun.domain.TestRunRepository;
import org.springframework.stereotype.Component;

@Component
class TestRunRepositoryImpl extends MorphiaRepository<TestRun, String, TestRunDAO> implements TestRunRepository {

    public TestRunRepositoryImpl(final TestRunDAO dao) {
        super(dao);
    }

    @Override
    public PreparedQuery<TestRun> query(TestRunQuery q) {
        return prepareQuery(dao -> dao.query(q));
    }

}
