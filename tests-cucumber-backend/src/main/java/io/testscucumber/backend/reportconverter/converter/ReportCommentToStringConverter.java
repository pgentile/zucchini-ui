package io.testscucumber.backend.reportconverter.converter;

import io.testscucumber.backend.reportconverter.report.ReportComment;
import ma.glasnost.orika.CustomConverter;
import ma.glasnost.orika.metadata.Type;

import java.util.List;
import java.util.stream.Collectors;

class ReportCommentToStringConverter extends CustomConverter<List<ReportComment>, String> {

    @Override
    public String convert(final List<ReportComment> source, final Type<? extends String> destinationType) {
        if (source == null || source.isEmpty()) {
            return null;
        }

        return source.stream()
            .map(ReportComment::getValue)
            .collect(Collectors.joining("\n"));
    }

}
