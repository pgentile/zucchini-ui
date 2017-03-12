import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';


export default function NavSearchForm() {
  return (
    <Navbar.Form pullRight>
      <FormGroup>
        <InputGroup>
          <FormControl type="text" placeholder="Rechercher..." />
          <InputGroup.Button>
            <Button type="submit">
              <Glyphicon glyph="search" />
            </Button>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
      {' '}
    </Navbar.Form>
  );
}
