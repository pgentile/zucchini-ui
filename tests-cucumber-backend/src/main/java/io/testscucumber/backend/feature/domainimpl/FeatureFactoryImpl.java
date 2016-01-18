package io.testscucumber.backend.feature.domainimpl;

import com.google.common.base.Strings;
import io.testscucumber.backend.feature.domain.Feature;
import io.testscucumber.backend.feature.domain.FeatureFactory;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.UUID;

@Component
class FeatureFactoryImpl implements FeatureFactory {

    @Override
    public Feature create(final String testRunId, final String group) {
        final Feature feature = new Feature();
        feature.setId(UUID.randomUUID().toString());
        feature.setTestRunId(testRunId);
        feature.setGroup(Strings.emptyToNull(group));

        final ZonedDateTime now = ZonedDateTime.now();
        feature.setCreatedAt(now);
        feature.setModifiedAt(now);

        return feature;
    }

}
