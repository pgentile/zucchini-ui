FROM java:8-jre
MAINTAINER Pierre Gentile <pierre.gentile.perso@gmail.com>

ADD build/libs/tests-cucumber-capsule-*-capsule.jar src/docker/config.yml src/docker/bootstrap.sh /usr/share/tests-cucumber/
RUN chmod +x /usr/share/tests-cucumber/bootstrap.sh

EXPOSE 8080 8081

CMD ["/usr/share/tests-cucumber/bootstrap.sh"]
