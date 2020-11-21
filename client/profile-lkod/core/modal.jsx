import React from "react";
import {PropTypes} from "prop-types";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

import {t, register} from "../viewer-api";
import translations from "./modal.json";

function ModalDialog(props) {
  return (
    <Modal
      isOpen={props.visible}
      toggle={props.onCloseModal}
    >
      {props.label && (
        <ModalHeader toggle={props.onCloseModal}>
          {props.label}
        </ModalHeader>
      )}
      {props.body && (
        <ModalBody>
          {props.body}
        </ModalBody>
      )}
      <ModalFooter>
        <Button onClick={props.onCloseModal}>
          {t("dialog.close")}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

ModalDialog.propTypes = {
  "label": PropTypes.string,
  "body": PropTypes.string,
  "visible": PropTypes.bool.isRequired,
  "onCloseModal": PropTypes.func.isRequired,
};

register({
  "name": "app.modal",
  "element": ModalDialog,
  "translations": translations,
});
