FROM node:18-alpine AS base
WORKDIR /app
COPY . .
RUN npm ci && \
    npm run build && \
    npm prune --production

RUN addgroup -S appgroup && \
adduser -S nextjs -G appgroup && \
chown -R nextjs:appgroup /app && \
chmod -R 755 /app

USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["npm", "start"]