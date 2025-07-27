# syntax=docker/dockerfile:1
# check=error=true

FROM mongo:8

ENV MONGO_INITDB_DATABASE=zucchini

COPY ./migrations/*.js /migrations/

# Files in the docker-entrypoint-initdb.d dir are executed from the / working dir
COPY ./migrate.js /docker-entrypoint-initdb.d/

HEALTHCHECK --interval=5s --timeout=30s --start-period=60s --retries=12 CMD mongosh --eval 'db.runCommand({ ping: 1 })'
