FROM java:8-jre
MAINTAINER Pierre Gentile <pierre.gentile.perso@gmail.com>

ARG VERSION

ADD build/libs/zucchini-ui-capsule-${VERSION}-capsule.jar src/docker/config.yml src/docker/bootstrap.sh /zucchini-ui/
RUN chmod +x /zucchini-ui/bootstrap.sh

EXPOSE 8080 8081

CMD ["/zucchini-ui/bootstrap.sh"]
