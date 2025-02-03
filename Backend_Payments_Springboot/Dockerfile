# Usar la imagen base de Eclipse Temurin con Java 21
FROM eclipse-temurin:21-jdk

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar todos los archivos necesarios al contenedor
COPY . .

# Dar permisos de ejecución al archivo gradlew
RUN chmod +x ./gradlew

# Crear directorios necesarios y establecer permisos adecuados
RUN mkdir -p ~/.gradle /app/.gradle /app/build && chmod -R 777 ~/.gradle /app/.gradle /app/build

# Establecer el directorio para los archivos de configuración de Gradle
ENV GRADLE_USER_HOME=/app/.gradle

# Configurar las opciones de Gradle
ENV GRADLE_OPTS="-Dorg.gradle.daemon=false -Dorg.gradle.parallel=true"

# Exponer el puerto donde corre la aplicación (8080 por defecto, pero puedes cambiarlo si lo necesitas)
EXPOSE 8080

# Comando para ejecutar Spring Boot en modo desarrollo (con DevTools y live reload)
CMD ["./gradlew", "bootRun", "--no-daemon", "-Dspring-boot.devtools.restart.enabled=true"]
