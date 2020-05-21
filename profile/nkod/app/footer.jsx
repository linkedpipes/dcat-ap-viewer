import React from "react";
import {
  register,
  ELEMENT_FOOTER,
} from "./../../client-api";
import {PropTypes} from "prop-types";
import {
  getCreateDatasetFormLink,
  getCreateCatalogFormLink,
} from "../../../client/form";

function Footer({language, t}) {
  return (
    <footer className="footer py-4 mt-2 border-top">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <strong>{t("f_nkod_registration")}</strong>
            <ul>
              <li>
                <a href={getCreateDatasetFormLink(language)}>
                  {t("f_register_dataset")}
                </a>
              </li>
              <li>
                <a href={getCreateCatalogFormLink(language)}>
                  {t("f_register_local_catalog")}
                </a>
              </li>
            </ul>
            <strong>{t("f_contacts")}</strong>
            <ul>
              <li>{t("f_contact_person")}: <a
                href="mailto:michal.kuban@mvcr.cz">Michal Kubáň</a>
              </li>
              <li>{t("f_email")}: <a
                href="mailto:michal.kuban@mvcr.cz">michal.kuban@mvcr.cz</a>
              </li>
              <li>{t("f_telephone")}: +420 974 816 395
              </li>
              <li><a href="http://www.mvcr.cz/">{t("f_mvcr")}</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <strong>{t("f_links")}</strong>
            <ul>
              <li>{t("f_catalog_for_download")}: <a
                href="https://data.gov.cz/soubor/nkod.trig">
                {t("f_download_catalog")}
              </a>, <a href="https://data.gov.cz/soubor/datové-sady.csv">
                {t("f_download_datasets")}
              </a>, <a href="https://data.gov.cz/soubor/distribuce.csv">
                {t("f_download_distributions")}
              </a></li>
              <li><a href="https://data.gov.cz/sparql">
                {t("f_sparql_endpoint")}
              </a></li>
              <li><a href="https://data.gov.cz">
                {t("f_opendata")}
              </a></li>
              <li>{t("f_catalog_runs_at")}{" "}
                <a href="https://github.com/linkedpipes/dcat-ap-viewer">
                  LinkedPipes DCAT-AP Viewer
                </a>
              </li>
              <li>{t("f_data_prepared_with")}{" "}
                <a href="https://etl.linkedpipes.com">
                  LinkedPipes ETL
                </a>
              </li>
              <li>
                <a href="https://github.com/opendata-mvcr/nkod">
                  {t("f_nkod_documentation")}
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <div className="bg-white shadow">
              <img
                alt={t("f_eu_ozp")}
                className="d-inline-block align-top"
                id="eulogo"
                src={t("f_opz_logo_link")}
                width="300"
              />
            </div>
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col-md-12 font-italic">
            {t("f_legal_0")}
            <a
              href="https://www.zakonyprolidi.cz/cs/2008-64"
              title="Vyhláška o přístupnosti"
            >
              {t("f_legal_1")}
            </a>
            {t("f_legal_2")}
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  "language": PropTypes.string.isRequired,
  "t": PropTypes.func.isRequired,
  "tUrl": PropTypes.func.isRequired,
};

register({
  "name": ELEMENT_FOOTER,
  "element": Footer,
});
