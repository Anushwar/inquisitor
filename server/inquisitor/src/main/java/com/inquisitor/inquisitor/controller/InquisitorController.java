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

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.inquisitor.inquisitor.dto.GPTFunction;
import com.inquisitor.inquisitor.dto.GPTRequest;
import com.inquisitor.inquisitor.dto.GPTResponse;
import com.inquisitor.inquisitor.dto.Message;

@RestController
@RequestMapping("/gpt")
public class InquisitorController {

    @Value("${openai.base-url}")
    private String baseUrl;

    @Value("${openai.model}")
    private String model;

    @Autowired
    private RestTemplate template;

    private String funcString = "{\n            \"name\": \"get_config_from_csv\",\n            \"description\": \"Based on the input CSV data, generate a json config for this csv with column name as key and inside which Each column object will have type and unit. Identify the type and unit. type can be can be Categorical, Numerical, Temporal. unit is only applicable for Numerical type. Can be number, ratio, percentage or currency.\",\n            \"parameters\": {\n                \"type\": \"object\",\n                \"properties\": {\n                    \"config\": {\n                        \"type\": \"array\",\n                        \"items\": {\n                            \"type\": \"object\",\n                            \"properties\": {\n                                \"column_name\": {\n                                    \"type\": \"string\",\n                                    \"description\": \"Name of the column\"\n                                },\n                                \"type\": {\n                                    \"type\": \"string\",\n                                    \"description\": \"Could be Temporal, Categorical, or Numerical.\"\n                                },\n                                \"unit\": {\n                                    \"type\": \"string\",\n                                    \"description\": \"Only applicable for Numerical type. Can be number, ratio, percentage or currency.\"\n                                }\n                            }\n                        }\n                    }\n                }\n            }\n        }";

    @GetMapping("/chat")
    public Message gptResponse(@RequestParam("prompt") String prompt)
            throws JsonMappingException, JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        GPTFunction function = objectMapper.readValue(funcString, GPTFunction.class);
        GPTRequest request = new GPTRequest(model, prompt, function);
        GPTResponse response = template.postForObject(baseUrl, request, GPTResponse.class);

        if (response != null)
            return response.getChoices().get(0).getMessage();
        else
            throw new Error("Error! No response.");
    }

    @PostMapping("/process")
    public Message processFileUpload(@RequestParam("file") MultipartFile file,
            @RequestParam("prompt") String prompt) {
        // Check if the file is empty
        if (file.isEmpty()) {
            throw new Error("Please upload a CSV file!");
        }

        try {
            String parsedCSV = parseCSV(file);
            ObjectMapper objectMapper = new ObjectMapper();
            GPTFunction function = objectMapper.readValue(funcString, GPTFunction.class);
            GPTRequest request = new GPTRequest(model, parsedCSV + " " + prompt, function);
            GPTResponse response = template.postForObject(baseUrl, request, GPTResponse.class);

            if (response != null) {
                return response.getChoices().get(0).getMessage();
            } else {
                throw new Error("Error! No response.");
            }
        } catch (IOException e) {
            throw new Error("Error parsing data.");
        }
    }

    private String parseCSV(MultipartFile file) throws IOException {
        byte[] bytes;
        try {
            bytes = file.getBytes();
            String completeData = new String(bytes);
            return completeData.replaceAll(System.lineSeparator(), "\\n");

        } catch (IOException e) {
            throw new Error("Error parsing CSV!");
        }
    }

}
