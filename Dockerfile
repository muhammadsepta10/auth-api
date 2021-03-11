FROM node:14

# Env
ENV NODE_ENV production
ENV PORT 5001
ENV DB_HOST localhost
ENV DB_USER postgres
ENV DB_PASS M1ssiidea
ENV DB_NAME oauth
ENV DB_PORT 5432
ENV SECRET_CODE *(&Y^TUGFGHVBJNK&*^TYFGVH
ENV NAME_PROGRAM oauth
WORKDIR /Users/RedBox167/Documents/projects/oauth

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build

EXPOSE 5001
CMD [ "node", "dist/index.js" ]