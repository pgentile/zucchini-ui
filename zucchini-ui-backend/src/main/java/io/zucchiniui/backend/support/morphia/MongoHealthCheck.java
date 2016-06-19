package io.zucchiniui.backend.support.morphia;

import com.codahale.metrics.health.HealthCheck;
import com.mongodb.BasicDBObject;
import com.mongodb.CommandResult;
import com.mongodb.DB;

class MongoHealthCheck extends HealthCheck {

    private final DB db;

    public MongoHealthCheck(final DB db) {
        this.db = db;
    }

    @Override
    protected Result check() throws Exception {
        final BasicDBObject command = new BasicDBObject("buildInfo", 1);
        final CommandResult commandResult = db.command(command);

        if (!commandResult.ok()) {
            return Result.unhealthy(commandResult.getErrorMessage());
        }

        final String version = commandResult.getString("version");
        return Result.healthy("Mongo server version: %s", version);
    }

}
