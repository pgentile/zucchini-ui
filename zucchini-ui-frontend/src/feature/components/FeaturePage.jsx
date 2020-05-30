import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
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
import { loadFeaturePage } from "../redux";
import FeatureStats from "./FeatureStats";
import Button from "../../ui/components/Button";
import EditFeatureDialog from "./EditFeatureDialog";

export default function FeaturePage() {
  const { featureId } = useParams();
  const feature = useSelector((state) => state.feature.feature);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFeaturePage({ featureId }));
  }, [dispatch, featureId]);

  const [showEditForm, setShowEditForm] = useState(false);

  const handleToggleShowEditForm = () => {
    setShowEditForm((currentValue) => !currentValue);
  };

  return (
    <Page
      title={
        <>
          <b>{feature.info.keyword}</b> {feature.info.name} {feature.status && <Status status={feature.status} />}
        </>
      }
      mainline={
        <>
          <SimpleText className="lead" text={feature.description} />
          <ul className="list-inline">
            {feature.group && (
              <li className="list-inline-item">
                <b>Groupe : </b>{" "}
                <Link
                  to={{
                    pathname: `/test-runs/${feature.testRunId}`,
                    search: queryString.stringify({ featureGroup: feature.group })
                  }}
                >
                  {feature.group}
                </Link>
              </li>
            )}
            <li className="list-inline-item">
              <b>Source :</b> <code>{feature.location.filename}</code>, ligne <code>{feature.location.line}</code>
            </li>
          </ul>
          {feature.tags.length > 0 && (
            <p>
              <b>Tags :</b> <TagList testRunId={feature.testRunId} tags={feature.tags} />
            </p>
          )}
        </>
      }
      breadcrumb={<FeatureBreadcrumbContainer />}
    >
      <ButtonToolbar>
        <ButtonGroup className="mr-2">
          <Button variant="secondary" icon={faEdit} onClick={handleToggleShowEditForm}>
            Modifier
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <DeleteFeatureButton />
        </ButtonGroup>
      </ButtonToolbar>
      <hr />

      <h2>Statistiques</h2>
      <FeatureStats />

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

      <EditFeatureDialog show={showEditForm} onClose={handleToggleShowEditForm} key={featureId} />
    </Page>
  );
}
