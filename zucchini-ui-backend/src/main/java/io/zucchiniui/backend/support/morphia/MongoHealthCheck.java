package io.zucchiniui.backend.support.morphia;

import com.codahale.metrics.health.HealthCheck;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

class MongoHealthCheck extends HealthCheck {

    private final MongoDatabase db;

    public MongoHealthCheck(final MongoDatabase db) {
        this.db = db;
    }

    @Override
    protected Result check() {
        final Document commandResult = db.runCommand(new Document("buildInfo", 1));

        final Double ok = commandResult.getDouble("ok");
        if (ok == null || ok != 1.0) {
            return Result.unhealthy("Mongo buildInfo command failed: " + commandResult.toJson());
        }

        final String version = commandResult.getString("version");
        return Result.healthy("Mongo server version: %s", version);
    }

}
