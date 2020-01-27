import React from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import {connect} from "react-redux";
import {getString} from "../strings"
import {closeModal} from "./modal-action";
import {bodySelector, isOpenSelector, labelSelector} from "./modal-reducer";
import {PropTypes} from "prop-types";

class _ModalContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.isOpen}
          toggle={this.props.closeModal}>
          {this.props.label && (
            <ModalHeader toggle={this.props.closeModal}>
              {this.props.label}
            </ModalHeader>
          )}
          <ModalBody>
            {this.props.body}
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.props.closeModal}>
              {getString("close")}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

}

_ModalContainer.propTypes = {
  "closeModal": PropTypes.func.isRequired,
  "isOpen": PropTypes.bool.isRequired,
  "body": PropTypes.string,
  "label": PropTypes.string,
};

const mapStateToProps = (state) => ({
  "isOpen": isOpenSelector(state),
  "label": labelSelector(state),
  "body": bodySelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  "closeModal": () => dispatch(closeModal()),
});

export const ModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_ModalContainer);
