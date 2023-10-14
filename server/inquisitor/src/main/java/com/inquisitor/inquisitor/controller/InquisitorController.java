package com.inquisitor.inquisitor.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.inquisitor.inquisitor.dto.GPTRequest;
import com.inquisitor.inquisitor.dto.GPTResponse;

@RestController
@RequestMapping("/get")
public class InquisitorController {

    @Value("${openai.base-url}")
    private String baseUrl;

    @Value("${openai.model}")
    private String model;

    @Autowired
    private RestTemplate template;

    @GetMapping("/chat")
    public String gptResponse(@RequestParam("prompt") String prompt) {
        GPTRequest request = new GPTRequest(model, prompt);
        GPTResponse response = template.postForObject(baseUrl, request, GPTResponse.class);

        if (response != null)
            return response.getChoices().get(0).getMessage().getContent();
        else
            throw new Error("Error! No response.");
    }

}
