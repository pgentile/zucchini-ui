package io.zucchiniui.backend.testrun.domain;

import io.zucchiniui.backend.support.ddd.PreparedQuery;
import io.zucchiniui.backend.support.ddd.Repository;

public interface TestRunRepository extends Repository<TestRun, String> {

    PreparedQuery<TestRun> query(TestRunQuery q);

}
