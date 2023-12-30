FROM node:20-alpine

RUN npm config set registry https://registry.npmmirror.com

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
COPY next.config.js tailwind.config.ts tsconfig.json ./
RUN npm install

# Prisma setup
COPY .env.docker ./.env
COPY prisma ./prisma
RUN npx prisma generate

CMD ["npm", "run", "dev"]




