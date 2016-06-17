package io.zucchiniui.backend.testrun.domainimpl;

import io.zucchiniui.backend.support.ddd.morphia.MorphiaQueriableRepository;
import io.zucchiniui.backend.testrun.dao.TestRunDAO;
import io.zucchiniui.backend.testrun.domain.TestRun;
import io.zucchiniui.backend.testrun.domain.TestRunQuery;
import io.zucchiniui.backend.testrun.domain.TestRunRepository;
import org.springframework.stereotype.Component;

@Component
class TestRunRepositoryImpl extends MorphiaQueriableRepository<TestRun, String, TestRunQuery> implements TestRunRepository {

    public TestRunRepositoryImpl(final TestRunDAO dao) {
        super(dao);
    }

}
