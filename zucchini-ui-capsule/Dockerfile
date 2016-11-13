FROM openjdk:8-jre
MAINTAINER Pierre Gentile <pierre.gentile.perso@gmail.com>

ARG ZUCCHINI_VERSION
ENV ZUCCHINI_VERSION=${ZUCCHINI_VERSION}

# Create runtime user
RUN groupadd -r zucchini && useradd -r -g zucchini zucchini

# Install gosu
# See https://github.com/tianon/gosu for instructions
ENV GOSU_VERSION 1.10
RUN set -x \
    && apt-get update && apt-get install -y --no-install-recommends wget && rm -rf /var/lib/apt/lists/* \
    && dpkgArch="$(dpkg --print-architecture | awk -F- '{ print $NF }')" \
    && wget -O /usr/local/bin/gosu "https://github.com/tianon/gosu/releases/download/$GOSU_VERSION/gosu-$dpkgArch" \
    && wget -O /usr/local/bin/gosu.asc "https://github.com/tianon/gosu/releases/download/$GOSU_VERSION/gosu-$dpkgArch.asc" \
    && export GNUPGHOME="$(mktemp -d)" \
    && gpg --keyserver ha.pool.sks-keyservers.net --recv-keys B42F6819007F00F88E364FD4036A9C25BF357DD4 \
    && gpg --batch --verify /usr/local/bin/gosu.asc /usr/local/bin/gosu \
    && rm -r "$GNUPGHOME" /usr/local/bin/gosu.asc \
    && chmod +x /usr/local/bin/gosu \
    && gosu nobody true \
    && apt-get purge -y --auto-remove wget

ADD src/docker/config.yml src/docker/docker-entrypoint.sh /zucchini-ui/
RUN chmod +x /zucchini-ui/docker-entrypoint.sh

ADD build/libs/zucchini-ui-capsule-${ZUCCHINI_VERSION}-capsule.jar /zucchini-ui/

EXPOSE 8080 8081
ENTRYPOINT ["/zucchini-ui/docker-entrypoint.sh"]
CMD ["server", "config.yml"]
