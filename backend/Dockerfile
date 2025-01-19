# Use the official OpenJDK image as a base image
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file from the local target directory to the container's /app directory
COPY target/simmanagment-0.0.1-SNAPSHOT.jar /app/app.jar

# Expose the port on which the Spring Boot application will run (8080)
EXPOSE 8080

# Run the application inside the container
ENTRYPOINT ["java", "-jar", "app.jar"]
