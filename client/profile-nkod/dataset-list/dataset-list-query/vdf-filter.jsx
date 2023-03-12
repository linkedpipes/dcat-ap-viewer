import {FormGroup, Input, Label} from "reactstrap";
import {PropTypes} from "prop-types";
import React from "react";

import {t} from "../../viewer-api";

export default function VdfFilter(props) {
  return (
    <div style={{"margin": "1rem 1rem 0 2rem"}}>
      <span>{t("search.vdf")}</span>
      &nbsp;
      <FormGroup
        check
        inline
      >
        <Input type="checkbox" checked={props.isVdfPublicData}
               onChange={(event) => {
                 props.onUpdateQuery({
                   "isVdfPublicData": !props.isVdfPublicData
                 });
               }}/>
        <Label check>
          {t("search.vdf.partOf")}
        </Label>
      </FormGroup>
      <FormGroup
        check
        inline
      >
        <Input type="checkbox" checked={props.isVdfCodelist}
               onChange={(event) => {
                 props.onUpdateQuery({
                   "isVdfCodelist": !props.isVdfCodelist
                 });
               }}/>
        <Label check>
          {t("search.vdf.codelist")}
        </Label>
      </FormGroup>
    </div>
  );
}

VdfFilter.propTypes = {
  "isVdfCodelist": PropTypes.bool,
  "isVdfPublicData": PropTypes.bool,
  "onUpdateQuery": PropTypes.func.isRequired,
};
