package io.testscucumber.backend.shared.views;

import io.testscucumber.backend.shared.domain.BasicInfo;
import ma.glasnost.orika.CustomConverter;
import ma.glasnost.orika.metadata.Type;

class BasicInfoConverter extends CustomConverter<BasicInfo, BasicInfo> {

    @Override
    public BasicInfo convert(final BasicInfo source, final Type<? extends BasicInfo> destinationType) {
        if (source == null) {
            return null;
        }

        return new BasicInfo(source.getKeyword(), source.getName(), source.getArguments());
    }

}
