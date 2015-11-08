package example.reporting.model;

import java.util.List;

public class BasicInfo {

    private String keyword;

    private String name;

    private List<Argument> arguments;

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

    public List<Argument> getArguments() {
        return arguments;
    }

    public void setArguments(List<Argument> arguments) {
        this.arguments = arguments;
    }

    @Override
    public String toString() {
        final StringBuilder builder = new StringBuilder();
        builder.append(keyword).append(": ").append(name);
        if (arguments != null && !arguments.isEmpty()) {
            builder.append("; arguments = ").append(arguments);
        }
        return builder.toString();
    }

}
