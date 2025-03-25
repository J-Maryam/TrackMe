# Étape 1 : Build avec Maven et Java 21
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Étape 2 : Exécution avec Java 21
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/TrackMe-0.0.1-SNAPSHOT.jar ./TrackMe.jar
EXPOSE 8080
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "TrackMe.jar"]