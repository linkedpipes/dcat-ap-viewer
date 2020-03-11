import React from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import {connect} from "react-redux";
import {closeModal} from "./modal-action";
import {bodySelector, isOpenSelector, labelSelector} from "./modal-reducer";
import {selectT} from "../app/component-api";

interface ModuleContainerProps {
  "closeModal": () => void,
  "isOpen": boolean,
  "body"?: string,
  "label"?: string,
  "t": (text: string) => string,
}

function ModalContainer(props: ModuleContainerProps) {
  return (
    <div>
      <Modal
        isOpen={props.isOpen}
        toggle={props.closeModal}
      >
        {props.label && (
          <ModalHeader toggle={props.closeModal}>
            {props.label}
          </ModalHeader>
        )}
        <ModalBody>
          {props.body}
        </ModalBody>
        <ModalFooter>
          <Button onClick={props.closeModal}>
            {props.t("close")}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state:any) => ({
  "isOpen": isOpenSelector(state),
  "label": labelSelector(state),
  "body": bodySelector(state),
  "t": selectT(state),
});

const mapDispatchToProps = (dispatch:any) => ({
  "closeModal": () => dispatch(closeModal()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalContainer);
