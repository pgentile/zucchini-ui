package example.reporting.reportconverter.converter;

import com.google.common.hash.Hashing;
import ma.glasnost.orika.CustomConverter;
import ma.glasnost.orika.metadata.Type;

import java.nio.charset.StandardCharsets;

class StringToSha1SumConverter extends CustomConverter<String, String> {

    @Override
    public String convert(final String source, final Type<? extends String> destinationType) {
        if (source == null) {
            return null;
        }

        return Hashing.sha1().hashString(source, StandardCharsets.UTF_8).toString();
    }

}
