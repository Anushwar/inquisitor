package com.inquisitor.inquisitor.dto;

import java.util.Arrays;
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
            private List<String> enumValues;

        }
    }

    public GPTFunction() {
        this.name = "generate_graph";
        this.description = "Based on the input CSV Data, understand the data and determine the graph to be used to represent this data. Data can be can be Categorical, Numerical, Temporal. unit is only applicable for Numerical type. Can be number, ratio, percentage or currency. Only generate a graph config with xfield, yfield and graph_name from ant design graphs.";
        this.parameters = new Parameters();
        this.parameters.setType("object");

        Parameters.Property xfieldProperty = new Parameters.Property();
        xfieldProperty.setType("string");
        xfieldProperty.setDescription("Name of the CSV Column that goes on x-axis.");

        Parameters.Property yfieldProperty = new Parameters.Property();
        yfieldProperty.setType("string");
        yfieldProperty.setDescription("Name of the CSV Column that goes on y-axis.");

        Parameters.Property graphNameProperty = new Parameters.Property();
        graphNameProperty.setType("string");
        graphNameProperty.setEnumValues(Arrays.asList("Line", "Pie", "Bar"));

        this.parameters.setProperties(Map.of(
                "xfield", xfieldProperty,
                "yfield", yfieldProperty,
                "graph_name", graphNameProperty));
    }
}