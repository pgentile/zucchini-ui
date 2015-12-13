package example.reporting.testrun.view;

import java.util.Date;

public class TestRunListItemView {

    private String id;

    private String env;

    private Date date;

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

    public Date getDate() {
        return date;
    }

    public void setDate(final Date date) {
        this.date = date;
    }

}
