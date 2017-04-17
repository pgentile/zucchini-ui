import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Table from 'react-bootstrap/lib/Table';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';


export default class EditTestRunDialog extends React.PureComponent {

  constructor(props) {
    super(props);

    this.onCloseClick = this.onCloseClick.bind(this);
    this.onEditTestRun = this.onEditTestRun.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
    this.onAddLabelClick = this.onAddLabelClick.bind(this);
    this.onLabelFieldChange = this.onLabelFieldChange.bind(this);
    this.onDeleteLabelClick = this.onDeleteLabelClick.bind(this);

    this.state = this.createDefaultStateFromProps(props);
  }

  componentDidUpdate(prevProps) {
    const { testRun } = this.props;
    if (testRun !== prevProps.testRun) {
      this.setState(this.createDefaultStateFromProps(this.props));
    }
  }

  createDefaultStateFromProps({ testRun }) {
    const type = testRun ? testRun.type : null;
    const labels = testRun ? testRun.labels : [];
    return {
      type,
      labels,
    };
  }

  render() {
    const { show } = this.props;

    const labelRows = this.state.labels.map((label, index) => {
      return (
        <tr key={index}>
          <td>
            <FormControl required placeholder="Nom" value={label.name} onChange={this.onLabelFieldChange(index, 'name')} />
          </td>
          <td>
            <FormControl required placeholder="Valeur" value={label.value} onChange={this.onLabelFieldChange(index, 'value')} />
          </td>
          <td>
            <FormControl type="url" placeholder="URL" value={label.url} onChange={this.onLabelFieldChange(index, 'url')} />
          </td>
          <td>
            <Button bsStyle="danger" onClick={this.onDeleteLabelClick(index)}>
              <Glyphicon glyph="remove" />
            </Button>
          </td>
        </tr>
      );
    });

    return (
      <Modal bsSize="large" show={show} onHide={this.onCloseClick}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier les informations du tir</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.onEditTestRun}>
            <FormGroup controlId="type">
              <ControlLabel>Type</ControlLabel>
              <FormControl required value={this.state.type} onChange={this.onTypeChange} />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Étiquettes</ControlLabel>
              <Table>
                <thead>
                  <tr>
                    <th className="col-md-4">Nom</th>
                    <th className="col-md-4">Valeur</th>
                    <th className="col-md-4">URL</th>
                    <th>&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  {labelRows}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={4}>
                      <Button bsSize="small" onClick={this.onAddLabelClick}>
                        <Glyphicon glyph="plus-sign" /> Ajouter une étiquette
                      </Button>
                    </td>
                  </tr>
                </tfoot>
              </Table>
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.onCloseClick}>Annuler</Button>
          <Button bsStyle="primary" onClick={this.onEditTestRun}>Modifier</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  onCloseClick(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.onClose();
  }

  onTypeChange(event) {
    this.setState({
      type: event.target.value,
    });
  }

  onEditTestRun(event) {
    if (event) {
      event.preventDefault();
    }

    this.props.onEditTestRun({
      testRunId: this.props.testRun.id,
      ...this.state,
    });

    this.props.onClose();
  }

  onAddLabelClick() {
    this.setState(prevState => {
      return {
        labels: [
          ...prevState.labels,
          {
            name: '',
            value: '',
            url: '',
          },
        ]
      };
    });
  }

  onLabelFieldChange(index, fieldName) {
    return event => {
      const fieldValue = event.target.value;

      this.setState(prevState => {
        const prevLabels = prevState.labels;

        const beforeLabels = prevLabels.slice(0, index);
        const newLabel = {
          ...prevLabels[index],
          [fieldName]: fieldValue,
        };
        const afterLabels = prevLabels.slice(index + 1);

        return {
          labels: [
            ...beforeLabels,
            newLabel,
            ...afterLabels,
          ],
        };
      });
    };
  }

  onDeleteLabelClick(index) {
    return () => {
      this.setState(prevState => {
        const prevLabels = prevState.labels;

        const beforeLabels = prevLabels.slice(0, index);
        const afterLabels = prevLabels.slice(index + 1);

        return {
          labels: [
            ...beforeLabels,
            ...afterLabels,
          ],
        };
      });
    };
  }

}

EditTestRunDialog.propTypes = {
  testRun: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onEditTestRun: PropTypes.func.isRequired,
};
