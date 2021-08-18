import {register} from "../viewer-api";

function DatasetDetailDescendants() {
  // We do not support this in the version used with this profile.
  return null;
}

register({
  "name": "dataset-detail.descendants",
  "element": DatasetDetailDescendants,
});
