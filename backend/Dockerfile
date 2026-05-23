FROM alpine:3.21

ARG PB_VERSION=0.26.6

ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip

RUN apk add --no-cache unzip \
    && unzip /tmp/pb.zip -d /pb \
    && rm /tmp/pb.zip \
    && apk del unzip

EXPOSE 8090

CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8090", "--dir=/pb_data", "--migrationsDir=/pb_migrations", "--hooksDir=/pb_hooks"]
