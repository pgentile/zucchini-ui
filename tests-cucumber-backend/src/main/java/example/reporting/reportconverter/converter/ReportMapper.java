package example.reporting.reportconverter.converter;

import example.reporting.api.feature.Feature;
import example.reporting.api.scenario.AroundAction;
import example.reporting.api.scenario.Background;
import example.reporting.api.scenario.Scenario;
import example.reporting.api.scenario.Step;
import example.reporting.feature.FeatureFactory;
import example.reporting.reportconverter.report.ReportAroundAction;
import example.reporting.reportconverter.report.ReportBackground;
import example.reporting.reportconverter.report.ReportFeature;
import example.reporting.reportconverter.report.ReportScenario;
import example.reporting.reportconverter.report.ReportStep;
import example.reporting.scenario.ScenarioFactory;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.impl.ConfigurableMapper;
import ma.glasnost.orika.metadata.TypeFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
class ReportMapper extends ConfigurableMapper {

    private final FeatureFactory featureFactory;

    private final ScenarioFactory scenarioFactory;

    @Autowired
    public ReportMapper(final FeatureFactory featureFactory, final ScenarioFactory scenarioFactory) {
        super(false);
        this.featureFactory = featureFactory;
        this.scenarioFactory = scenarioFactory;
    }

    @PostConstruct
    public void initMapper() {
        init();
    }

    @Override
    protected void configure(final MapperFactory factory) {
        factory.registerObjectFactory(new FeatureObjectFactory(featureFactory), TypeFactory.valueOf(Feature.class));
        factory.registerObjectFactory(new ScenarioObjectFactory(scenarioFactory), TypeFactory.valueOf(Scenario.class));

        factory.getConverterFactory().registerConverter("uppercaseToEnum", new UppercaseStringToEnumConverter());
        factory.getConverterFactory().registerConverter("trimString", new TrimStringConverter());
        factory.getConverterFactory().registerConverter("sha1", new StringToSha1SumConverter());
        factory.getConverterFactory().registerConverter("stripAtSign", new StripAtSignConverter());
        factory.getConverterFactory().registerConverter("table", new TableConverter());

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
            .field("match.arguments", "info.arguments")
            .field("line", "location.line")
            .fieldMap("result.errorMessage", "errorMessage").converter("trimString").add()
            .fieldMap("result.status", "status").converter("uppercaseToEnum").add()
            .fieldMap("tableRows", "table").converter("table").add()
            .byDefault()
            .register();

        factory.classMap(ReportAroundAction.class, AroundAction.class)
            .fieldMap("result.errorMessage", "errorMessage").converter("trimString").add()
            .fieldMap("result.status", "status").converter("uppercaseToEnum").add()
            .byDefault()
            .register();
    }

}
