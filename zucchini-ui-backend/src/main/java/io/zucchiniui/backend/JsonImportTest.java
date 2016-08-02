package io.zucchiniui.backend;

import io.zucchiniui.backend.reportconverter.report.ReportFeature;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;


public class JsonImportTest {
    public static void main(final String[] args) {
        System.out.println("args=" + Arrays.toString(args));
        final ObjectMapper objectMapper = new ObjectMapper().disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);;
        final CollectionType featureListJavaType = objectMapper.getTypeFactory().constructCollectionType(List.class, ReportFeature.class);
        try {
            final InputStream featureStream = new FileInputStream(args[0]);
            objectMapper.readValue(featureStream, featureListJavaType);
        } catch (FileNotFoundException fnfe) {
            throw new RuntimeException(fnfe);
        } catch (IOException ioe) {
            throw new RuntimeException(ioe);
        }
    }
}
