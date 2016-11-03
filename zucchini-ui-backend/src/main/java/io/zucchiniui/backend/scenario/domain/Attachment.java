package io.zucchiniui.backend.scenario.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.mongodb.morphia.annotations.Id;

import java.util.UUID;

/**
 * Step attachment.
 */
public class Attachment {

    @Id
    private String id = UUID.randomUUID().toString();

    // Don't send attachment content over the wire...
    @JsonIgnore
    private byte[] data;

    private String mimeType;

    private String label;

    /**
     * Private constructor for Morphia.
     */
    private Attachment() {

    }

    public Attachment(byte[] data, String mimeType) {
        this(data, mimeType, null);
    }

    public Attachment(byte[] data, String mimeType, String label) {
        id = UUID.randomUUID().toString();
        this.data = data;
        this.mimeType = mimeType;
        this.label = label;
    }

    public String getId() {
        return id;
    }

    public String getMimeType() {
        return mimeType;
    }

    public byte[] getData() {
        return data;
    }

    public String getLabel() {
        return label;
    }

}
