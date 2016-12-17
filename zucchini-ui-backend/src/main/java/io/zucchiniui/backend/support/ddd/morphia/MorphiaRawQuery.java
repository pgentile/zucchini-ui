package io.zucchiniui.backend.support.ddd.morphia;

import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import org.mongodb.morphia.query.Query;

import java.util.stream.Stream;
import java.util.stream.StreamSupport;

public class MorphiaRawQuery {

    private final Query<?> query;

    public MorphiaRawQuery(final Query<?> query) {
        this.query = query;
    }

    public MorphiaRawQuery includeFields(final String... fieldNames) {
        for (final String fieldName: fieldNames) {
            query.project(fieldName, true);
        }
        return this;
    }

    @SuppressWarnings("deprecation")
    public Stream<DBObject> stream() {
        // TODO All methods are deprecated on query object
        final DBCursor cursor = query.getCollection()
            .find(query.getQueryObject(), query.getFieldsObject())
            .sort(query.getSortObject());
        return StreamSupport.stream(cursor.spliterator(), false).onClose(cursor::close);
    }

}
