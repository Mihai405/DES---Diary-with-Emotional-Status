package com.ada.des.controller;

import com.ada.des.service.impl.OpenAIService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class ChatGPTController {

    private final OpenAIService openAIService;

    public ChatGPTController(OpenAIService openAIService) {
        this.openAIService = openAIService;
    }

    @GetMapping("/test/chat")
    public String chat(@RequestParam String prompt) {
        return openAIService.getChatGPTResponse(prompt);
    }
    @GetMapping("/test")
    public String helloWorld() {
        return "hello world";
    }
}
