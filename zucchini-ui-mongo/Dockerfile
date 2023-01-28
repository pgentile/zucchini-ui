FROM mongo:6

ENV MONGO_INITDB_DATABASE=zucchini

COPY ./migrations/*.js /migrations/

# Files in the docker-entrypoint-initdb.d dir are executed from the / working dir
COPY ./migrate.js /docker-entrypoint-initdb.d/
