package io.zucchiniui.backend.scenario.domain;

import com.google.common.base.MoreObjects;

import java.time.ZonedDateTime;
import java.util.UUID;

public abstract class ScenarioChange<T> {

    public enum ChangeType {
        STATUS,
        REVIEWED_STATE
    }

    private String id;

    private ChangeType type;

    private ZonedDateTime date;

    private T oldValue;

    private T newValue;

    /**
     * Private constructor for Morphia.
     */
    protected ScenarioChange() {
    }

    protected ScenarioChange(ChangeType type, ZonedDateTime date, T oldValue, T newValue) {
        id = UUID.randomUUID().toString();
        this.type = type;
        this.date = date;
        this.oldValue = oldValue;
        this.newValue = newValue;
    }

    public String getId() {
        return id;
    }

    public ChangeType getType() {
        return type;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public T getOldValue() {
        return oldValue;
    }

    public T getNewValue() {
        return newValue;
    }

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
            .add("id", id)
            .add("date", date)
            .add("oldValue", oldValue)
            .add("newValue", newValue)
            .toString();
    }

}
