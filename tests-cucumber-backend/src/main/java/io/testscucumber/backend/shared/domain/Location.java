package io.testscucumber.backend.shared.domain;

public class Location {

    private String filename;

    private long line;

    /**
     * For frameworks.
     */
    public Location() {
    }

    public Location(final String filename, final long line) {
        this.filename = filename;
        this.line = line;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(final String filename) {
        this.filename = filename;
    }

    public long getLine() {
        return line;
    }

    public void setLine(final long line) {
        this.line = line;
    }

    @Override
    public String toString() {
        return filename + ":" + line;
    }

}
