import { memo, useEffect, useId, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import FormLabel from "react-bootstrap/FormLabel";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";

import Button from "../../ui/components/Button";
import { useNavigateToTags, useParsedTags } from "../url";

function TagSelectionForm() {
  const parsedTags = useParsedTags();

  const [tags, setTags] = useState("");
  const [excludedTags, setExcludedTags] = useState("");

  useEffect(() => {
    setTags(formatTags(parsedTags.tags));
    setExcludedTags(formatTags(parsedTags.excludedTags));
  }, [parsedTags]);

  const navigateToTags = useNavigateToTags();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigateToTags({
      tags: parseTags(tags),
      excludedTags: parseTags(excludedTags)
    });
  };

  const tagsControlId = useId();
  const excludedTagsControlId = useId();

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md>
          <FormGroup controlId={tagsControlId}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text as={FormLabel}>Tags inclus</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl value={tags} onChange={(e) => setTags(e.target.value)} />
            </InputGroup>
          </FormGroup>
        </Col>
        <Col md>
          <FormGroup controlId={excludedTagsControlId}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text as={FormLabel}>Tags exclus</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl value={excludedTags} onChange={(e) => setExcludedTags(e.target.value)} />
            </InputGroup>
          </FormGroup>
        </Col>
        <Col md="auto">
          <Button icon={faSyncAlt} block type="submit" className="mb-3">
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
