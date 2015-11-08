package example.reporting.reporttomodel;

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

    private static class UppercaseStringToEnumConverter extends CustomConverter<String, Enum<?>> {

        @Override
        public Enum<?> convert(String source, Type<? extends Enum<?>> destinationType) {
            final String uppercaseValue = source.toUpperCase(Locale.ENGLISH);
            return Enum.valueOf((Class) destinationType.getRawType(), uppercaseValue);
        }

    }

    @Override
    protected void configure(MapperFactory factory) {
        factory.getConverterFactory().registerConverter("uppercaseToEnum", new UppercaseStringToEnumConverter());

        factory.classMap(ReportFeature.class, Feature.class)
                .field("keyword", "info.keyword")
                .field("name", "info.name")
                .field("tags{name}", "tags{}")
                .field("filename", "location.filename")
                .field("line", "location.line")
                .byDefault()
                .register();

        factory.classMap(ReportScenario.class, Scenario.class)
                .field("keyword", "info.keyword")
                .field("name", "info.name")
                .field("tags{name}", "tags{}")
                .field("line", "location.line")
                .byDefault()
                .register();

        factory.classMap(ReportBackground.class, Background.class)
                .field("keyword", "info.keyword")
                .field("name", "info.name")
                .field("line", "location.line")
                .byDefault()
                .register();

        factory.classMap(ReportStep.class, Step.class)
                .field("keyword", "info.keyword")
                .field("name", "info.name")
                .field("line", "location.line")
                .fieldMap("result.status", "status").converter("uppercaseToEnum").add()
                .byDefault()
                .register();
    }

}
