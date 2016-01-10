package example.reporting.api.testrun;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Indexed;

import java.time.ZonedDateTime;
import java.util.HashMap;
import java.util.Map;

@Entity("testRuns")
public class TestRun {

    @Id
    private String id;

    @Indexed
    private String env;

    private ZonedDateTime date;

    private Map<String, String> labels = new HashMap<>();

    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id;
    }

    public String getEnv() {
        return env;
    }

    public void setEnv(final String env) {
        this.env = env;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public void setDate(final ZonedDateTime date) {
        this.date = date;
    }

    public Map<String, String> getLabels() {
        return labels;
    }

    public void setLabels(final Map<String, String> labels) {
        this.labels = labels;
    }

}
