package com.inquisitor.inquisitor.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.inquisitor.inquisitor.dto.GPTRequest;
import com.inquisitor.inquisitor.dto.GPTResponse;

@RestController
@RequestMapping("/gpt")
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

    @PostMapping("/process")
    public String processFileUpload(@RequestParam("file") MultipartFile file) {
        // Check if the file is empty
        if (file.isEmpty()) {
            throw new Error("Please upload a CSV file!");
        }

        try {
            String parsedCSV = parseCSV(file);
            GPTRequest request = new GPTRequest(model, parsedCSV);
            GPTResponse response = template.postForObject(baseUrl, request, GPTResponse.class);

            if (response != null)
                return response.getChoices().get(0).getMessage().getContent();
            else
                throw new Error("Error! No response.");
        } catch (IOException e) {
            throw new Error("Error parsing data.");
        }
    }

    private String parseCSV(MultipartFile file) throws IOException {
        byte[] bytes;
        try {
            bytes = file.getBytes();
            String completeData = new String(bytes);
            return completeData;

        } catch (IOException e) {
            throw new Error("Error parsing CSV!");
        }
    }

}
