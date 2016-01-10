package example.reporting.shared.domain;

public class Location {

    private String filename;

    private long line;

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
