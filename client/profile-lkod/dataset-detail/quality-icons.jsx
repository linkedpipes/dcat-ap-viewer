import React, {useContext} from "react";
import {PropTypes} from "prop-types";
import {Spinner} from "reactstrap";

import {
  selectLiteral, NavigationContext, ModalContext, translateString,
} from "../viewer-api";

/**
 * Render quality icons for selected measures.
 */
export function QualityIconsForMeasures({quality, measureDefinitions, object}) {
  const {showModal} = useContext(ModalContext);
  const navigation = useContext(NavigationContext);
  if (quality === undefined || quality.failed) {
    return null;
  }
  if (quality.loading) {
    return (
      <Spinner size="sm" color="secondary" className="float-right"/>
    );
  }
  return (
    <div className="float-right">
      {measureDefinitions.map((definition) => renderQualityIcon(
        showModal, navigation.language, quality.quality, definition,
        object))
      }
    </div>
  );
}

QualityIconsForMeasures.propTypes = {
  "quality": PropTypes.shape({
    "loading": PropTypes.bool.isRequired,
    "failed": PropTypes.bool.isRequired,
    "quality": PropTypes.object,
  }).isRequired,
  "measureDefinitions": PropTypes.arrayOf(PropTypes.shape({
    "measureOf": PropTypes.string.isRequired,
    "labelTrue": PropTypes.string.isRequired,
    "labelFalse": PropTypes.string.isRequired,
    "iconTrue": PropTypes.string.isRequired,
    "iconFalse": PropTypes.string.isRequired,
  })),
  /**
   * Optional, can be used to apply additional filter on the quality measures.
   */
  "object": PropTypes.string,
};

function renderQualityIcon(
  showModal, language, quality, measureDefinition, object) {
  const measure = quality.getMeasure(measureDefinition.measureOf, object);
  if (measure === undefined) {
    return null;
  }
  if (measure.value === true) {
    const translatedLabel = translateString(
      language,
      measureDefinition.labelTrue,
      {
        "date": measure.lastCheck,
        "note": selectLiteral(language, measure.note),
      }
    );
    return (
      <i
        key={measureDefinition.measureOf}
        className="material-icons text-success"
        title={translatedLabel}
        onClick={() => showModal(translatedLabel)}
      >
        {measureDefinition.iconTrue}
      </i>
    );
  } else {
    const translatedLabel = translateString(
      language,
      measureDefinition.labelFalse,
      {
        "date": measure.lastCheck,
        "note": selectLiteral(language, measure.note),
      }
    );
    return (
      <i
        key={measureDefinition.measureOf}
        className="material-icons text-danger"
        title={translatedLabel}
        onClick={() => showModal(translatedLabel)}
      >
        {measureDefinition.iconFalse}
      </i>
    );
  }
}
