package io.zucchiniui.backend.scenario.domain;

import org.mongodb.morphia.annotations.Id;

import java.util.UUID;

/**
 * Created by antoine_choimet on 17/10/2016.
 */
public class Attachment {

    @Id
    private String id = UUID.randomUUID().toString();

    private byte[] data;

    private String mimeType;

    private String label;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMimeType() {
        return mimeType;
    }

    public void setMimeType(String mimeType) {
        this.mimeType = mimeType;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

}
