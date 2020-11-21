import React, {useCallback, useState} from "react";

import {getElement} from "../core/register";

class ModalState {

  visible: boolean = false;

  label: string = "";

  body: string = "";

}

interface ModalContextType {

  state: ModalState;

  showModal: (label: string, body: string) => void;

}

export const ModalContext = React.createContext<ModalContextType>(
  undefined as any
);

export function WithModalDialog(props: any) {
  const Dialog = getElement("app.modal").element as any;
  const [state, setState] = useState(new ModalState())
  const showModal = useCallback(
    (label: string, body: string) => {
      setState({
        "visible": true,
        "label": label,
        "body": body,
      });
    },
    [state, setState]);
  return (
    <ModalContext.Provider value={{
      "state": state,
      "showModal": showModal
    }}>
      <Dialog
        label={state.label}
        body={state.body}
        visible={state.visible}
        onCloseModal={() => setState({...state, "visible": false})}
      />
      {React.cloneElement(props.children)}
    </ModalContext.Provider>
  )
}
