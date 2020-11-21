import React from "react";
import {Container, Row, Col} from "reactstrap";

import {t, register} from "../viewer-api";

import translations from "./footer.json";

function Footer() {
  return (
    <footer className="footer py-4 mt-2 border-top">
      <Container>
        <Row>
          <Col mx={12} className="font-italic">
            {t("footer.legalStart")}
            <a
              href="https://www.zakonyprolidi.cz/cs/2008-64"
              title={t("footer.legalLink")}
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
