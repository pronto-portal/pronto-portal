FROM node:18-alpine AS base
WORKDIR /app
COPY . .

RUN echo "NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=${NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}" >> .env.local
RUN echo "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}" >> .env.local
RUN echo "NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY=${NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY}" >> .env.local
RUN echo "NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}" >> .env.local

RUN apk --no-cache add curl && \ 
    npm ci && \
    npm run build 

EXPOSE 3000

CMD ["npm", "start"]