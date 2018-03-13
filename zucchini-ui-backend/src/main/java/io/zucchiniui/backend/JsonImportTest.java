package io.zucchiniui.backend;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;
import io.zucchiniui.backend.reportconverter.report.ReportFeature;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;


public class JsonImportTest {
    public static void main(final String[] args) {
        System.out.println("args=" + Arrays.toString(args));
        final ObjectMapper objectMapper = new ObjectMapper().disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
        final CollectionType featureListJavaType = objectMapper.getTypeFactory().constructCollectionType(List.class, ReportFeature.class);
        try {
            final InputStream featureStream = new FileInputStream(args[0]);
            objectMapper.readValue(featureStream, featureListJavaType);
        } catch (IOException ioe) {
            throw new RuntimeException(ioe);
        }
    }
}
