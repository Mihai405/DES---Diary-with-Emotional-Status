package com.ada.des.controller;

import com.ada.des.entity.chatGpt.ChatRequest;
import com.ada.des.entity.chatGpt.ChatResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class ChatController {

    @Qualifier("openaiRestTemplate")
    @Autowired
    private RestTemplate restTemplate;

    @Value("${openai.model}")
    private String model;

    @Value("${openai.api.url}")
    private String apiUrl;

    @GetMapping("/chat")
    public String chat(@RequestParam String prompt) {
        try {
            // create a request
            ChatRequest request = new ChatRequest(model, prompt);
            System.out.println(request);
            // call the API
            ChatResponse response = restTemplate.postForObject(apiUrl, request, ChatResponse.class);
            System.out.println("test:" + response);
            if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
                System.out.println("No response");
                return "No response";
            }
            ;
            // return the first response
            return response.getChoices().get(0).getMessage().getContent();
        } catch (Exception e) {
            // Log and handle the exception appropriately
            return "Failed to process the request: " + e.getMessage();
        }
    }

}