package com.inquisitor.inquisitor.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class GPTRequest {

    private String model;
    private List<Message> messages;
    private ArrayList<GPTFunction> functions;

    public GPTRequest(String model, String prompt, GPTFunction function) {
        this.model = model;
        this.messages = new ArrayList<>();
        this.messages.add(
                new Message("system",
                        "You are an AI specialized in data and analytics. Please provide detailed and accurate answers to questions related to data analysis, statistics, data visualization, machine learning, and related topics. Avoid generating responses unrelated to these subjects. If the query is not related to data and analytics, politely decline to answer.\n"));
        this.messages.add(new Message("user", prompt));
        this.functions = new ArrayList<>();
        this.functions.add(function);
    }

}
