# Stage 1
FROM node:16-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
ENV NODE_OPTIONS="--max-old-space-size=8192"
ENV REACT_APP_API_BASE_URL=""
ENV REACT_APP_PREFIX_API=""
COPY package.json .
RUN npm install --verbose
COPY . .
RUN npm run build

# Stage 2
FROM nginx:stable-alpine
EXPOSE 80
COPY --from=build-step /app/build /usr/share/nginx/html
COPY --from=build-step /app/nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]