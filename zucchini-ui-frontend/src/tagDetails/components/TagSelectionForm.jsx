import React, { memo, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import FormLabel from "react-bootstrap/FormLabel";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";

import Button from "../../ui/components/Button";
import { useParsedTags, useNavigateToTags } from "../url";
import useSyncValue from "../../useSyncValue";

function TagSelectionForm() {
  const parsedTags = useParsedTags();

  const [tags, setTags] = useState("");
  const [excludedTags, setExcludedTags] = useState("");

  useSyncValue(parsedTags.tags, (value) => setTags(formatTags(value)));
  useSyncValue(parsedTags.excludedTags, (value) => setExcludedTags(formatTags(value)));

  const navigateToTags = useNavigateToTags();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigateToTags({
      tags: parseTags(tags),
      excludedTags: parseTags(excludedTags)
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={5}>
          <FormGroup controlId="tags">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text as={FormLabel}>Tags inclus</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl value={tags} onChange={(e) => setTags(e.target.value)} />
            </InputGroup>
          </FormGroup>
        </Col>
        <Col md={5}>
          <FormGroup controlId="excludedTags">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text as={FormLabel}>Tags exclus</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl value={excludedTags} onChange={(e) => setExcludedTags(e.target.value)} />
            </InputGroup>
          </FormGroup>
        </Col>
        <Col md={2}>
          <Button icon={faSyncAlt} type="submit" block>
            Actualiser
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default memo(TagSelectionForm);

function formatTags(tags) {
  return tags.join(" ");
}

function parseTags(tags) {
  return tags.split(/ +/);
}
