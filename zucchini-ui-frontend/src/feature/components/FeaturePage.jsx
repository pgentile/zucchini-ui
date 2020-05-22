import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import queryString from "query-string";

import FeatureHistoryTableContainer from "./FeatureHistoryTableContainer";
import ScenarioTableContainer from "./ScenarioTableContainer";
import HistoryFilter from "../../filters/components/HistoryFilter";
import ScenarioStateFilter from "../../filters/components/ScenarioStateFilter";
import TagList from "../../ui/components/TagList";
import SimpleText from "../../ui/components/SimpleText";
import Status from "../../ui/components/Status";
import DeleteFeatureButton from "./DeleteFeatureButton";
import FeatureTrendChartContainer from "./FeatureTrendChartContainer";
import Page from "../../ui/components/Page";
import FeatureBreadcrumbContainer from "./FeatureBreadcrumbContainer";
import ScenarioStats from "../../stats/components/ScenarioStats";

export default class FeaturePage extends React.Component {
  static propTypes = {
    onLoad: PropTypes.func.isRequired,
    featureId: PropTypes.string.isRequired,
    feature: PropTypes.object,
    stats: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.loadFeatureIfNeeded();
  }

  componentDidUpdate(prevProps) {
    this.loadFeatureIfNeeded(prevProps);
  }

  loadFeatureIfNeeded(prevProps = {}) {
    const { featureId, onLoad } = this.props;
    if (featureId !== prevProps.featureId) {
      onLoad({ featureId });
    }
  }

  render() {
    const { feature, featureId, stats } = this.props;

    return (
      <Page
        title={
          <Fragment>
            <b>{feature.info.keyword}</b> {feature.info.name} {feature.status && <Status status={feature.status} />}
          </Fragment>
        }
        mainline={<SimpleText className="lead" text={feature.description} />}
        breadcrumb={<FeatureBreadcrumbContainer />}
      >
        {feature.group && (
          <p>
            <b>Groupe : </b>{" "}
            <Link
              to={{
                pathname: `/test-runs/${feature.testRunId}`,
                search: queryString.stringify({ featureGroup: feature.group })
              }}
            >
              {feature.group}
            </Link>
          </p>
        )}

        <p>
          <b>Source :</b> <code>{feature.location.filename}</code>, ligne <code>{feature.location.line}</code>
        </p>

        {feature.tags.length > 0 && (
          <p>
            <b>Tags :</b> <TagList testRunId={feature.testRunId} tags={feature.tags} />
          </p>
        )}

        <hr />
        <ButtonToolbar>
          <DeleteFeatureButton testRunId={feature.testRunId} featureId={featureId} />
        </ButtonToolbar>
        <hr />

        <h2>Statistiques</h2>
        <ScenarioStats stats={stats} />

        <h2>Scénarios</h2>
        <ScenarioStateFilter />
        <ScenarioTableContainer />

        <hr />

        <h2>Tendance</h2>
        <HistoryFilter />
        <FeatureTrendChartContainer />

        <hr />

        <h2>Historique</h2>
        <HistoryFilter />
        <FeatureHistoryTableContainer featureId={featureId} />
      </Page>
    );
  }
}
