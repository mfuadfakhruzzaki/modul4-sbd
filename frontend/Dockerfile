FROM node:22-alpine

WORKDIR /app

# Copy package.json first to leverage Docker cache
COPY package.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Set API URL environment variable
ENV NEXT_PUBLIC_API_URL=https://backend.fuadfakhruz.id

# Build the application
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]