FROM mongo:7

ENV MONGO_INITDB_DATABASE=zucchini

RUN apt-get update && apt-get install -y netcat && rm -rf /var/lib/apt/lists/*

COPY ./migrations/*.js /migrations/

# Files in the docker-entrypoint-initdb.d dir are executed from the / working dir
COPY ./migrate.js /docker-entrypoint-initdb.d/

HEALTHCHECK --interval=5s --timeout=30s --start-period=60s --retries=12 CMD nc -vz localhost 27017
