FROM node:14-stretch-slim as frontend-builder

WORKDIR /app/frontend

COPY ./frontend/package.json /app/frontend
COPY ./frontend/yarn.lock /app/frontend

ENV PATH ./node_modules/.bin/:$PATH

RUN yarn install

COPY ./frontend .

# build frontend app
RUN yarn build

###############################################

FROM nginx:1.19.2-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY ./compose/production/nginx/nginx.conf /etc/nginx/conf.d

# copy the frontend build
COPY --from=frontend-builder /app/frontend/build /usr/share/nginx/html/build
