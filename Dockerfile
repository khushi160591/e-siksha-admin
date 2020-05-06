FROM node:8.10.0

# set working directory
WORKDIR /app

COPY package*.json ./

RUN npm install

# add app
COPY . .

RUN npm run build

RUN npm install -g serve

WORKDIR /app

EXPOSE 5000
# start app
CMD ["serve", "-s","build","-l","5000"]