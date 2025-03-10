package org.youcode.trackme.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Applique CORS à toutes les routes
                .allowedOrigins("http://localhost:4200") // Autorise uniquement localhost:4200
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Méthodes HTTP autorisées
                .allowedHeaders("*") // Tous les en-têtes autorisés
                .allowCredentials(true); // Autorise les cookies/authentification si nécessaire
    }
}