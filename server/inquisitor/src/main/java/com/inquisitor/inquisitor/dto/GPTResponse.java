package com.inquisitor.inquisitor.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GPTResponse {

    private List<Choice> choices;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Choice {
        private int index;
        private ResponseMessage message;

        @Data
        @EqualsAndHashCode(callSuper = false)
        public class ResponseMessage extends Message {
            private Func function_call;

            @Data
            public class Func {
                private String name;
                private String arguments;
            }
        }
    }

}
