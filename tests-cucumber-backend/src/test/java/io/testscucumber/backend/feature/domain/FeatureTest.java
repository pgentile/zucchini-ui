package io.testscucumber.backend.feature.domain;

import com.google.common.collect.Sets;
import io.testscucumber.backend.shared.domain.BasicInfo;
import io.testscucumber.backend.shared.domain.Location;
import org.junit.Test;

import java.time.ZonedDateTime;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

public class FeatureTest {

    private static final String FEATURE_KEY = "featureKey";

    private static final String TEST_RUN_ID = "testRunId";

    private static final BasicInfo INFO = new BasicInfo("Feature", "test");

    private static final Location LOCATION = new Location("file.feature", 5);

    @Test
    public void should_create_feature() throws Exception {
        // given
        final ZonedDateTime testStartDate = ZonedDateTime.now();

        // when
        final Feature feature = new Feature(FEATURE_KEY, TEST_RUN_ID, INFO, LOCATION);

        // then
        assertThat(feature.getId()).isNotEmpty();
        assertThat(feature.getFeatureKey()).isEqualTo(FEATURE_KEY);
        assertThat(feature.getTestRunId()).isEqualTo(TEST_RUN_ID);
        assertThat(feature.getInfo()).isEqualTo(INFO);
        assertThat(feature.getLocation()).isEqualTo(LOCATION);
        assertThat(feature.getStatus()).isEqualTo(FeatureStatus.NOT_RUN);
        assertThat(feature.getGroup()).isNull();
        assertThat(feature.getDescription()).isNull();
        assertThat(feature.getTags()).isEmpty();
        assertThat(feature.getCreatedAt()).isAfterOrEqualTo(testStartDate);
        assertThat(feature.getModifiedAt()).isEqualTo(feature.getCreatedAt());

        assertThat(feature.getEntityId()).isEqualTo(feature.getId());
        assertThat(feature.getVersion()).isZero();
    }

    @Test
    public void should_set_status() throws Exception {
        // given
        final FeatureStatus newStatus = FeatureStatus.PASSED;

        final Feature feature = new Feature(FEATURE_KEY, TEST_RUN_ID, INFO, LOCATION);

        // when

        feature.setStatus(newStatus);

        // then
        assertThat(feature.getStatus()).isEqualTo(newStatus);
        assertThat(feature.getModifiedAt()).isAfterOrEqualTo(feature.getCreatedAt());
    }

    @Test
    public void should_set_group() throws Exception {
        // given
        final String newGroup = "newGroup";

        final Feature feature = new Feature(FEATURE_KEY, TEST_RUN_ID, INFO, LOCATION);

        // when

        feature.setGroup(newGroup);

        // then
        assertThat(feature.getGroup()).isEqualTo(newGroup);
        assertThat(feature.getModifiedAt()).isAfterOrEqualTo(feature.getCreatedAt());
    }

    @Test
    public void should_set_description() throws Exception {
        // given
        final String newDescription = "newGroup";

        final Feature feature = new Feature(FEATURE_KEY, TEST_RUN_ID, INFO, LOCATION);

        // when

        feature.setDescription(newDescription);

        // then
        assertThat(feature.getDescription()).isEqualTo(newDescription);
        assertThat(feature.getModifiedAt()).isAfterOrEqualTo(feature.getCreatedAt());
    }

    @Test
    public void should_set_tags() throws Exception {
        // given
        final Set<String> newTags = Sets.newHashSet("titi", "toto", "tutu");

        final Feature feature = new Feature(FEATURE_KEY, TEST_RUN_ID, INFO, LOCATION);

        // when

        feature.setTags(newTags);

        // then
        assertThat(feature.getTags()).isEqualTo(newTags);
        assertThat(feature.getModifiedAt()).isAfterOrEqualTo(feature.getCreatedAt());
    }

    @Test
    public void should_merge_with_another_feature() throws Exception {
        // given
        final Feature sourceFeature = new Feature(FEATURE_KEY, TEST_RUN_ID, INFO, LOCATION);
        sourceFeature.setGroup("group");
        sourceFeature.setTags(Sets.newHashSet("titi", "toto", "tutu"));
        sourceFeature.setDescription("Description");
        sourceFeature.setStatus(FeatureStatus.PASSED);

        final Feature targetFeature = new Feature(
            FEATURE_KEY,
            TEST_RUN_ID,
            new BasicInfo("Feature", "other"),
            new Location("other.feature", 1)
        );

        // when

        targetFeature.mergeWith(sourceFeature);

        // then
        assertThat(targetFeature).isEqualToIgnoringGivenFields(sourceFeature, "id", "createdAt", "modifiedAt");
        assertThat(targetFeature.getId()).isNotEqualTo(sourceFeature.getId());
        assertThat(targetFeature.getModifiedAt()).isAfterOrEqualTo(targetFeature.getModifiedAt());
    }

}
