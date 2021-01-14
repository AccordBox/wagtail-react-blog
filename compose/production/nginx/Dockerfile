FROM node:12-stretch-slim as frontend-builder

WORKDIR /app/frontend

COPY ./frontend/package.json /app/frontend
# COPY ./frontend/yarn.lock /app/frontend
COPY ./frontend/package-lock.json /app/frontend

ENV PATH ./node_modules/.bin/:$PATH

# RUN yarn install
RUN npm install

COPY ./frontend .

# build storybook
RUN yarn build-storybook

# build frontend app
RUN yarn build

###############################################

FROM nginx:1.19.2-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY ./compose/production/nginx/nginx.conf /etc/nginx/conf.d
# copy storybook
COPY --from=frontend-builder /app/frontend/storybook-static /usr/share/nginx/html/storybook-static
# copy the frontend build
COPY --from=frontend-builder /app/frontend/build /usr/share/nginx/html/build
