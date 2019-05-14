FROM openjdk:11-jre-slim
MAINTAINER Pierre Gentile <pierre.gentile.perso@gmail.com>

ARG ZUCCHINI_VERSION
ENV ZUCCHINI_VERSION=${ZUCCHINI_VERSION}

# Create runtime user
RUN groupadd -r zucchini && useradd -r -g zucchini zucchini

ADD src/docker/config.yml /zucchini-ui/
ADD src/docker/docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

ADD build/libs/zucchini-ui-app-${ZUCCHINI_VERSION}-all.jar /zucchini-ui/

EXPOSE 8080 8081

USER zucchini
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["server", "/zucchini-ui/config.yml"]
