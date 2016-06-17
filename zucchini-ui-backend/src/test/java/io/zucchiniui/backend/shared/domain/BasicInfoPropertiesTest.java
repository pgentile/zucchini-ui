package io.zucchiniui.backend.shared.domain;

import com.pholser.junit.quickcheck.From;
import com.pholser.junit.quickcheck.Property;
import com.pholser.junit.quickcheck.generator.GenerationStatus;
import com.pholser.junit.quickcheck.generator.Generator;
import com.pholser.junit.quickcheck.generator.java.lang.StringGenerator;
import com.pholser.junit.quickcheck.random.SourceOfRandomness;
import com.pholser.junit.quickcheck.runner.JUnitQuickcheck;
import org.junit.runner.RunWith;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(JUnitQuickcheck.class)
public class BasicInfoPropertiesTest {

    @Property
    public void infos_with_same_values_should_be_equal(
        final String keyword,
        final String name,
        final List<@From(ArgumentGenerator.class) Argument> arguments
    ) throws Exception {
        final BasicInfo leftInfo = new BasicInfo(
            keyword,
            name,
            arguments
        );

        final BasicInfo rightInfo = new BasicInfo(
            keyword,
            name,
            arguments
        );

        assertThat(leftInfo).isEqualTo(rightInfo);
        assertThat(leftInfo.hashCode()).isEqualTo(rightInfo.hashCode());
    }

    public static class ArgumentGenerator extends Generator<Argument> {

        private final StringGenerator stringGenerator = new StringGenerator();

        public ArgumentGenerator() {
            super(Argument.class);
        }

        @Override
        public Argument generate(SourceOfRandomness random, GenerationStatus status) {
            final int offset = random.nextInt(Integer.MAX_VALUE);
            final String value = stringGenerator.generate(random, status);
            return new Argument(offset, value);
        }

    }

}
