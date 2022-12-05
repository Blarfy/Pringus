package com.example.pringusspring.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;

public class SeatingSerializer extends JsonSerializer<int[]> {
    @Override
    public void serialize(int[] stray, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        gen.writeStartArray();
        if(stray ==  null){
            gen.writeStartArray();
            gen.writeEndArray();
        }else{
            gen.writeObject(stray);
        }
    }
}