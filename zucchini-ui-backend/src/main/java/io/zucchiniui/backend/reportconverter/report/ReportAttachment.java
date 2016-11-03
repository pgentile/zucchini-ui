package io.zucchiniui.backend.reportconverter.report;


import com.fasterxml.jackson.annotation.JsonProperty;

public class ReportAttachment {

    private String data;

    @JsonProperty("mime_type")
    private String mimeType;

    private String label;

    public String getMimeType() {
        return mimeType;
    }

    public void setMimeType(String mimeType) {
        this.mimeType = mimeType;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }
}
