FROM openjdk:8-jre
MAINTAINER Pierre Gentile <pierre.gentile.perso@gmail.com>

ARG ZUCCHINI_VERSION
ENV ZUCCHINI_VERSION=${ZUCCHINI_VERSION}

# Create runtime user
RUN groupadd -r zucchini && useradd -r -g zucchini zucchini

ADD src/docker/config.yml /zucchini-ui/
ADD src/docker/docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

ADD build/libs/zucchini-ui-capsule-${ZUCCHINI_VERSION}-capsule.jar /zucchini-ui/

EXPOSE 8080 8081

USER zucchini
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["server", "/zucchini-ui/config.yml"]
