import PropTypes from "prop-types";
import React from "react";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";

import Button from "../../ui/components/Button";

export default class AddCommentForm extends React.PureComponent {
  static propTypes = {
    scenarioId: PropTypes.string.isRequired,
    onAddComment: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = this.createDefaultState();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.scenarioId !== this.props.scenarioId) {
      this.setState(this.createDefaultState());
    }
  }

  createDefaultState() {
    return {
      comment: ""
    };
  }

  onAddComment = (event) => {
    event.preventDefault();

    const { scenarioId } = this.props;
    const { comment } = this.state;
    this.props.onAddComment({
      scenarioId,
      comment
    });

    this.setState(this.createDefaultState());
  };

  onCommentChange = (event) => {
    const comment = event.target.value;

    this.setState({
      comment
    });
  };

  render() {
    const { comment } = this.state;

    return (
      <form onSubmit={this.onAddComment}>
        <FormGroup>
          <FormControl
            as="textarea"
            rows="3"
            placeholder="Entrez votre commentaire"
            value={comment}
            onChange={this.onCommentChange}
          />
        </FormGroup>
        <Button type="submit" disabled={!comment}>
          Ajouter le commentaire
        </Button>
      </form>
    );
  }
}
