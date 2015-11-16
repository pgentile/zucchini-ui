package example.reporting.testrun.view;

import example.reporting.feature.domain.FeatureDAO;
import example.reporting.feature.model.Feature;
import example.reporting.testrun.domain.TestRunDAO;
import example.reporting.testrun.model.TestRun;
import example.reporting.testrun.model.TestRunStatus;
import ma.glasnost.orika.BoundMapperFacade;

import java.util.List;
import java.util.stream.Collectors;

public class TestRunViewAccess {

    private final TestRunDAO testRunDAO;

    private final FeatureDAO featureDAO;

    private final TestRunViewMapper mapper = new TestRunViewMapper();

    private final BoundMapperFacade<TestRun, TestRunListItemView> testRunListItemViewMapper = mapper.dedicatedMapperFor(
            TestRun.class,
            TestRunListItemView.class,
            false
    );

    private final BoundMapperFacade<Feature, FeatureResumeView> featureResumeViewMapper = mapper.dedicatedMapperFor(
            Feature.class,
            FeatureResumeView.class,
            false
    );

    public TestRunViewAccess(final TestRunDAO testRunDAO, FeatureDAO featureDAO) {
        this.testRunDAO = testRunDAO;
        this.featureDAO = featureDAO;
    }

    public List<TestRunListItemView> getLatests() {
        return testRunDAO.createQuery()
                .field("status").equal(TestRunStatus.CLOSED)
                .order("-date")
                .limit(50) // FIXME With params ?!
                .asList()
                .stream()
                .map(testRun -> {
                    final TestRunListItemView view = testRunListItemViewMapper.map(testRun);
                    view.setFeatures(getFeaturesForTestRun(testRun.getId()));
                    return view;
                })
                .collect(Collectors.toList());
    }

    private List<FeatureResumeView> getFeaturesForTestRun(String testRunId) {
        return featureDAO.createQuery()
                .field("testRunId").equal(testRunId)
                .order("info.name")
                .asList()
                .stream()
                .map(featureResumeViewMapper::map)
                .collect(Collectors.toList());
    }

}
