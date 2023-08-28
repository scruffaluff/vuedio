# Docker instructions to build a deployment Linux container.
#
# For more information, visit https://docs.docker.com/engine/reference/builder.

FROM node:20.5.0-alpine3.18 as build

WORKDIR /repo

COPY . .

RUN corepack enable pnpm && pnpm install --frozen-lockfile && pnpm build

FROM nginxinc/nginx-unprivileged:1.25.2-alpine3.18

COPY --chmod=755 --from=build /repo/dist /usr/share/nginx/html
