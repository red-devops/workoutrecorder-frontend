FROM node:16.1-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY frontend/package.json /app
RUN npm install
COPY ./frontend /app
RUN npm run build --prod

FROM nginx:1.17.1-alpine
COPY --from=build-step /app/dist/workoutrecorder-front /usr/share/nginx/html