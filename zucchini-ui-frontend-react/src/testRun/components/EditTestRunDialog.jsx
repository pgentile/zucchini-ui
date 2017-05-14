import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Table from 'react-bootstrap/lib/Table';

import Button from '../../ui/components/Button';


export default class EditTestRunDialog extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = this.createDefaultStateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.testRun !== nextProps.testRun) {
      this.setState(this.createDefaultStateFromProps(nextProps));
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

  onCloseClick = (event) => {
    if (event) {
      event.preventDefault();
    }
    this.props.onClose();
  };

  onTypeChange = (event) => {
    this.setState({
      type: event.target.value,
    });
  };

  onEditTestRun = (event) => {
    if (event) {
      event.preventDefault();
    }

    this.props.onEditTestRun({
      testRunId: this.props.testRun.id,
      ...this.state,
    });

    this.props.onClose();
  };

  onAddLabelClick = () => {
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
  };

  onLabelFieldChange = (index, fieldName) => {
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
  };

  onDeleteLabelClick = (index) => {
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
  };

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
            <Button glyph="remove" bsStyle="danger" onClick={this.onDeleteLabelClick(index)} />
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
                      <Button glyph="plus-sign" bsSize="small" onClick={this.onAddLabelClick}>
                        Ajouter une étiquette
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

}

EditTestRunDialog.propTypes = {
  testRun: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onEditTestRun: PropTypes.func.isRequired,
};
