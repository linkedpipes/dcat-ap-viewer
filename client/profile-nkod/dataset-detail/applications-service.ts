import {useState, useEffect} from "react";
import {fetchJson} from "../../api-nkod/fetch";
import {configuration} from "../viewer-api";

export function useApplications(language: string, dataset: string) {
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(true);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    let isCancelled = false;
    const url = configuration.applicationsUrl +
      "api/v1/applications-for-datasets?iri=" +
      encodeURIComponent(dataset) +
     "&language=" + encodeURIComponent((language));

    setLoading(true);
    fetchJson(url).then((data: any) => {
      if (isCancelled) {
        return;
      }
      setLoading(false);
      setFailed(false);
      setApplications(data["applications"].map((item: any) => ({
        "label": item["title"],
        "description": item["description"],
        "href": createApplicationLink(language, item["iri"]),
      })));
    }).catch(error => {
      if (isCancelled) {
        return;
      }
      setLoading(false);
      setFailed(true);
      setApplications([]);
    });

    return () => {
      isCancelled = true;
    };
  }, [language, dataset]);

  return {loading, failed, applications};
}

function createApplicationLink(language: string, application: string) {
  let result = configuration.applicationsUrl;
  if (language == "cs") {
    result += "detail-aplikace";
  } else {
    result += "application-detail"
  }
  result += "?iri=" + encodeURIComponent(application);
  return result;
}
