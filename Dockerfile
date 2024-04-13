FROM node:20.10.0 as build

WORKDIR /workspace
#setup corepack
RUN npm install -g corepack
RUN corepack enable
COPY . .
RUN yarn install
RUN yarn scoreboard:build
RUN yarn frontend:build

#webserver
FROM nginx:stable-alpine
ARG BUILD_CONTEXT
COPY --from=build /workspace/apps/react-demo/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
