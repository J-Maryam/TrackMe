package org.youcode.trackme.security.services.implementations;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Service
public class HaveIBeenPwnedService {

    private static final String HIBP_API_URL = "https://api.pwnedpasswords.com/range/";

    public boolean isPasswordPwned(String password) {
        try {
            String sha1Hash = hashPassword(password);
            String prefix = sha1Hash.substring(0, 5); // Les 5 premiers caractères du hash
            String suffix = sha1Hash.substring(5); // Le reste du hash

            RestTemplate restTemplate = new RestTemplate();
            String url = HIBP_API_URL + prefix;

            HttpHeaders headers = new HttpHeaders();
            headers.add("User-Agent", "eBankingApp"); // Nécessaire pour l'API

            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                String body = response.getBody();
                return body != null && body.contains(suffix.toUpperCase());
            }

            return false;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    private String hashPassword(String password) throws NoSuchAlgorithmException {
        MessageDigest sha1 = MessageDigest.getInstance("SHA-1");
        byte[] hashedBytes = sha1.digest(password.getBytes());
        StringBuilder hash = new StringBuilder();
        for (byte b : hashedBytes) {
            hash.append(String.format("%02x", b));
        }
        return hash.toString().toUpperCase();
    }
}

