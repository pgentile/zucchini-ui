import React from 'react';


export default class FeaturePage extends React.Component {

  componentDidMount() {
    this.loadFeatureIfNeeded();
  }

  componentDidUpdate(prevProps) {
    this.loadFeatureIfNeeded(prevProps);
  }

  render() {
    const { feature } = this.props;

    return (
      <div>
        <h1><b>{feature.info.keyword}</b> {feature.info.name}</h1>

        {feature.group && <p><b>Groupe : </b> {feature.group}</p>}

        <p>
          <b>Source :</b>{' '}
          <code>{feature.location.filename}</code>, ligne <code>{feature.location.line}</code>
        </p>

        <hr />

      </div>
    );
  }

  loadFeatureIfNeeded(prevProps = {}) {
    const { featureId, onLoad } = this.props;
    if (featureId !== prevProps.featureId) {
      onLoad({ featureId });
    }
  }

}

FeaturePage.propTypes = {
  onLoad: React.PropTypes.func.isRequired,
  featureId: React.PropTypes.string.isRequired,
  feature: React.PropTypes.object,
};
