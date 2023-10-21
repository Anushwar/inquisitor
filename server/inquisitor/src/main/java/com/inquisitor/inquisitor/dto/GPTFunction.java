package com.inquisitor.inquisitor.dto;

import java.util.Map;

import lombok.Data;

@Data
public class GPTFunction {

    private String name;
    private String description;
    private Parameters parameters;

    @Data
    public static class Parameters {
        private String type;
        private Properties properties;

        @Data
        public static class Properties {
            private Config config;

            @Data
            public static class Config {
                private String type;
                Map<String, Object> items;
            }
        }
    }
}