package io.zucchiniui.backend.reportconverter.report;

import com.google.common.base.Strings;

public class ReportComment {

    private String value;

    public String getValue() {
        return value;
    }

    public void setValue(final String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return Strings.nullToEmpty(value);
    }
}
