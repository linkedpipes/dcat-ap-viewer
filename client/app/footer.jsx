import React from "react";

const Footer = () => {
    return (
        <footer className="text-muted">
            <div className="container">
                <hr/>
                <div className="row">
                    <div className="col-md-4">
                         <strong>Registrace do NKOD</strong>
                         <ul>
                             <li><a href="https://dev.nkod.opendata.cz/formulář/">Registrovat datovou sadu</a></li>
                             <li><a href="https://dev.nkod.opendata.cz/formulář/#catalog">Registrovat lokální katalog</a></li>
                          </ul>

                        <strong>Kontakty</strong>
                        <ul>
                            <li>Kontaktní osoba: <a href="mailto:michal.kuban@mvcr.cz">Michal Kubáň</a></li>
                            <li>Email: <a href="mailto:michal.kuban@mvcr.cz">michal.kuban@mvcr.cz</a></li>
                            <li>Telefon: +420 974 816 395</li>
                            <li><a href="http://www.mvcr.cz/">Ministerstvo vnitra České republiky</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <strong>Odkazy</strong>
                        <ul>
                            <li><a href="https://data.gov.cz/soubor/nkod.trig">Katalog ke stažení (RDF TriG)</a></li>
                            <li><a href="https://data.gov.cz/sparql">SPARQL endpoint</a></li>
                            <li><a href="https://data.gov.cz">Otevřená data</a></li>
                            <li>Katalog běží na <a href="https://github.com/linkedpipes/dcat-ap-viewer">LinkedPipes DCAT-AP Viewer</a> (GitHub)</li>
                            <li>Data zpracována pomocí <a href="https://etl.linkedpipes.com">LinkedPipes ETL</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <img alt="Evropská unie - Evropský sociální fond - Operační program Zaměstnanost" className="d-inline-block align-top" id="eulogo" src="/images/ozp_logo_cz.jpg" width="300"/>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-md-12">
                        Forma uveřejňovaných informací je v souladu s <a href="https://www.zakonyprolidi.cz/cs/2008-64" title="Vyhláška o přístupnosti">vyhláškou č. 64/2008 Sb., o formě uveřejňování informací souvisejících s výkonem veřejné správy prostřednictvím webových stránek pro osoby se zdravotním postižením (vyhláška o přístupnosti)</a>, a splňuje všechna pravidla uveřejněná v příloze této vyhlášky.
                    </div>
                </div>
            </div>
        </footer>
    )
};

export default Footer;
