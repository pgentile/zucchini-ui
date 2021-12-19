package io.zucchiniui.backend.testrun.views;

import io.zucchiniui.backend.testrun.domain.TestRun;
import org.springframework.stereotype.Component;

@Component
class TestRunToListItemMapper {

    public TestRunListItem map(TestRun testRun) {
        final var item = new TestRunListItem();
        item.setId(testRun.getId());
        item.setName(testRun.getName());
        item.setEnvironment(testRun.getEnvironment());
        item.setType(testRun.getType());
        item.setDate(testRun.getDate());
        return item;
    }

}
