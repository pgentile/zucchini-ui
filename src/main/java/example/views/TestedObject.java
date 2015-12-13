package example.views;

import com.fasterxml.jackson.annotation.JsonView;
import com.google.common.base.MoreObjects;

public class TestedObject {

    @JsonView(Views.Public.class)
    private boolean publicField;

    @Internal
    private boolean internalField;

    private boolean defaultField;

    public TestedObject() {
    }

    public TestedObject(boolean publicField, boolean internalField, boolean defaultField) {
        this.publicField = publicField;
        this.internalField = internalField;
        this.defaultField = defaultField;
    }

    public boolean isPublicField() {
        return publicField;
    }

    public void setPublicField(boolean publicField) {
        this.publicField = publicField;
    }

    public boolean isInternalField() {
        return internalField;
    }

    public void setInternalField(boolean internalField) {
        this.internalField = internalField;
    }

    public boolean isDefaultField() {
        return defaultField;
    }

    public void setDefaultField(boolean defaultField) {
        this.defaultField = defaultField;
    }

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
                .add("publicField", publicField)
                .add("internalField", internalField)
                .add("defaultField", defaultField)
                .toString();
    }

}
