package example.reporting.reportconverter.converter;

import com.google.common.base.CharMatcher;
import com.google.common.hash.Hashing;
import example.reporting.feature.domain.FeatureFactory;
import example.reporting.feature.model.Feature;
import example.reporting.reportconverter.report.ReportBackground;
import example.reporting.reportconverter.report.ReportFeature;
import example.reporting.reportconverter.report.ReportScenario;
import example.reporting.reportconverter.report.ReportStep;
import example.reporting.scenario.domain.ScenarioRepository;
import example.reporting.scenario.model.Background;
import example.reporting.scenario.model.Scenario;
import example.reporting.scenario.model.Step;
import ma.glasnost.orika.CustomConverter;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.impl.ConfigurableMapper;
import ma.glasnost.orika.metadata.Type;
import ma.glasnost.orika.metadata.TypeFactory;

import java.nio.charset.StandardCharsets;
import java.util.Locale;

class ReportMapper extends ConfigurableMapper {

    private final FeatureFactory featureFactory;

    private final ScenarioRepository scenarioRepository;

    public ReportMapper(final FeatureFactory featureFactory, final ScenarioRepository scenarioRepository) {
        super(false);
        this.featureFactory = featureFactory;
        this.scenarioRepository = scenarioRepository;
    }

    public void initMapper() {
        init();
    }

    @Override
    protected void configure(final MapperFactory factory) {
        factory.registerObjectFactory(new FeatureObjectFactory(featureFactory), TypeFactory.valueOf(Feature.class));
        factory.registerObjectFactory(new ScenarioObjectFactory(scenarioRepository), TypeFactory.valueOf(Scenario.class));

        factory.getConverterFactory().registerConverter("uppercaseToEnum", new UppercaseStringToEnumConverter());
        factory.getConverterFactory().registerConverter("trimString", new TrimStringConverter());
        factory.getConverterFactory().registerConverter("sha1", new StringToSha1SumConverter());
        factory.getConverterFactory().registerConverter("stripAtSign", new StripAtSignConverter());

        factory.classMap(ReportFeature.class, Feature.class)
                .fieldMap("id", "featureKey").converter("sha1").add()
                .fieldMap("keyword", "info.keyword").converter("trimString").add()
                .fieldMap("name", "info.name").converter("trimString").add()
                .fieldMap("tags{name}", "tags{}").converter("stripAtSign").add()
                .field("filename", "location.filename")
                .field("line", "location.line")
                .byDefault()
                .register();

        factory.classMap(ReportScenario.class, Scenario.class)
                .fieldMap("id", "scenarioKey").converter("sha1").add()
                .fieldMap("keyword", "info.keyword").converter("trimString").add()
                .fieldMap("name", "info.name").converter("trimString").add()
                .fieldMap("tags{name}", "tags{}").converter("stripAtSign").add()
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

    private static class StringToSha1SumConverter extends CustomConverter<String, String> {

        @Override
        public String convert(final String source, final Type<? extends String> destinationType) {
            if (source == null) {
                return null;
            }

            return Hashing.sha1().hashString(source, StandardCharsets.UTF_8).toString();
        }

    }

    private static class StripAtSignConverter extends CustomConverter<String, String> {

        private static final CharMatcher AT_SIGN_MATCHER = CharMatcher.is('@');

        @Override
        public String convert(final String source, final Type<? extends String> destinationType) {
            if (source == null) {
                return null;
            }
            return AT_SIGN_MATCHER.trimLeadingFrom(source);
        }

    }

    private static class TrimStringConverter extends CustomConverter<String, String> {

        @Override
        public String convert(final String source, final Type<? extends String> destinationType) {
            if (source == null) {
                return null;
            }

            return CharMatcher.WHITESPACE.trimFrom(source);
        }

    }

    private static class UppercaseStringToEnumConverter extends CustomConverter<String, Enum<?>> {

        @Override
        public Enum<?> convert(final String source, final Type<? extends Enum<?>> destinationType) {
            if (source == null) {
                return null;
            }

            final String uppercaseValue = source.toUpperCase(Locale.ENGLISH);
            return Enum.valueOf((Class) destinationType.getRawType(), uppercaseValue);
        }

    }
}
