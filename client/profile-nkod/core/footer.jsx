import React, {useContext} from "react";
import {Container, Row, Col} from "reactstrap";

import {t, register, NavigationContext, translateString} from "../viewer-api";
import {
  getCreateDatasetFormLink, getCreateCatalogFormLink,
} from "../form/form-service";

import translations from "./footer.json";


function Footer() {
  const {language} = useContext(NavigationContext);

  return (
    <footer className="footer py-4 mt-2 border-top">
      <Container>
        <Row>
          <Col md="4">
            <h3 className="h6">{t("footer.nkodRegistration")}</h3>
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
            <h3 className="h6">{t("footer.contacts")}</h3>
            <ul>
              <li>{t("footer.email")}: <a
                href="mailto:otevrenadata@dia.gov.cz">otevrenadata@dia.gov.cz</a>
              </li>
              <li>{t("footer.telephone")}: +420 974 816 397
              </li>
              <li><a href="https://digitalizace.gov.cz/">{t("footer.dia")}</a></li>
              <li><a href="https://data.gov.cz">{t("footer.opendata")}</a></li>
              <li>
                <a href="/prohlášení-o-přístupnosti">
                  {t("footer.accessibility")}
                </a>
              </li>
            </ul>
          </Col>
          <Col md="4">
            <h3 className="h6">{t("footer.links")}</h3>
            <ul>
              <li>{t("footer.catalogForDownload")}: <a
                href="/soubor/nkod.trig">
                {t("footer.downloadCatalogTriG")}
              </a>, <a
                href="/soubor/nkod.hdt">
                {t("footer.downloadCatalogHDT")}
              </a>, <a
                href="/soubor/nkod.json">
                {t("footer.downloadCatalogJSON")}
              </a>, <a href="/soubor/datové-sady.csv">
                {t("footer.downloadDatasets")}
              </a>, <a href="/soubor/distribuce.csv">
                {t("footer.downloadDistributions")}
              </a></li>
              <li>API: <a href="/sparql">
                {t("footer.sparqlEndpoint")}
              </a>, <a href="/ldf/">
                {t("footer.ldfEndpoint")}
              </a>, <a href="/graphql">
                {t("footer.graphQLEndpoint")}
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
              <li><a href="https://docs.google.com/forms/d/e/1FAIpQLSdUaVaCITtmHdTGxsU5xPvdzIygOA7wHHaotPRPAbglCF3mpw/viewform">{t("footer.suggestions")}</a></li>
              <li>
                <a href="https://github.com/opendata-mvcr/nkod">
                  {t("footer.nkodDocumentation")}
                </a>
              </li>
              <li>
                <a href="/datová-kvalita">
                  {t("footer.quality")}
                </a>
              </li>
            </ul>
          </Col>
          <Col md="4">
            <h3 className="h6">{t("footer.thanksTitle")}</h3>
            <p>{t("footer.thanks1")}
              <a
                href="https://www.esfcr.cz/projekty-opz/-/asset_publisher/ODuZumtPTtTa/content/implementace-strategii-v-oblasti-otevrenych-dat-ii">
                {t("footer.thanksLink1")}
              </a>
              {t("footer.thanks2")}
              <a
                href="https://www.esfcr.cz/projekty-opz/-/asset_publisher/ODuZumtPTtTa/content/rozvoj-datovych-politik-v-oblasti-zlepsovani-kvality-a-interoperability-dat-verejne-spravy">
                {t("footer.thanksLink2")}
              </a>
              {t("footer.thanks3")}
            </p>
            <div className="bg-white shadow">
              <img
                alt={translateString(language, "footer.euOzp")}
                className="d-inline-block align-top"
                id="eulogo"
                src={translateString(language, "footer.npoLogoLink")}
                width="300"
              />
            </div>
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col md="12">
            {t("footer.legalStart")}
            <a
              href={translateString(language, "footer.legalLinkURL")}
              title={translateString(language, "footer.legalLink")}
            >
              {t("footer.legalLink")}
            </a>
            {t("footer.legalTail")}
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

register({
  "name": "footer",
  "element": Footer,
  "translations": translations,
});
