import React from "react";
import {
  register,
  ELEMENT_FOOTER,
} from "./../../client-api";
import {PropTypes} from "prop-types";
import {
  getCreateDatasetFormLink,
  getCreateCatalogFormLink,
} from "../dcat-ap-forms";

function Footer({language, t}) {
  return (
    <footer className="footer py-4 mt-2 border-top">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <strong>{t("footer.nkodRegistration")}</strong>
            <ul>
              <li>
                <a href={getCreateDatasetFormLink(language)}>
                  {t("footer.registerDataset")}
                </a>
              </li>
              <li>
                <a href={getCreateCatalogFormLink(language)}>
                  {t("footer.registerLocalCatalog")}
                </a>
              </li>
            </ul>
            <strong>{t("footer.contacts")}</strong>
            <ul>
              <li>{t("footer.contactPerson")}: <a
                href="mailto:michal.kuban@mvcr.cz">Michal Kubáň</a>
              </li>
              <li>{t("footer.email")}: <a
                href="mailto:michal.kuban@mvcr.cz">michal.kuban@mvcr.cz</a>
              </li>
              <li>{t("footer.telephone")}: +420 974 816 395
              </li>
              <li><a href="http://www.mvcr.cz/">{t("footer.mvcr")}</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <strong>{t("footer.links")}</strong>
            <ul>
              <li>{t("footer.catalogForDownload")}: <a
                href="https://data.gov.cz/soubor/nkod.trig">
                {t("footer.downloadCatalog")}
              </a>, <a href="https://data.gov.cz/soubor/datové-sady.csv">
                {t("footer.downloadDatasets")}
              </a>, <a href="https://data.gov.cz/soubor/distribuce.csv">
                {t("footer.downloadDistributions")}
              </a></li>
              <li><a href="https://data.gov.cz/sparql">
                {t("footer.sparqlEndpoint")}
              </a></li>
              <li><a href="https://data.gov.cz">
                {t("footer.opendata")}
              </a></li>
              <li>{t("footer.catalogRunsAt")}{" "}
                <a href="https://github.com/linkedpipes/dcat-ap-viewer">
                  LinkedPipes DCAT-AP Viewer
                </a>
              </li>
              <li>{t("footer.dataPreparedWith")}{" "}
                <a href="https://etl.linkedpipes.com">
                  LinkedPipes ETL
                </a>
              </li>
              <li>
                <a href="https://github.com/opendata-mvcr/nkod">
                  {t("footer.nkodDocumentation")}
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <div className="bg-white shadow">
              <img
                alt={t("footer.euOzp")}
                className="d-inline-block align-top"
                id="eulogo"
                src={t("footer.opzLogoLink")}
                width="300"
              />
            </div>
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col-md-12 font-italic">
            {t("footer.legalStart")}
            <a
              href="https://www.zakonyprolidi.cz/cs/2008-64"
              title={t("footer.legalLink")}
            >
              {t("footer.legalLink")}
            </a>
            {t("footer.legalTail")}
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
