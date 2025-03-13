FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package.json ./
# If you use pnpm
COPY pnpm-lock.yaml ./

# Install dependencies
# If you use npm
# RUN npm install
# If you use pnpm (based on your error logs)
RUN npm install -g pnpm && pnpm install

# Copy the rest of the application
COPY . .

# Set API URL environment variable
ENV NEXT_PUBLIC_API_URL=https://backend.fuadfakhruz.id

# Build the application - skip linting during build
ENV NEXT_DISABLE_ESLINT_DURING_BUILD=true

# Build the application
# If you use npm
# RUN npm run build
# If you use pnpm
RUN pnpm build

# Expose the port
EXPOSE 3000

# Start the application
# If you use npm
# CMD ["npm", "start"]
# If you use pnpm
CMD ["pnpm", "start"]