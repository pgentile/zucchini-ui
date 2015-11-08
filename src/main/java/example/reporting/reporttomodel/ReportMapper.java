package example.reporting.reporttomodel;

import com.google.common.base.CharMatcher;
import example.reporting.model.Background;
import example.reporting.model.Feature;
import example.reporting.model.Scenario;
import example.reporting.model.Step;
import example.reporting.report.ReportBackground;
import example.reporting.report.ReportFeature;
import example.reporting.report.ReportScenario;
import example.reporting.report.ReportStep;
import ma.glasnost.orika.CustomConverter;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.impl.ConfigurableMapper;
import ma.glasnost.orika.metadata.Type;

import java.util.Locale;

class ReportMapper extends ConfigurableMapper {

    @Override
    protected void configure(MapperFactory factory) {
        factory.getConverterFactory().registerConverter("uppercaseToEnum", new UppercaseStringToEnumConverter());
        factory.getConverterFactory().registerConverter("trimString", new TrimStringConverter());

        factory.classMap(ReportFeature.class, Feature.class)
                .fieldMap("keyword", "info.keyword").converter("trimString").add()
                .fieldMap("name", "info.name").converter("trimString").add()
                .field("tags{name}", "tags{}")
                .field("filename", "location.filename")
                .field("line", "location.line")
                .byDefault()
                .register();

        factory.classMap(ReportScenario.class, Scenario.class)
                .fieldMap("keyword", "info.keyword").converter("trimString").add()
                .fieldMap("name", "info.name").converter("trimString").add()
                .field("tags{name}", "tags{}")
                .field("line", "location.line")
                .byDefault()
                .register();

        factory.classMap(ReportBackground.class, Background.class)
                .fieldMap("keyword", "info.keyword").converter("trimString").add()
                .fieldMap("name", "info.name").converter("trimString").add()
                .field("line", "location.line")
                .byDefault()
                .register();

        factory.classMap(ReportStep.class, Step.class)
                .fieldMap("keyword", "info.keyword").converter("trimString").add()
                .fieldMap("name", "info.name").converter("trimString").add()
                .field("line", "location.line")
                .fieldMap("result.errorMessage", "errorMessage").converter("trimString").add()
                .fieldMap("result.status", "status").converter("uppercaseToEnum").add()
                .byDefault()
                .register();
    }

    private static class UppercaseStringToEnumConverter extends CustomConverter<String, Enum<?>> {

        @Override
        public Enum<?> convert(String source, Type<? extends Enum<?>> destinationType) {
            if (source == null) {
                return null;
            }

            final String uppercaseValue = source.toUpperCase(Locale.ENGLISH);
            return Enum.valueOf((Class) destinationType.getRawType(), uppercaseValue);
        }

    }

    private static class TrimStringConverter extends CustomConverter<String, String> {

        @Override
        public String convert(String source, Type<? extends String> destinationType) {
            if (source == null) {
                return null;
            }

            return CharMatcher.WHITESPACE.trimFrom(source);
        }

    }



}
