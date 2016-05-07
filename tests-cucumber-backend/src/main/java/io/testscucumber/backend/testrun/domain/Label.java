package io.testscucumber.backend.testrun.domain;

import com.google.common.base.MoreObjects;

import java.util.Objects;

public class Label {

    private String name;

    private String value;

    private String url;

    /**
     * Private constructor for frameworks.
     */
    private Label() {
    }

    public Label(final String name, final String value, final String url) {
        this.name = Objects.requireNonNull(name);
        this.value = Objects.requireNonNull(value);
        this.url = url;
    }

    public Label(final String name, final String value) {
        this(name, value, null);
    }

    public String getName() {
        return name;
    }

    public String getValue() {
        return value;
    }

    public String getUrl() {
        return url;
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

        final Label other = (Label) obj;
        return name.equals(other.name) && value.equals(other.value) && Objects.equals(url, other.url);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, value, url);
    }

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
            .add("name", name)
            .add("value", value)
            .add("url", url)
            .toString();
    }

}
