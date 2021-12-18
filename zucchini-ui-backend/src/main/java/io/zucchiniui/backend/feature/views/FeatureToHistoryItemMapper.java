package io.zucchiniui.backend.feature.views;

import io.zucchiniui.backend.feature.domain.Feature;
import org.springframework.stereotype.Component;

@Component
class FeatureToHistoryItemMapper {

    public FeatureHistoryItem map(Feature feature) {
        final var item = new FeatureHistoryItem();
        item.setId(feature.getId());
        item.setStatus(feature.getStatus());
        return item;
    }

}
