# Use Node.js base image
FROM node:20-alpine

# Build arguments from Jenkins
ARG BUILD_ID
ARG GIT_COMMIT

# Set environment variables
ENV BUILD_ID=${BUILD_ID}
ENV GIT_COMMIT=${GIT_COMMIT}

# Set working directory
WORKDIR /app

# Copy package.json & package-lock.json for dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --silent

# Copy rest of app
COPY . .

# Expose port used by app
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
