package io.testscucumber.backend.reportconverter.converter;

import io.testscucumber.backend.reportconverter.report.ReportComment;
import ma.glasnost.orika.CustomConverter;
import ma.glasnost.orika.metadata.Type;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.stream.Collectors;

class ReportCommentToStringConverter extends CustomConverter<List<ReportComment>, String> {

    private static final Logger LOGGER = LoggerFactory.getLogger(ReportCommentToStringConverter.class);

    @Override
    public String convert(final List<ReportComment> source, final Type<? extends String> destinationType) {
        LOGGER.debug("Converted comment: {}", source);

        if (source == null || source.isEmpty()) {
            return null;
        }

        return source.stream()
            .map(ReportComment::getValue)
            .collect(Collectors.joining("\n"));
    }

}
