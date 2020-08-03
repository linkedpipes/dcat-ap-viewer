import React from "react";
import {Spinner} from "reactstrap";
import {Status} from "../../../client/dataset-detail";

export function qualityIcons(t, tLiteral, openModal, quality, measures) {
  if (quality.status === Status.Ready) {
    return (
      <div className="float-right">
        {measures.map((item) => qualityIcon(
          t, tLiteral, openModal, quality,
          item.measureOf, item.labelTrue, item.labelFalse,
          item.iconTrue, item.iconFalse
        ))}
      </div>
    );
  }
  if (quality.status === Status.Loading) {
    return (
      <Spinner size="sm" color="secondary" className="float-right"/>
    );
  }
  return null;
}

function qualityIcon(
  t, tLiteral, openModal, quality, measureOf, labelTrue, labelFalse,
  iconTrue, iconFalse
) {
  const measure = selectMeasure(quality, measureOf);
  if (measure == null) {
    return null;
  }
  const dialogArguments = {
    "date": measure.lastCheck,
    "note": tLiteral(measure.note),
  };
  if (measure.value) {
    return (
      <i
        key={measureOf}
        className="material-icons text-success"
        title={t(labelTrue, dialogArguments)}
        onClick={() => openModal(t(labelTrue, dialogArguments))}
      >
        { iconTrue }
      </i>
    );
  }
  return (
    <i
      key={measureOf}
      className="material-icons text-danger"
      title={t(labelFalse, dialogArguments)}
      onClick={() => openModal(t(labelFalse, dialogArguments))}
    >
      { iconFalse }
    </i>
  );
}

function selectMeasure(quality, measureOf) {
  for (const measure of quality.measures) {
    if (measure.measureOf === measureOf) {
      return measure;
    }
  }
  return null;
}
