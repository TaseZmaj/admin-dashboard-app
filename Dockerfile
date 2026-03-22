FROM node:20-alpine
WORKDIR /app

# Copy dependency files and install
COPY package*.json ./
RUN npm install

# Copy everything else
COPY . .

# Build the project
RUN npm run build

# Expose the default Vite preview port
EXPOSE 4173

# Start the built app using Vite's preview command
CMD ["npm", "run", "preview", "--", "--host"]