package io.zucchiniui.backend.shared.domain;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

public final class BasicInfo {

    private String keyword;

    private String name;

    private List<Argument> arguments = new ArrayList<>();

    /**
     * For frameworks.
     */
    private BasicInfo() {
    }

    public BasicInfo(final String keyword, final String name) {
        this(keyword, name, new ArrayList<>());
    }

    public BasicInfo(final String keyword, final String name, final List<Argument> arguments) {
        this.keyword = Objects.requireNonNull(keyword);
        this.name = Objects.requireNonNull(name);
        this.arguments = new ArrayList<>(arguments);
    }

    public String getKeyword() {
        return keyword;
    }

    public String getName() {
        return name;
    }

    public List<Argument> getArguments() {
        return Collections.unmodifiableList(arguments);
    }

    @Override
    public boolean equals(final Object obj) {
        if (obj == null) {
            return false;
        }
        if (this == obj) {
            return true;
        }
        if (!getClass().equals(obj.getClass())) {
            return false;
        }

        final BasicInfo other = (BasicInfo) obj;
        return keyword.equals(other.keyword) && name.equals(other.name) && arguments.equals(other.arguments);
    }

    @Override
    public int hashCode() {
        return Objects.hash(keyword, name, arguments);
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
