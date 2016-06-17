FROM mongo:3

COPY migrate.sh /migrations/
COPY lib /migrations/lib
COPY migrations /migrations/migrations

WORKDIR "/migrations"
ENTRYPOINT ["./migrate.sh"]
