import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import FormLabel from "react-bootstrap/FormLabel";

import Button from "../../ui/components/Button";
import { addScenarioCommentAndReload } from "../redux";
import useUniqueId from "../../useUniqueId";

export default function AddCommentForm() {
  const dispatch = useDispatch();

  const { scenarioId } = useParams();

  const [comment, setComment] = useState();

  const onAddComment = (event) => {
    event.preventDefault();

    dispatch(
      addScenarioCommentAndReload({
        scenarioId,
        comment
      })
    );

    setComment("");
  };

  const onCommentChange = (event) => {
    setComment(event.target.value);
  };

  const commentId = useUniqueId();

  return (
    <Form onSubmit={onAddComment}>
      <FormGroup className="mb-2" controlId={commentId}>
        <FormLabel srOnly>Commentaire</FormLabel>
        <FormControl
          as="textarea"
          rows="3"
          placeholder="Entrez votre commentaire"
          value={comment}
          onChange={onCommentChange}
        />
      </FormGroup>
      <Button type="submit" disabled={!comment}>
        Ajouter le commentaire
      </Button>
    </Form>
  );
}
