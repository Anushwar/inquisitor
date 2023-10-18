package com.inquisitor.inquisitor.dto;

import java.util.List;
import java.util.Map;

import lombok.Data;

// This Class does nothing, kept it for reference.
@Data
public class GPTFunction {

    private String name;
    private String description;
    private Parameters parameters;

    @Data
    public static class Parameters {
        private String type;
        private Map<String, Property> properties;
        private List<String> required;

        @Data
        public static class Property {
            private String type;
            private String description;

        }
    }

}