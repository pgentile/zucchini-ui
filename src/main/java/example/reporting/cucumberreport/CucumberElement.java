package example.reporting.cucumberreport;

import com.google.common.base.MoreObjects;

public class CucumberElement {

    private long line;

    private String keyword;

    private String name;

    public long getLine() {
        return line;
    }

    public void setLine(long line) {
        this.line = line;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return createToStringHelper().toString();
    }

    protected MoreObjects.ToStringHelper createToStringHelper() {
        return MoreObjects.toStringHelper(this)
                .add("keyword", keyword)
                .add("name", name)
                .add("line", line);
    }

}
