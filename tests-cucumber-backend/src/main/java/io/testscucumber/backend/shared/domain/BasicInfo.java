package io.testscucumber.backend.shared.domain;

import java.util.ArrayList;
import java.util.List;

public class BasicInfo {

    private String keyword;

    private String name;

    private List<Argument> arguments = new ArrayList<>();

    /**
     * Constructor used by frameworks
     */
    public BasicInfo() {
    }

    public BasicInfo(final String keyword, final String name) {
        this.keyword = keyword;
        this.name = name;
        arguments = new ArrayList<>();
    }

    public BasicInfo(final String keyword, final String name, final List<Argument> arguments) {
        this.keyword = keyword;
        this.name = name;
        this.arguments = new ArrayList<>(arguments);
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
