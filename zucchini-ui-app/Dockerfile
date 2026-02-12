# syntax=docker/dockerfile:1
# check=error=true

FROM eclipse-temurin:25

ARG ZUCCHINI_VERSION
ENV ZUCCHINI_VERSION=${ZUCCHINI_VERSION}

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Create runtime user
RUN groupadd -r zucchini && useradd -r -g zucchini zucchini

ADD src/docker/config.yml /zucchini-ui/
ADD src/docker/docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

ADD build/docker/libs/*.jar /zucchini-ui/libs/
ADD build/docker/app/*.jar /zucchini-ui/app/

EXPOSE 8080 8081

USER zucchini

HEALTHCHECK --interval=5s --timeout=30s --start-period=60s --retries=12 CMD curl --fail http://localhost:8081/healthcheck

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["server", "/zucchini-ui/config.yml"]
