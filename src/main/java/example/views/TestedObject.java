package example.views;

import com.fasterxml.jackson.annotation.JsonView;
import com.google.common.base.MoreObjects;

public class TestedObject {

    @JsonView(Views.Public.class)
    private boolean publicField;

    @Internal
    private boolean internalField;

    public TestedObject() {
    }

    public TestedObject(boolean publicField, boolean internalField) {
        this.publicField = publicField;
        this.internalField = internalField;
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

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
                .add("publicField", publicField)
                .add("internalField", internalField)
                .toString();
    }

}
