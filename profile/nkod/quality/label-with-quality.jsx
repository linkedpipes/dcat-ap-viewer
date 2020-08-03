import React from "react";
import {qualityIcons} from "./quality-icon";

export function labelWithQuality(
  t, tLiteral, openModal, quality, label, measures) {
  return (
    <dt>
      {t(label)}
      {qualityIcons(t, tLiteral, openModal, quality, measures)}
    </dt>
  );
}
