package io.zucchiniui.backend.feature.views;

import io.zucchiniui.backend.feature.domain.Feature;
import org.springframework.stereotype.Component;

@Component
class FeatureToListItemMapper {

    public FeatureListItem map(Feature feature) {
        final var item = new FeatureListItem();
        item.setId(feature.getId());
        item.setStatus(feature.getStatus());
        item.setGroup(feature.getGroup());
        item.setTestRunId(feature.getTestRunId());
        item.setInfo(feature.getInfo());
        return item;
    }

}
