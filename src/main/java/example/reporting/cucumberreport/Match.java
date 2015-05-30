package example.reporting.cucumberreport;

import com.google.common.base.MoreObjects;

import java.util.List;

public class Match {

    private String location;

    private List<Argument> arguments;

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public List<Argument> getArguments() {
        return arguments;
    }

    public void setArguments(List<Argument> arguments) {
        this.arguments = arguments;
    }

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
                .add("location", location)
                .toString();
    }

}
