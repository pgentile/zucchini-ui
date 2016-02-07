package io.testscucumber.backend.reportconverter.report;

import com.google.common.base.MoreObjects;

public class CucumberElement {

    private long line;

    private String keyword;

    private String name;

    public long getLine() {
        return line;
    }

    public void setLine(final long line) {
        this.line = line;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(final String keyword) {
        this.keyword = keyword;
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
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
