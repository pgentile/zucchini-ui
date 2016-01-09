package example.reporting.testrun;

import com.google.common.base.Strings;
import example.reporting.api.testrun.TestRun;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.dao.BasicDAO;
import org.mongodb.morphia.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TestRunDAO extends BasicDAO<TestRun, String> {

    @Autowired
    public TestRunDAO(final Datastore ds) {
        super(ds);
    }

    public List<TestRun> getLatests(LatestTestRunsParams params) {
        Query<TestRun> query = createQuery();

        if (!Strings.isNullOrEmpty(params.getEnv())) {
            query = query.field("env").equal(params.getEnv());
        }

        return query
            .order("-date")
            .retrievedFields(true, "id", "env", "date", "status")
            .limit(50) // FIXME With params ?!
            .asList();
    }

}
