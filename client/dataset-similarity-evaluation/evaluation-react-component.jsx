import React from "react";
import {PropTypes} from "prop-types";
import {Button, FormGroup, Label, Input, Container, Row, Col} from "reactstrap";

import {
  withDatasetEvaluationLike,
  withDatasetEvaluationReport,
} from "./evaluation-react-hook";
import useCases from "./use-cases";

export function EvaluationToolbar() {
  const {
    user, setUser,
    useCase, setUseCase,
    active, startEvaluation, finishEvaluation,
  } = withDatasetEvaluationReport();

  const message = active ? "Finish evaluation" : "Start evaluation";
  const color = active ? "warning" : "primary";
  const action = active ? finishEvaluation : startEvaluation;
  return (
    <Container>
      <FormGroup>
        <Label for="usecase">UseCase</Label>
        <Input type="select" name="usecase" id="usecase" value={useCase}
          disabled={active}
          onChange={event => setUseCase(event.target.value)}>
          {useCases.map((item) => (
            <option key={item.key} value={item.key}>{item.title}</option>
          ))}
        </Input>
      </FormGroup>
      <Row>
        <Col xs={12} md={8}>
          <FormGroup>
            <Label for="user">User</Label>
            <Input type="text" name="user" id="user"
              placeholder="User identification"
              value={user}
              onChange={(event) => setUser(event.target.value)}
            />
          </FormGroup>
        </Col>
        <Col xs={12} md={4} style={{"position":"relative"}}>
          <Button color={color} onClick={action}
            style={{
              "left": "1rem",
              "position": "absolute",
              "bottom": "1rem",
            }}>
            {message}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export function EvaluationLikeButton(props) {
  const {active, liked, toggle} =
    withDatasetEvaluationLike(props.dataset, props.groupDatasets);

  const style = {
    "color": liked ? "green" : "gray",
    "backgroundColor": "transparent",
    "borderColor": "transparent",
  };

  return (
    <Button disabled={!active} style={style} onClick={toggle}>
      <i className="material-icons ps-2">thumb_up</i>
    </Button>
  );
}

EvaluationLikeButton.propTypes = {
  "dataset": PropTypes.string.isRequired,
  "groupDatasets": PropTypes.arrayOf(PropTypes.string.isRequired),
};

