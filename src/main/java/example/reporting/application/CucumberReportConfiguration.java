package example.reporting.application;

import example.reporting.morphia.MorphiaConfiguration;
import example.reporting.morphia.MorphiaDatastoreFactory;
import io.dropwizard.Configuration;

import javax.validation.Valid;

public class CucumberReportConfiguration extends Configuration implements MorphiaConfiguration {

    @Valid
    private MorphiaDatastoreFactory morphiaDatastoreFactory;

    @Override
    public MorphiaDatastoreFactory getMorphiaDatastoreFactory() {
        return morphiaDatastoreFactory;
    }

    @Override
    public void setMorphiaDatastoreFactory(final MorphiaDatastoreFactory morphiaDatastoreFactory) {
        this.morphiaDatastoreFactory = morphiaDatastoreFactory;
    }

}
