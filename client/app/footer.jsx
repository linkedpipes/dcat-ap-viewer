import React from "react";
import {
    getFormLink,
    DATASET_EDIT,
    CATALOG_EDIT
} from "./form-links";
import {getString} from "../app-services/strings";

const Footer = () => {
    return (
        <footer className="footer bg-light py-4 mt-2 border-top">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                         <strong>{getString("f_nkod_registration")}</strong>
                         <ul>
                             <li>
                                 <a href={getFormLink(DATASET_EDIT)}>
                                     {getString("f_register_dataset")}
                                 </a>
                             </li>
                             <li>
                                 <a href={getFormLink(CATALOG_EDIT)}>
                                     {getString("f_register_local_catalog")}
                                 </a>
                             </li>
                          </ul>

                        <strong>{getString("f_contacts")}</strong>
                        <ul>
                            <li>{getString("f_contact_person")}: <a href="mailto:michal.kuban@mvcr.cz">Michal Kubáň</a>
                            </li>
                            <li>{getString("f_email")}: <a href="mailto:michal.kuban@mvcr.cz">michal.kuban@mvcr.cz</a>
                            </li>
                            <li>{getString("f_telephone")}: +420 974 816 395
                            </li>
                            <li><a href="http://www.mvcr.cz/">{getString("f_mvcr")}</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <strong>{getString("f_links")}</strong>
                        <ul>
                            <li>{getString("f_catalog_for_download")}: <a href="https://data.gov.cz/soubor/nkod.trig">
                                    {getString("f_download_catalog")}
                                </a>, <a href="https://data.gov.cz/soubor/datové-sady.csv">
                                    {getString("f_download_datasets")}
                                </a>, <a href="https://data.gov.cz/soubor/distribuce.csv">
                                    {getString("f_download_distributions")}
                                </a></li>
                            <li><a href="https://data.gov.cz/sparql">
                                {getString("f_sparql_endpoint")}
                            </a></li>
                            <li><a href="https://data.gov.cz">
                                {getString("f_opendata")}
                            </a></li>
                            <li>{getString("f_catalog_runs_at")} <a href="https://github.com/linkedpipes/dcat-ap-viewer">LinkedPipes DCAT-AP Viewer</a> (GitHub)
                            </li>
                            <li>{getString("f_data_prepared_with")} <a href="https://etl.linkedpipes.com">LinkedPipes ETL</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <img alt={getString("f_eu_ozp")} className="d-inline-block align-top" id="eulogo" src={getString("f_opz_logo_link")} width="300"/>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-md-12 font-italic">
                        {getString("f_legal_0")} <a href="https://www.zakonyprolidi.cz/cs/2008-64" title="Vyhláška o přístupnosti">
                            {getString("f_legal_1")}
                        </a>
                        {getString("f_legal_2")}
                    </div>
                </div>
            </div>
        </footer>
    )
};

export default Footer;
