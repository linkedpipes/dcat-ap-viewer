import React from "react";

import {t, register} from "../viewer-api";
import translations from "./status-failed.json";

const StatusFailed = () => (
  <div style={{"textAlign": "center", "margin": "1rem 0 1rem 0"}}>
    {t("status.failed")}
  </div>
);

register({
  "name": "application.failed",
  "element": StatusFailed,
  "translations": translations,
});
