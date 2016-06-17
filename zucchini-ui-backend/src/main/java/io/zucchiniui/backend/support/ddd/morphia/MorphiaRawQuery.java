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
        query.retrievedFields(true, fieldNames);
        return this;
    }

    public Stream<DBObject> stream() {
        final DBCursor cursor = query.getCollection()
            .find(query.getQueryObject(), query.getFieldsObject())
            .sort(query.getSortObject());
        return StreamSupport.stream(cursor.spliterator(), false).onClose(cursor::close);
    }

}
