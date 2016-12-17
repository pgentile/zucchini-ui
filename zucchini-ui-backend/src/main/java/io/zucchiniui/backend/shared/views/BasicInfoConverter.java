package io.zucchiniui.backend.shared.views;

import io.zucchiniui.backend.shared.domain.BasicInfo;
import ma.glasnost.orika.CustomConverter;
import ma.glasnost.orika.MappingContext;
import ma.glasnost.orika.metadata.Type;

class BasicInfoConverter extends CustomConverter<BasicInfo, BasicInfo> {

    @Override
    public BasicInfo convert(BasicInfo source, Type<? extends BasicInfo> destinationType, MappingContext mappingContext) {
        if (source == null) {
            return null;
        }

        return new BasicInfo(source.getKeyword(), source.getName(), source.getArguments());
    }

}
