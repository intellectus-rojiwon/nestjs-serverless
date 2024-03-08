FROM  node:20-alpine AS builder

WORKDIR /usr/src/app

COPY  package*.json tsconfig*.json ./
RUN npm i -g npm && npm ci

COPY . .
RUN npm run build:prisma
RUN npm run build && npm prune --omit=dev

FROM public.ecr.aws/lambda/nodejs:20 AS runner

WORKDIR /usr/src/app

COPY  --from=builder /usr/src/app/node_modules ./node_modules
RUN mkdir ./prisma
COPY  --from=builder /usr/src/app/prisma/client ./prisma/client
COPY  --from=builder /usr/src/app/build ./build

CMD [ "build/lambda.handler" ]