FROM node:18-alpine AS base
WORKDIR /app
COPY . .

RUN apk --no-cache add curl && \ 
    npm ci && \
    npm run build 

EXPOSE 3000

CMD ["npm", "start"]