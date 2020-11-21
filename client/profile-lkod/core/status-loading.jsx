import React from "react";

import {t, register} from "../viewer-api";
import translations from "./status-loading.json";

const StatusLoading = () => (
  <div style={{"textAlign": "center", "margin": "1rem 0 1rem 0"}}>
    {t("status.loading")}
  </div>
);

register({
  "name": "application.loading",
  "element": StatusLoading,
  "translations": translations,
});
