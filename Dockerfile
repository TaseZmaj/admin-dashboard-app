FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# We skip 'npm run build' entirely for this test
EXPOSE 5173

# We use 'dev' and add '--host' so you can actually see the app 
# from your browser outside the container.
CMD ["npm", "run", "dev", "--", "--host"]