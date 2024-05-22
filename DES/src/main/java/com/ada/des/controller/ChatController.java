package com.ada.des.controller;

import com.ada.des.entity.chatGpt.ChatRequest;
import com.ada.des.entity.chatGpt.ChatResponse;

import com.theokanning.openai.audio.CreateTranscriptionRequest;
import com.theokanning.openai.service.OpenAiService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;


@RestController
public class ChatController {

    @Qualifier("openaiRestTemplate")
    @Autowired
    private RestTemplate restTemplate;

    @Value("${openai.model}")
    private String model;

    @Value("${openai.api.url}")
    private String apiUrl;

    @Value("${openai.api.key}")
    private String openaiApiKey;

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
    @GetMapping("/audio")
    public String transcribeAudio(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return "No file uploaded";
        }

        OpenAiService service = new OpenAiService(openaiApiKey);
        Path tempFile = null;

        try {
            // Create a temporary file
            tempFile = Files.createTempFile(null, ".mp3");
            file.transferTo(tempFile);

            CreateTranscriptionRequest request = new CreateTranscriptionRequest();
            request.setModel("whisper-1");

            return service.createTranscription(request, tempFile.toString()).getText();
        } catch (IOException e) {
            return "Failed to process the file: " + e.getMessage();
        } finally {
            // Clean up the temporary file
            if (tempFile != null) {
                try {
                    Files.deleteIfExists(tempFile);
                } catch (IOException e) {
                    System.err.println("Failed to delete temporary file: " + e.getMessage());
                }
            }
        }
    }
    @PostMapping("/chat/test")
    public String test(){
        return "Hello";
    }

}