package io.testscucumber.backend.support.morphia;

import com.codahale.metrics.health.HealthCheck;
import com.mongodb.CommandResult;
import com.mongodb.DB;

class MongoHealthCheck extends HealthCheck {

    private final DB db;

    public MongoHealthCheck(final DB db) {
        this.db = db;
    }

    @Override
    protected Result check() throws Exception {
        final CommandResult commandResult = db.getStats();
        if (!commandResult.ok()) {
            return Result.unhealthy(commandResult.getErrorMessage());
        }
        return Result.healthy();
    }

}
