package example.reporting.api.shared;

import java.util.ArrayList;
import java.util.List;

public class BasicInfo {

    private String keyword;

    private String name;

    private List<Argument> arguments = new ArrayList<>();

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

    public List<Argument> getArguments() {
        return arguments;
    }

    public void setArguments(final List<Argument> arguments) {
        this.arguments = arguments;
    }

    @Override
    public String toString() {
        final StringBuilder builder = new StringBuilder();
        builder.append(keyword).append(": ").append(name);
        if (!arguments.isEmpty()) {
            builder.append("; arguments = ").append(arguments);
        }
        return builder.toString();
    }

}
