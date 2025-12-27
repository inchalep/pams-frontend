FROM node:20-alpine as build

# Set default values to env variable

ARG VITE_BACKEND_URL

ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


# ---------- NGIX ------

FROM nginx:1.23-alpine

WORKDIR /usr/share/nginx/html

# Remove default nginx static files
RUN rm -rf *

# Copy Vite build output to nginx
COPY --from=build /app/dist .

EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off;"]