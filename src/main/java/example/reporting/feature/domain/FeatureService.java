package example.reporting.feature.domain;

import example.reporting.feature.model.Feature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FeatureService {

    private static final Logger LOGGER = LoggerFactory.getLogger(FeatureService.class);

    private final FeatureDAO featureDAO;

    public FeatureService(final FeatureDAO featureDAO) {
        this.featureDAO = featureDAO;
    }

    public void save(final Feature feature) {
        LOGGER.info("Saving feature", feature.getId());

        // TODO Check ID

        featureDAO.save(feature);
    }

}
