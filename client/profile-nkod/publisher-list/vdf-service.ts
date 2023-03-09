import {useState, useEffect} from "react";
import {fetchJson} from "../../api-nkod/fetch";

const PUBLISHER =
  "https://data.gov.cz/slovník/nkod/role-poskytovatele-ve-vdf/poskytovatel-vdf";

const ORIGINATOR =
  "https://data.gov.cz/slovník/nkod/role-poskytovatele-ve-vdf/původce-vdf";

export function usePublisherVdf() {
  const [vdfPublishers, setVdfPublishers] = useState([] as string[]);
  const [vdfOriginators, setVdfOriginators] = useState([] as string[]);

  useEffect(() => {
    let url = "./api/v2/vdf/publishers";
    fetchJson(url).then((data) => {
      const nextVdfPublishers: string[] = [];
      const nextVdfOriginators: string[] = [];
      (data as any).forEach((item: any) => {
        const iri = item["@id"];
        if (iri === undefined) {
          return;
        }
        if (item[PUBLISHER]) {
          nextVdfPublishers.push(iri);
        }
        if (item[ORIGINATOR]) {
          nextVdfOriginators.push(iri);
        }
      });
      setVdfPublishers(nextVdfPublishers);
      setVdfOriginators(nextVdfOriginators);
    });
  }, [setVdfPublishers, setVdfOriginators]);

  return [vdfPublishers, vdfOriginators];
}
