package io.zucchiniui.backend.reportconverter.report;

import com.google.common.base.MoreObjects;

import java.util.ArrayList;
import java.util.List;

public class TableRow {

    private List<String> cells = new ArrayList<>();

    public List<String> getCells() {
        return cells;
    }

    public void setCells(final List<String> cells) {
        this.cells = cells;
    }

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
            .add("cells", cells)
            .toString();
    }

}
