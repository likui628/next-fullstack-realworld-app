FROM node:20-alpine

RUN npm config set registry https://registry.npmmirror.com

WORKDIR /app

COPY package.json package-lock.json ./
COPY next.config.js tailwind.config.ts tsconfig.json ./
COPY .env.docker ./.env
COPY prisma ./prisma

RUN npm install
RUN npx prisma generate

CMD ["npm", "run", "dev"]




