FROM node:14-alpine AS builder
WORKDIR /usr/app
COPY . .
RUN npm install && npm run build

FROM node:14-alpine
WORKDIR /usr/app
COPY --from=builder /usr/app/dist ./
COPY --from=builder /usr/app/package.json ./package.json
RUN npm install --only=production
ENV PORT=3000
EXPOSE 3000
CMD [ "node", "-r", "dotenv/config", "src/main" ]
