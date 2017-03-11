import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';


export default function CreateTestRunButton({ onCreateTestRun }) {
  const onClick = () => {
    onCreateTestRun({ type: 'SAMPLE' });
  };

  return (
    <Button onClick={onClick}>
      <Glyphicon glyph="plus-sign" />
      {' '}
      Créer un tir
    </Button>
  );
}

CreateTestRunButton.propTypes = {
  onCreateTestRun: React.PropTypes.func.isRequired,
};
