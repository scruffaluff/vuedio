# Docker instructions to build a deployment Linux container.
#
# For more information, visit https://docs.docker.com/engine/reference/builder.

FROM debian:13 AS build

WORKDIR /repo

RUN apt-get update && apt-get install --yes curl

RUN curl -LSfs https://scruffaluff.github.io/picoware/install/just.sh | sh -s \
  -- --global

COPY . .

RUN just setup build

FROM nginx:1.30

COPY --from=build /repo/build/dist /usr/share/nginx/html
