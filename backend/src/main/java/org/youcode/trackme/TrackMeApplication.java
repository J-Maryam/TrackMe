package org.youcode.trackme;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TrackMeApplication {

    public static void main(String[] args) {
        SpringApplication.run(TrackMeApplication.class, args);
        System.out.println("TrackMe Application Started");
    }

}
