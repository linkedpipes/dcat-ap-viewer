import {JsonLdEntity} from "../jsonld";
import {Api} from "./api-interface";

export function createClientTestApi(): Api {
  return {
    "fetchDatasetList": (language, query) => {
      return Promise.resolve({
        "jsonld": [
          {
            "@id": "_:b0",
            "@type": "http://dcat-ap.linkedpipes.com/DatasetListMetadata",
            "http://dcat-ap.linkedpipes.com/datasetCount": 135089
          },
          {
            "@id": "_:b1",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 52453,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/keyword"},
            "http://purl.org/dc/terms/title": "Katastrální mapa"
          },
          {
            "@id": "_:b10",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 13073,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/keyword"},
            "http://purl.org/dc/terms/title": "DXF"
          },
          {
            "@id": "_:b11",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 52566,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/format"},
            "http://purl.org/dc/terms/title": "Plain text"
          },
          {
            "@id": "_:b12",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 17131,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/format"},
            "http://purl.org/dc/terms/title": "CSV"
          },
          {
            "@id": "_:b13",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 4222,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/format"},
            "http://purl.org/dc/terms/title": "XML"
          },
          {
            "@id": "_:b14",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 3586,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/format"},
            "http://purl.org/dc/terms/title": "GNU zip"
          },
          {
            "@id": "_:b15",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 755,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/format"},
            "http://purl.org/dc/terms/title": "ZIP"
          },
          {
            "@id": "_:b16",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 143,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/format"},
            "http://purl.org/dc/terms/title": "Excel XLSX"
          },
          {
            "@id": "_:b17",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 126,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/format"},
            "http://purl.org/dc/terms/title": "GeoJSON"
          },
          {
            "@id": "_:b18",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 109,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/format"},
            "http://purl.org/dc/terms/title": "Esri Shape"
          },
          {
            "@id": "_:b19",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 98,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/format"},
            "http://purl.org/dc/terms/title": "Zipped GML"
          },
          {
            "@id": "_:b2",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 31356,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/keyword"},
            "http://purl.org/dc/terms/title": "RÚIAN"
          },
          {
            "@id": "_:b20",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 74,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/format"},
            "http://purl.org/dc/terms/title": "RDF TriG"
          },
          {
            "@id": "_:b21",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 129006,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/publisher"},
            "http://purl.org/dc/terms/title": "Český úřad zeměměřický a katastrální"
          },
          {
            "@id": "_:b22",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 3658,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/publisher"},
            "http://purl.org/dc/terms/title": "Ministerstvo vnitra"
          },
          {
            "@id": "_:b23",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 599,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/publisher"},
            "http://purl.org/dc/terms/title": "Český statistický úřad"
          },
          {
            "@id": "_:b24",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 369,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/publisher"},
            "http://purl.org/dc/terms/title": "Úřad průmyslového vlastnictví"
          },
          {
            "@id": "_:b25",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 249,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/publisher"},
            "http://purl.org/dc/terms/title": "HLAVNÍ MĚSTO PRAHA"
          },
          {
            "@id": "_:b26",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 170,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/publisher"},
            "http://purl.org/dc/terms/title": "Statutární město Brno"
          },
          {
            "@id": "_:b27",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 163,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/publisher"},
            "http://purl.org/dc/terms/title": "Statutární město Plzeň"
          },
          {
            "@id": "_:b28",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 103,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/publisher"},
            "http://purl.org/dc/terms/title": "Ministerstvo zemědělství"
          },
          {
            "@id": "_:b29",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 101,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/publisher"},
            "http://purl.org/dc/terms/title": "Český telekomunikační úřad"
          },
          {
            "@id": "_:b3",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 25596,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/keyword"},
            "http://purl.org/dc/terms/title": "INSPIRE"
          },
          {
            "@id": "_:b30",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 98,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/publisher"},
            "http://purl.org/dc/terms/title": "Statutární město Ostrava"
          },
          {
            "@id": "_:b31",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 134,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/theme"},
            "http://purl.org/dc/terms/title": "http://eurovoc.europa.eu/5429"
          },
          {
            "@id": "_:b32",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 128,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/theme"},
            "http://purl.org/dc/terms/title": "http://eurovoc.europa.eu/1018"
          },
          {
            "@id": "_:b33",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 78,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/theme"},
            "http://purl.org/dc/terms/title": "http://publications.europa.eu/resource/authority/data-theme/AGRI"
          },
          {
            "@id": "_:b34",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 56,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/theme"},
            "http://purl.org/dc/terms/title": "http://publications.europa.eu/resource/authority/data-theme/GOVE"
          },
          {
            "@id": "_:b35",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 36,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/theme"},
            "http://purl.org/dc/terms/title": "http://publications.europa.eu/resource/authority/data-theme/ENVI"
          },
          {
            "@id": "_:b36",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 31,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/theme"},
            "http://purl.org/dc/terms/title": "http://eurovoc.europa.eu/77"
          },
          {
            "@id": "_:b37",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 28,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/theme"},
            "http://purl.org/dc/terms/title": "http://eurovoc.europa.eu/3751"
          },
          {
            "@id": "_:b38",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 26,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/theme"},
            "http://purl.org/dc/terms/title": "http://publications.europa.eu/resource/authority/data-theme/SOCI"
          },
          {
            "@id": "_:b39",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 23,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/theme"},
            "http://purl.org/dc/terms/title": "http://publications.europa.eu/resource/authority/data-theme/ECON"
          },
          {
            "@id": "_:b4",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 19335,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/keyword"},
            "http://purl.org/dc/terms/title": "SHP"
          },
          {
            "@id": "_:b40",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 22,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/theme"},
            "http://purl.org/dc/terms/title": "http://publications.europa.eu/resource/authority/data-theme/HEAL"
          },
          {
            "@id": "_:b5",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 18777,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/keyword"},
            "http://purl.org/dc/terms/title": "stav"
          },
          {
            "@id": "_:b6",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 13171,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/keyword"},
            "http://purl.org/dc/terms/title": "VFK"
          },
          {
            "@id": "_:b7",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 13170,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/keyword"},
            "http://purl.org/dc/terms/title": "Geometrické plány"
          },
          {
            "@id": "_:b8",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 13076,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/keyword"},
            "http://purl.org/dc/terms/title": "Parcely"
          },
          {
            "@id": "_:b9",
            "@type": "http://dcat-ap.linkedpipes.com/Facet",
            "http://dcat-ap.linkedpipes.com/count": 13073,
            "http://dcat-ap.linkedpipes.com/facet": {"@id": "http://facet/keyword"},
            "http://purl.org/dc/terms/title": "DGN"
          },
          {
            "@id": "https://data.gov.cz/zdroj/datové-sady/Ostrava/37085199",
            "@type": "http://www.w3.org/ns/dcat#Dataset",
            "http://purl.org/dc/terms/accrualPeriodicity": {"@id": "http://publications.europa.eu/resource/authority/frequency/NEVER"},
            "http://purl.org/dc/terms/description": {
              "@language": "cs",
              "@value": "3D model budov centra Ostravy. Stav k r. 2001.",
            },
            "http://purl.org/dc/terms/format": {"@id": "http://format/ZIP"},
            "http://purl.org/dc/terms/issued": "2016-07-26T00:00:00Z",
            "http://purl.org/dc/terms/modified": "2016-07-26T00:00:00Z",
            "http://purl.org/dc/terms/publisher": {"@id": "https://data.gov.cz/zdroj/ovm/00845451"},
            "http://purl.org/dc/terms/spatial": {"@id": "https://linked.cuzk.cz/resource/ruian/momc/545911"},
            "http://purl.org/dc/terms/title": [
              {
                "@language": "cs",
                "@value": "3D model",
              }
            ],
            "http://www.w3.org/ns/dcat#keyword": [
              {
                "@language": "cs",
                "@value": "Parcely",
              },
              {
                "@language": "cs",
                "@value": "DGN",
              },
            ],
            "http://www.w3.org/ns/dcat#theme": [
              {"@id": "http://eurovoc.europa.eu/7845",},
              {"@id": "http://eurovoc.europa.eu/4619",},
            ]
          },
          {
            "@id": "https://data.gov.cz/zdroj/datové-sady/https---kod.brno.cz-api-action-package_show-id-3dmodelbudov2017",
            "@type": "http://www.w3.org/ns/dcat#Dataset",
            "http://purl.org/dc/terms/accrualPeriodicity": {"@id": "http://publications.europa.eu/resource/authority/frequency/CONT"},
            "http://purl.org/dc/terms/description": {
              "@language": "cs",
              "@value": "3D model budov zobrazuje stavební objekty na území města Brna v úrovni detailu LOD1 (\"krabicový\" model). Data ve formátu SHP obsahují atributy ID budovy, kód RÚIAN (objekty obsažené přímo v RÚIAN jsou s hodnotou větší než 0 a menší než 1000000000), typ plochy (vodorovná střešní plocha, svislá stěna a půdorysná deska), relativní a absolutní výška.\r\n\r\nData ve formátech DGN a DWG jsou rozdělena do tří vrstev podle typu plochy. 3D model budov vznikl v roce 2008 stereofotogrammetricky, v roce 2017 byl aktualizován stejnou metodou z leteckých měřických snímků z března 2017. Zjištění výšky a souřadnic metodou stereofotogrammetrie je odhadována do 20 cm.\r\n\r\nData jsou zobrazena v aplikaci 3D model budov.",
            },
            "http://purl.org/dc/terms/format": {"@id": "http://format/ZIP"},
            "http://purl.org/dc/terms/publisher": {"@id": "https://data.gov.cz/zdroj/ovm/44992785"},
            "http://purl.org/dc/terms/spatial": {"@id": "https://linked.cuzk.cz/resource/ruian/obec/582786"},
            "http://purl.org/dc/terms/title": {
              "@language": "cs",
              "@value": "3D model budov 2017",
            },
          },
          {
            "@id": "https://data.gov.cz/zdroj/datové-sady/https---opendata.plzen.eu-api-3-action-package_show-id-gis-3d-3d-budovy-a-objekty",
            "@type": "http://www.w3.org/ns/dcat#Dataset",
            "http://purl.org/dc/terms/description": {
              "@language": "cs",
              "@value": "3D model budov centra města Plzně z roku 2005 byl využit pro projekt Turistické olympiády IVV 2005 v Plzni. Více na http://mapy.plzen.eu/aplikace-a-mapy/tematicke-kategorie/uzemni-cleneni/3d-model-plzne.aspx ",
            },
            "http://purl.org/dc/terms/format": {"@id": "http://format/ZIP"},
            "http://purl.org/dc/terms/publisher": {"@id": "https://data.gov.cz/zdroj/ovm/00075370"},
            "http://purl.org/dc/terms/title": {
              "@language": "cs",
              "@value": "3D budovy centrum Plzně",
            },
            "http://www.w3.org/ns/dcat#keyword": [
              {
                "@language": "cs",
                "@value": "3D",
              },
              {
                "@language": "cs",
                "@value": "GIS",
              },
            ],
          },
          {
            "@id": "https://data.gov.cz/zdroj/datové-sady/https---opendata.plzen.eu-api-3-action-package_show-id-gis-3d-3d-model-zoo",
            "@type": "http://www.w3.org/ns/dcat#Dataset",
            "http://purl.org/dc/terms/description": {
              "@language": "cs",
              "@value": "3D model budov ZOO, výběhů a zeleně nad leteckým snímkem s umístěním nejvýznamnějších expozic. Více na http://mapy.plzen.eu/aplikace-a-mapy/tematicke-kategorie/uzemni-cleneni/3d-model-plzne.aspx ",
            },
            "http://purl.org/dc/terms/format": {"@id": "http://format/KMZ"},
            "http://purl.org/dc/terms/publisher": {"@id": "https://data.gov.cz/zdroj/ovm/00075370"},
            "http://purl.org/dc/terms/title": {
              "@language": "cs",
              "@value": "3D model ZOO",
            },
            "http://www.w3.org/ns/dcat#keyword": [
              {
                "@language": "cs",
                "@value": "3D",
              },
              {
                "@language": "cs",
                "@value": "GIS",
              },
            ]
          },
          {
            "@id": "https://data.gov.cz/zdroj/datové-sady/https---opendata.plzen.eu-api-3-action-package_show-id-gis-rastrovy-podklad-uzemni-plan-plzen-1-zakladni-vykres",
            "@type": "http://www.w3.org/ns/dcat#Dataset",
            "http://purl.org/dc/terms/description": {
              "@language": "cs",
              "@value": "Územní plán Plzeň - Výkres č. 1 - Základní členění území\n. Více na http://www.ukr.plzen.eu/cz/uzemni-planovani/uzemni-plan-plzen/uzemni-plan-plzen.aspx\n Více na http://mapy.plzen.eu/aktuality/uzemni-plan-plzen-2016.aspx",
            },
            "http://purl.org/dc/terms/format": {"@id": "http://format/ZIP"},
            "http://purl.org/dc/terms/publisher": {"@id": "https://data.gov.cz/zdroj/ovm/00075370"},
            "http://purl.org/dc/terms/title": {
              "@language": "cs",
              "@value": "1.Základní výkres"
            },
            "http://www.w3.org/ns/dcat#keyword": [
              {
                "@language": "cs",
                "@value": "Územní plán Plzeň",
              },
              {
                "@language": "cs",
                "@value": "GIS",
              },
              {
                "@language": "cs",
                "@value": "Rastrový podklad",
              },
            ]
          },
          {
            "@id": "https://data.gov.cz/zdroj/datové-sady/https---opendata.plzen.eu-api-3-action-package_show-id-gis-rastrovy-podklad-uzemni-plan-plzen-1od-koordinacni-vykres",
            "@type": "http://www.w3.org/ns/dcat#Dataset",
            "http://purl.org/dc/terms/description": {
              "@language": "cs",
              "@value": "Územní plán Plzeň - Výkres č. 1 - odůvodnění - Koordinační výkres\n. Více na http://www.ukr.plzen.eu/cz/uzemni-planovani/uzemni-plan-plzen/uzemni-plan-plzen.aspx\n Více na http://mapy.plzen.eu/aktuality/uzemni-plan-plzen-2016.aspx",
            },
            "http://purl.org/dc/terms/format": {"@id": "http://format/ZIP"},
            "http://purl.org/dc/terms/publisher": {"@id": "https://data.gov.cz/zdroj/ovm/00075370"},
            "http://purl.org/dc/terms/title": {
              "@language": "cs",
              "@value": "1od.Koordinační výkres",
            },
            "http://www.w3.org/ns/dcat#keyword": [
              {
                "@language": "cs",
                "@value": "Územní plán Plzeň",
              },
              {
                "@language": "cs",
                "@value": "GIS",
              },
              {
                "@language": "cs",
                "@value": "Rastrový podklad",
              },
            ]
          },
          {
            "@id": "https://data.gov.cz/zdroj/datové-sady/https---opendata.plzen.eu-api-3-action-package_show-id-gis-zivotni-prostredi-zatopy-100-leta-voda",
            "@type": "http://www.w3.org/ns/dcat#Dataset",
            "http://purl.org/dc/terms/description": {
              "@language": "cs",
              "@value": "Záplavové plochy n-leté vody na území Plzně.",
            },
            "http://purl.org/dc/terms/format": [
              {"@id": "http://format/KMZ"},
              {"@id": "http://format/ZIP"},
            ],
            "http://purl.org/dc/terms/publisher": "Statutární město Plzeň",
            "http://purl.org/dc/terms/title": {
              "@language": "cs",
              "@value": "100 letá voda",
            },
            "http://www.w3.org/ns/dcat#keyword": [
              {
                "@language": "cs",
                "@value": "Životní prostředí",
              },
              {
                "@language": "cs",
                "@value": "GIS",
              },
              {
                "@language": "cs",
                "@value": "Zátopy",
              },
            ]
          },
          {
            "@id": "https://data.gov.cz/zdroj/datové-sady/https---opendata.plzen.eu-api-3-action-package_show-id-gis-zivotni-prostredi-zatopy-20-leta-voda",
            "@type": "http://www.w3.org/ns/dcat#Dataset",
            "http://purl.org/dc/terms/description": {
              "@language": "cs",
              "@value": "Záplavové plochy n-leté vody na území Plzně.",
            },
            "http://purl.org/dc/terms/format": [
              {"@id": "http://format/KMZ"},
              {"@id": "http://format/ZIP"},
            ],
            "http://purl.org/dc/terms/publisher": "Statutární město Plzeň",
            "http://purl.org/dc/terms/title": {
              "@language": "cs",
              "@value": "20 letá voda",
            },
            "http://www.w3.org/ns/dcat#keyword": [
              {
                "@language": "cs",
                "@value": "Životní prostředí",
              },
              {
                "@language": "cs",
                "@value": "GIS",
              },
              {
                "@language": "cs",
                "@value": "Zátopy",
              },
            ]
          }
        ]
      });
    },
    "fetchDataset": (language, iri) => {
      return Promise.resolve({
        "jsonld": [
          {
            "@id": "https://data.gov.cz/zdroj/datové-sady/http---vdb.czso.cz-pll-eweb-package_show-id-290038r05",
            "@type": [
              "http://www.w3.org/ns/dcat#Dataset",
              "https://data.gov.cz/slovník/nkod/typ-datové-sady-dle-zdroje/CkanLkod",
              "https://data.gov.cz/slovník/nkod/typ-datové-sady-dle-zdroje/LKOD"
            ],
            "http://purl.org/dc/terms/accrualPeriodicity": {
              "@id": "http://publications.europa.eu/resource/authority/frequency/ANNUAL"
            },
            "http://purl.org/dc/terms/description": {
              "@language": "cs",
              "@value": "Datová sada obsahuje statistické údaje o počtech cizinců (bez azylantů, s pobytem přechodným, dlouhodobým, pobytem trvalým a dlouhodobým vízem) v České republice, a v členění podle pohlaví, pětiletých věkových skupin a státního občanství cizince. Údaje jsou k dispozici za okresy České republiky. Připraveny jsou rovněž úhrny za Českou republiku, všechna státní občanství, pohlaví i věkové skupiny."
            },
            "http://purl.org/dc/terms/identifier": "290038r05",
            "http://purl.org/dc/terms/publisher": {
              "@id": "https://data.gov.cz/zdroj/ovm/00025593"
            },
            "http://purl.org/dc/terms/spatial": {
              "@id": "https://linked.cuzk.cz/resource/ruian/stat/1"
            },
            "http://purl.org/dc/terms/temporal": {
              "@id": "https://data.gov.cz/zdroj/datové-sady/http---vdb.czso.cz-pll-eweb-package_show-id-290038r05/časové-pokrytí"
            },
            "http://purl.org/dc/terms/title": {
              "@language": "cs",
              "@value": "Cizinci podle státního občanství, věku a pohlaví - rok 2004"
            },
            "http://www.w3.org/ns/dcat#contactPoint": {
              "@id": "https://data.gov.cz/zdroj/datové-sady/http---vdb.czso.cz-pll-eweb-package_show-id-290038r05/kontaktní-bod"
            },
            "http://www.w3.org/ns/dcat#distribution": [{
              "@id": "https://data.gov.cz/zdroj/datové-sady/http---vdb.czso.cz-pll-eweb-package_show-id-290038r05/distribuce/522dc9728c20f84c2b9fc9607b82e1d9"
            }, {
              "@id": "https://data.gov.cz/zdroj/datové-sady/https---opendata.plzen.eu-api-3-action-package_show-id-gis-rastrovy-podklad-uzemni-plan-plzen-2-hlavni-vykres/distribuce/6998dfea40f62fe05c662967ec8ddf5e"
            }, {
              "@id": "http://test/distribution/service/000"
            }],
            "http://www.w3.org/ns/dcat#keyword": [
              {
                "@language": "cs",
                "@value": "cizinec"
              },
              {
                "@language": "cs",
                "@value": "státní občanství"
              }
            ],
            "http://www.w3.org/ns/dcat#theme": [
              {
                "@id": "http://eurovoc.europa.eu/5429"
              },
              {
                "@id": "http://localhost/theme/0001"
              }
            ],
            "http://xmlns.com/foaf/0.1/page": {
              "@id": "https://www.czso.cz/documents/62353418/93789313/290038-18dds.htm"
            },
            "https://data.gov.cz/slovník/nkod/accrualPeriodicity": "R/P1Y",
            "https://data.gov.cz/slovník/nkod/lkod": {
              "@id": "https://data.gov.cz/zdroj/lokální-katalogy/CSttstckyU/214608232"
            },
            "https://data.gov.cz/slovník/nkod/ruian_code": "1",
            "https://data.gov.cz/slovník/nkod/ruian_type": "ST",
            "http://www.w3.org/ns/dcat#spatialResolutionInMeters": 2500,
            "http://www.w3.org/ns/dcat#temporalResolution": {
              "@value": "P1D",
              "@type": "http://www.w3.org/2001/XMLSchema#duration"
            }
          },
          {
            "@id": "https://data.gov.cz/zdroj/datové-sady/http---vdb.czso.cz-pll-eweb-package_show-id-290038r05/kontaktní-bod",
            "@type": "http://www.w3.org/2006/vcard/ns#Organization",
            "http://www.w3.org/2006/vcard/ns#fn": {
              "@language": "cs",
              "@value": "Český statistický úřad"
            },
            "http://www.w3.org/2006/vcard/ns#hasEmail": "vdb@czso.cz"
          },
          {
            "@id": "https://data.gov.cz/zdroj/datové-sady/http---vdb.czso.cz-pll-eweb-package_show-id-290038r05/záznam",
            "@type": "http://www.w3.org/ns/dcat#CatalogRecord",
            "http://purl.org/dc/terms/conformsTo": {
              "@id": "https://joinup.ec.europa.eu/release/dcat-ap/12"
            },
            "http://purl.org/dc/terms/language": {
              "@id": "http://publications.europa.eu/resource/authority/language/CES"
            },
            "http://purl.org/dc/terms/source": {
              "@id": "http://vdb.czso.cz/pll/eweb/package_show?id=290038r05"
            },
            "http://xmlns.com/foaf/0.1/primaryTopic": {
              "@id": "https://data.gov.cz/zdroj/datové-sady/http---vdb.czso.cz-pll-eweb-package_show-id-290038r05"
            }
          },
          {
            "@id": "https://data.gov.cz/zdroj/datové-sady/http---vdb.czso.cz-pll-eweb-package_show-id-290038r05/časové-pokrytí",
            "@type": "http://purl.org/dc/terms/PeriodOfTime",
            "http://schema.org/endDate": {
              "@type": "http://www.w3.org/2001/XMLSchema#date",
              "@value": "2004-12-31"
            },
            "http://schema.org/startDate": {
              "@type": "http://www.w3.org/2001/XMLSchema#date",
              "@value": "2004-01-01"
            }
          },
          {
            "@id": "https://data.gov.cz/zdroj/ovm/00025593",
            "@type": [
              "http://xmlns.com/foaf/0.1/Agent",
              "http://xmlns.com/foaf/0.1/Organization"
            ],
            "http://xmlns.com/foaf/0.1/name": {
              "@language": "cs",
              "@value": "Český statistický úřad"
            }
          }, {
            "@id": "http://eurovoc.europa.eu/5429",
            "http://www.w3.org/2004/02/skos/core#inScheme": [
              {
                "@id": "http://eurovoc.europa.eu/"
              }
            ],
            "http://www.w3.org/2004/02/skos/core#prefLabel": "parkovací plocha"
          }, {
            "@id": "http://localhost/theme/0001",
            "http://www.w3.org/2004/02/skos/core#inScheme": [
              {
                "@id": "http://publications.europa.eu/resource/authority/data-theme"
              }
            ],
            "http://www.w3.org/2004/02/skos/core#prefLabel": "Local Theme"
          }
        ]
      });
    },
    "fetchDatasetTypeahead": (language, text, query) => {
      return Promise.resolve({});
    },
    "fetchDatasetFacets":(language, name, amount) => {
      let jsonld: JsonLdEntity[] = [];
      switch (name) {
        case "http://test/distribution/service/000":
          jsonld = [
            {
              "@id": "http://test/distribution/service/000",
              "@type": [
                "http://www.w3.org/ns/dcat#DataService"
              ],
              "http://www.w3.org/ns/dcat#packageFormat": {
                "@id": "http://www.iana.org/assignments/media-types/application/prs.hpub+zip"
              },
              "http://www.w3.org/ns/dcat#compressFormat": {
                "@id": "http://www.iana.org/assignments/media-types/application/gzip",
              },
              "http://www.w3.org/ns/dcat#endpointDescription": {
                "@id": "https://data.service.1.cz/description",
              },
              "http://www.w3.org/ns/dcat#endpointURL": {
                "@id": "https://data.service.1.cz",
              }
            }
          ];
          break;
        case "https://data.gov.cz/zdroj/datové-sady/https---opendata.plzen.eu-api-3-action-package_show-id-gis-rastrovy-podklad-uzemni-plan-plzen-2-hlavni-vykres/distribuce/6998dfea40f62fe05c662967ec8ddf5e":
          jsonld = [
            {
              "@id": "http://www.iana.org/assignments/media-types/application/zip",
              "@type": [
                "http://purl.org/dc/terms/MediaTypeOrExtent"
              ],
              "http://purl.org/dc/terms/title": [
                {
                  "@value": "application/zip"
                }
              ]
            },
            {
              "@id": "https://data.gov.cz/zdroj/datové-sady/https---opendata.plzen.eu-api-3-action-package_show-id-gis-rastrovy-podklad-uzemni-plan-plzen-2-hlavni-vykres/distribuce/6998dfea40f62fe05c662967ec8ddf5e",
              "@type": [
                "http://www.w3.org/ns/dcat#Distribution"
              ],
              "http://purl.org/dc/terms/description": [
                {
                  "@language": "cs",
                  "@value": ""
                }
              ],
              "http://purl.org/dc/terms/format": [
                {
                  "@id": "http://publications.europa.eu/resource/authority/file-type/ZIP"
                }
              ],
              "http://purl.org/dc/terms/title": [
                {
                  "@language": "cs",
                  "@value": "upplzenhlavni (PNG)"
                }
              ],
              "http://www.w3.org/ns/dcat#accessURL": [
                {
                  "@id": "https://gis.plzen.eu/opendata/upplzenhlavni_PNG.zip"
                }
              ],
              "http://www.w3.org/ns/dcat#downloadURL": [
                {
                  "@id": "https://gis.plzen.eu/opendata/upplzenhlavni_PNG.zip"
                }
              ],
              "http://www.w3.org/ns/dcat#mediaType": [
                {
                  "@id": "http://www.iana.org/assignments/media-types/application/zip"
                }
              ],
              "https://data.gov.cz/slovník/nkod/mediaType": [
                {
                  "@value": "zip (PNG)"
                }
              ],
              "https://data.gov.cz/slovník/nkod/typ-úložiště-datové-sady/typÚložiště": [
                {
                  "@id": "https://data.gov.cz/slovník/nkod/typ-úložiště-datové-sady/Web"
                }
              ]
            }];
          break;
        case "https://data.gov.cz/zdroj/datové-sady/http---vdb.czso.cz-pll-eweb-package_show-id-290038r05/distribuce/522dc9728c20f84c2b9fc9607b82e1d9":
          jsonld = [
            {
              "@id": "http://www.iana.org/assignments/media-types/application/zip",
              "@type": "http://purl.org/dc/terms/MediaTypeOrExtent",
              "http://purl.org/dc/terms/title": "application/zip"
            },
            {
              "@id": "https://data.gov.cz/zdroj/datové-sady/http---vdb.czso.cz-pll-eweb-package_show-id-290038r05/distribuce/522dc9728c20f84c2b9fc9607b82e1d9",
              "@type": "http://www.w3.org/ns/dcat#Distribution",
              "http://purl.org/dc/terms/conformsTo": {
                "@id": "https://www.czso.cz/documents/62353418/93789313/290038-18schema2004.json"
              },
              "http://purl.org/dc/terms/description": {
                "@language": "cs",
                "@value": "Datová sada obsahuje statistické údaje o počtech cizinců (bez azylantů, s pobytem přechodným, dlouhodobým, pobytem trvalým a dlouhodobým vízem) v České republice, a v členění podle pohlaví, pětiletých věkových skupin a státního občanství cizince. Údaje jsou k dispozici za okresy České republiky. Připraveny jsou rovněž úhrny za Českou republiku, všechna státní občanství, pohlaví i věkové skupiny."
              },
              "http://purl.org/dc/terms/format": {
                "@id": "http://publications.europa.eu/resource/authority/file-type/ZIP"
              },
              "http://purl.org/dc/terms/title": {
                "@language": "cs",
                "@value": "Data za rok 2004"
              },
              "http://www.w3.org/ns/dcat#accessURL": {
                "@id": "https://www.czso.cz/documents/62353418/93789313/290038-18data2004.zip"
              },
              "http://www.w3.org/ns/dcat#downloadURL": {
                "@id": "https://www.czso.cz/documents/62353418/93789313/290038-18data2004.zip"
              },
              "http://www.w3.org/ns/dcat#mediaType": {
                "@id": "http://www.iana.org/assignments/media-types/application/zip"
              },
              "https://data.gov.cz/slovník/nkod/mediaType": "application/zip",
              "https://data.gov.cz/slovník/nkod/typ-úložiště-datové-sady/typÚložiště": {
                "@id": "https://data.gov.cz/slovník/nkod/typ-úložiště-datové-sady/Web"
              },
              "https://data.gov.cz/slovník/podmínky-užití/specifikace": {
                "@id": "https://data.gov.cz/zdroj/datové-sady/http---vdb.czso.cz-pll-eweb-package_show-id-290038r05/distribuce/522dc9728c20f84c2b9fc9607b82e1d9/podmínky-užití"
              }
            },
            {
              "@id": "https://data.gov.cz/zdroj/datové-sady/http---vdb.czso.cz-pll-eweb-package_show-id-290038r05/distribuce/522dc9728c20f84c2b9fc9607b82e1d9/podmínky-užití",
              "@type": "https://data.gov.cz/slovník/podmínky-užití/Specifikace",
              "https://data.gov.cz/slovník/podmínky-užití/autorské-dílo": {
                "@id": "https://data.gov.cz/podmínky-užití/neobsahuje-autorská-díla/"
              },
              "https://data.gov.cz/slovník/podmínky-užití/databáze-chráněná-zvláštními-právy": {
                "@id": "https://data.gov.cz/podmínky-užití/není-chráněna-zvláštním-právem-pořizovatele-databáze/"
              },
              "https://data.gov.cz/slovník/podmínky-užití/databáze-jako-autorské-dílo": {
                "@id": "https://data.gov.cz/podmínky-užití/není-autorskoprávně-chráněnou-databází/"
              },
              "https://data.gov.cz/slovník/podmínky-užití/osobní-údaje": {
                "@id": "https://data.gov.cz/podmínky-užití/neobsahuje-osobní-údaje/"
              }
            }
          ];
          break;
      }

      return Promise.resolve({"jsonld": jsonld.slice(0, amount)});
    },
    "fetchDistribution": (language, iri) => {
      let jsonld: JsonLdEntity[] = [];
      switch (iri) {
        case "http://test/distribution/service/000":
          jsonld = [
            {
              "@id": "http://test/distribution/service/000",
              "@type": [
                "http://www.w3.org/ns/dcat#DataService"
              ],
              "http://www.w3.org/ns/dcat#packageFormat": {
                "@id": "http://www.iana.org/assignments/media-types/application/prs.hpub+zip"
              },
              "http://www.w3.org/ns/dcat#compressFormat": {
                "@id": "http://www.iana.org/assignments/media-types/application/gzip",
              },
              "http://www.w3.org/ns/dcat#endpointDescription": {
                "@id": "https://data.service.1.cz/description",
              },
              "http://www.w3.org/ns/dcat#endpointURL": {
                "@id": "https://data.service.1.cz",
              }
            }
          ];
          break;
        case "https://data.gov.cz/zdroj/datové-sady/https---opendata.plzen.eu-api-3-action-package_show-id-gis-rastrovy-podklad-uzemni-plan-plzen-2-hlavni-vykres/distribuce/6998dfea40f62fe05c662967ec8ddf5e":
          jsonld = [
            {
              "@id": "http://www.iana.org/assignments/media-types/application/zip",
              "@type": [
                "http://purl.org/dc/terms/MediaTypeOrExtent"
              ],
              "http://purl.org/dc/terms/title": [
                {
                  "@value": "application/zip"
                }
              ]
            },
            {
              "@id": "https://data.gov.cz/zdroj/datové-sady/https---opendata.plzen.eu-api-3-action-package_show-id-gis-rastrovy-podklad-uzemni-plan-plzen-2-hlavni-vykres/distribuce/6998dfea40f62fe05c662967ec8ddf5e",
              "@type": [
                "http://www.w3.org/ns/dcat#Distribution"
              ],
              "http://purl.org/dc/terms/description": [
                {
                  "@language": "cs",
                  "@value": ""
                }
              ],
              "http://purl.org/dc/terms/format": [
                {
                  "@id": "http://publications.europa.eu/resource/authority/file-type/ZIP"
                }
              ],
              "http://purl.org/dc/terms/title": [
                {
                  "@language": "cs",
                  "@value": "upplzenhlavni (PNG)"
                }
              ],
              "http://www.w3.org/ns/dcat#accessURL": [
                {
                  "@id": "https://gis.plzen.eu/opendata/upplzenhlavni_PNG.zip"
                }
              ],
              "http://www.w3.org/ns/dcat#downloadURL": [
                {
                  "@id": "https://gis.plzen.eu/opendata/upplzenhlavni_PNG.zip"
                }
              ],
              "http://www.w3.org/ns/dcat#mediaType": [
                {
                  "@id": "http://www.iana.org/assignments/media-types/application/zip"
                }
              ],
              "https://data.gov.cz/slovník/nkod/mediaType": [
                {
                  "@value": "zip (PNG)"
                }
              ],
              "https://data.gov.cz/slovník/nkod/typ-úložiště-datové-sady/typÚložiště": [
                {
                  "@id": "https://data.gov.cz/slovník/nkod/typ-úložiště-datové-sady/Web"
                }
              ]
            }];
          break;
        case "https://data.gov.cz/zdroj/datové-sady/http---vdb.czso.cz-pll-eweb-package_show-id-290038r05/distribuce/522dc9728c20f84c2b9fc9607b82e1d9":
          jsonld = [
            {
              "@id": "http://www.iana.org/assignments/media-types/application/zip",
              "@type": "http://purl.org/dc/terms/MediaTypeOrExtent",
              "http://purl.org/dc/terms/title": "application/zip"
            },
            {
              "@id": "https://data.gov.cz/zdroj/datové-sady/http---vdb.czso.cz-pll-eweb-package_show-id-290038r05/distribuce/522dc9728c20f84c2b9fc9607b82e1d9",
              "@type": "http://www.w3.org/ns/dcat#Distribution",
              "http://purl.org/dc/terms/conformsTo": {
                "@id": "https://www.czso.cz/documents/62353418/93789313/290038-18schema2004.json"
              },
              "http://purl.org/dc/terms/description": {
                "@language": "cs",
                "@value": "Datová sada obsahuje statistické údaje o počtech cizinců (bez azylantů, s pobytem přechodným, dlouhodobým, pobytem trvalým a dlouhodobým vízem) v České republice, a v členění podle pohlaví, pětiletých věkových skupin a státního občanství cizince. Údaje jsou k dispozici za okresy České republiky. Připraveny jsou rovněž úhrny za Českou republiku, všechna státní občanství, pohlaví i věkové skupiny."
              },
              "http://purl.org/dc/terms/format": {
                "@id": "http://publications.europa.eu/resource/authority/file-type/ZIP"
              },
              "http://purl.org/dc/terms/title": {
                "@language": "cs",
                "@value": "Data za rok 2004"
              },
              "http://www.w3.org/ns/dcat#accessURL": {
                "@id": "https://www.czso.cz/documents/62353418/93789313/290038-18data2004.zip"
              },
              "http://www.w3.org/ns/dcat#downloadURL": {
                "@id": "https://www.czso.cz/documents/62353418/93789313/290038-18data2004.zip"
              },
              "http://www.w3.org/ns/dcat#mediaType": {
                "@id": "http://www.iana.org/assignments/media-types/application/zip"
              },
              "https://data.gov.cz/slovník/nkod/mediaType": "application/zip",
              "https://data.gov.cz/slovník/nkod/typ-úložiště-datové-sady/typÚložiště": {
                "@id": "https://data.gov.cz/slovník/nkod/typ-úložiště-datové-sady/Web"
              },
              "https://data.gov.cz/slovník/podmínky-užití/specifikace": {
                "@id": "https://data.gov.cz/zdroj/datové-sady/http---vdb.czso.cz-pll-eweb-package_show-id-290038r05/distribuce/522dc9728c20f84c2b9fc9607b82e1d9/podmínky-užití"
              }
            },
            {
              "@id": "https://data.gov.cz/zdroj/datové-sady/http---vdb.czso.cz-pll-eweb-package_show-id-290038r05/distribuce/522dc9728c20f84c2b9fc9607b82e1d9/podmínky-užití",
              "@type": "https://data.gov.cz/slovník/podmínky-užití/Specifikace",
              "https://data.gov.cz/slovník/podmínky-užití/autorské-dílo": {
                "@id": "https://data.gov.cz/podmínky-užití/neobsahuje-autorská-díla/"
              },
              "https://data.gov.cz/slovník/podmínky-užití/databáze-chráněná-zvláštními-právy": {
                "@id": "https://data.gov.cz/podmínky-užití/není-chráněna-zvláštním-právem-pořizovatele-databáze/"
              },
              "https://data.gov.cz/slovník/podmínky-užití/databáze-jako-autorské-dílo": {
                "@id": "https://data.gov.cz/podmínky-užití/není-autorskoprávně-chráněnou-databází/"
              },
              "https://data.gov.cz/slovník/podmínky-užití/osobní-údaje": {
                "@id": "https://data.gov.cz/podmínky-užití/neobsahuje-osobní-údaje/"
              }
            }
          ];
          break;
      }

      return Promise.resolve({"jsonld": jsonld});
    },
    "fetchPublisherList": (language) => {
      return Promise.resolve({
        "jsonld": [
          {
            "@id": "http://localhost/publisher/000",
            "@type": ["http://schema.org/Organization"],
            "http://www.w3.org/2004/02/skos/core#prefLabel": "Úřad vlády České republiky",
            "http://dcat-ap.linkedpipes.com/datasetCount": 12,
          },
          {
            "@id": "http://localhost/publisher/001",
            "@type": ["http://schema.org/Organization"],
            "http://www.w3.org/2004/02/skos/core#prefLabel": "Ministerstvo financí",
            "http://dcat-ap.linkedpipes.com/datasetCount": 13,
          },
          {
            "@id": "http://localhost/publisher/002",
            "@type": ["http://schema.org/Organization"],
            "http://www.w3.org/2004/02/skos/core#prefLabel": "Česká správa sociálního zabezpečení",
            "http://dcat-ap.linkedpipes.com/datasetCount": 2,
          },
          {
            "@id": "http://localhost/publisher/003",
            "@type": ["http://schema.org/Organization"],
            "http://www.w3.org/2004/02/skos/core#prefLabel": [
              {
                "@language": "cs",
                "@value": "Ministerstvo vnitra",
              }, {
                "@language": "en",
                "@value": "Ministry of interior",
              },
            ],
            "http://dcat-ap.linkedpipes.com/datasetCount": 120,
          },
          {
            "@id": "http://localhost/publisher/004",
            "@type": ["http://schema.org/Organization"],
            "http://www.w3.org/2004/02/skos/core#prefLabel": "Ministerstvo zemědělství",
            "http://dcat-ap.linkedpipes.com/datasetCount": 32,
          },
          {
            "@id": "http://localhost/publisher/005",
            "@type": ["http://schema.org/Organization"],
            "http://www.w3.org/2004/02/skos/core#prefLabel": "Česká obchodní inspekce",
            "http://dcat-ap.linkedpipes.com/datasetCount": 87,
          },
          {
            "@id": "http://localhost/publisher/006",
            "@type": ["http://schema.org/Organization"],
            "http://www.w3.org/2004/02/skos/core#prefLabel": "Ministerstvo školství, mládeže a tělovýchovy",
            "http://dcat-ap.linkedpipes.com/datasetCount": 25,
          }
        ]
      });
    },
    "fetchKeywordList": (language) => {
      return Promise.resolve({
        "jsonld": [
          {
            "@id": "http://localhost/keyword/000",
            "@type": ["http://dcat-ap.linkedpipes.com/Keyword"],
            "http://www.w3.org/2004/02/skos/core#prefLabel": {
              "@language": "cs",
              "@value": "úřad"
            },
            "http://dcat-ap.linkedpipes.com/usedByPublishersCount": 1
          },
          {
            "@id": "http://localhost/keyword/001",
            "@type": ["http://dcat-ap.linkedpipes.com/Keyword"],
            "http://dcat-ap.linkedpipes.com/usedByPublishersCount": 4
          }
        ]
      });
    },
    "fetchLabel": (language, iri) => {
      let jsonld: JsonLdEntity[] = [];
      switch (iri) {
        case "http://format/ZIP":
          jsonld = [
            {
              "@id": "http://format/ZIP",
              "http://www.w3.org/2004/02/skos/core#prefLabel": "ZIP",
            },
          ];
          break;
        case "https://data.gov.cz/zdroj/ovm/00845451":
          jsonld = [
            {
              "@id": "https://data.gov.cz/zdroj/ovm/00845451",
              "http://www.w3.org/2004/02/skos/core#prefLabel": "Statutární město Ostrava",
            },
          ];
          break;
        case "https://data.gov.cz/zdroj/ovm/00075370":
          jsonld = [
            {
              "@id": "https://data.gov.cz/zdroj/ovm/00075370",
              "http://www.w3.org/2004/02/skos/core#prefLabel": "Statutární město Plzeň",
            },
          ];
          break;
        case "https://data.gov.cz/zdroj/ovm/44992785":
          jsonld = [
            {
              "@id": "https://data.gov.cz/zdroj/ovm/44992785",
              "http://www.w3.org/2004/02/skos/core#prefLabel": "Statutární město Brno ",
            },
          ];
          break;
        case "http://localhost/keyword/001":
          jsonld = [
            {
              "@id": "http://localhost/keyword/001",
              "http://www.w3.org/2004/02/skos/core#prefLabel": "data",
            },
          ];
          break;
        case "https://data.gov.cz/zdroj/ovm/00006599":
          jsonld = [
            {
              "@id": "https://data.gov.cz/zdroj/ovm/00006599",
              "http://www.w3.org/2004/02/skos/core#prefLabel": "Úřad vlády České republiky",
            }
          ];
          break;
        case "https://data.gov.cz/zdroj/ovm/48135097":
          jsonld = [
            {
              "@id": "https://data.gov.cz/zdroj/ovm/48135097",
              "http://www.w3.org/2004/02/skos/core#prefLabel": "Úřad průmyslového vlastnictví",
            }
          ];
          break;
        default:
          break;
      }
      return Promise.resolve({"jsonld": jsonld});
    },
    "fetchInitialData": (language) => {
      return Promise.resolve({
        "jsonld": [
          {
            "@id": "https://data.gov.cz/zdroj/ovm/00268810",
            "http://www.w3.org/2004/02/skos/core#prefLabel": "Statutární město Hradec Králové",
          },
          {
            "@id": "https://data.gov.cz/zdroj/ovm/70890749",
            "http://www.w3.org/2004/02/skos/core#prefLabel": [{
              "@language": "cs",
              "@value": "Kraj Vysočina"
            }, {
              "@language": "en",
              "@value": "The Vysočina region"
            }],
          },
          {
            "@id": "http://publications.europa.eu/resource/authority/frequency/ANNUAL",
            "http://www.w3.org/2004/02/skos/core#prefLabel": "roční",
          },
          {
            "@id": "https://linked.cuzk.cz/resource/ruian/stat/1",
            "http://www.w3.org/2004/02/skos/core#prefLabel": "Česká Republika",
          }
        ]
      });
    },
    "fetchQualityDataset": (language, iri) => {
      return Promise.resolve({
        "jsonld": [
          {
            "@id": "https://dev.nkod.opendata.cz/zdroj/datová-kvalita/pozorování/metrikaDostupnostiDokumentace/2019-08-06T15:15:00/http---data.mmr.cz-api-3-action-package_show-id-seznam-projektu-operaci-esif",
            "@type": "http://www.w3.org/ns/dqv#QualityMeasurement",
            "http://www.w3.org/ns/dqv#computedOn": {
              "@id": "https://data.gov.cz/zdroj/datové-sady/http---vdb.czso.cz-pll-eweb-package_show-id-290038r05"
            },
            "http://www.w3.org/ns/dqv#isMeasurementOf": {
              "@id": "https://data.gov.cz/zdroj/datová-kvalita/metriky/metrikaDostupnostiDokumentace"
            },
            "http://www.w3.org/ns/dqv#value": true,
            "http://purl.org/linked-data/sdmx/2009/dimension#refPeriod": {
              "@id": "http://reference.data.gov.uk/id/gregorian-instant/2019-08-06T15:15:00"
            }
          }
        ]
      })
    },
    "fetchQualityDistribution": (language, iri) => {
      let jsonld: JsonLdEntity[] = [];
      switch (iri) {
        case "https://data.gov.cz/zdroj/datové-sady/https---opendata.plzen.eu-api-3-action-package_show-id-gis-rastrovy-podklad-uzemni-plan-plzen-2-hlavni-vykres/distribuce/6998dfea40f62fe05c662967ec8ddf5e":
          jsonld = [
            {
              "@id": "https://dev.nkod.opendata.cz/zdroj/datová-kvalita/pozorování/metrikaDostupnostiDownloadURL/2019-08-06T15:14:58/https://data.gov.cz/zdroj/datové-sady/https---opendata.plzen.eu-api-3-action-package_show-id-gis-rastrovy-podklad-uzemni-plan-plzen-2-hlavni-vykres/distribuce/6998dfea40f62fe05c662967ec8ddf5e",
              "@type": "http://www.w3.org/ns/dqv#QualityMeasurement",
              "http://www.w3.org/ns/dqv#computedOn": {"@id": "https://data.gov.cz/zdroj/datové-sady/https---opendata.plzen.eu-api-3-action-package_show-id-gis-rastrovy-podklad-uzemni-plan-plzen-2-hlavni-vykres/distribuce/6998dfea40f62fe05c662967ec8ddf5e"},
              "http://www.w3.org/ns/dqv#isMeasurementOf": {"@id": "https://data.gov.cz/zdroj/datová-kvalita/metriky/metrikaDostupnostiDownloadURL"},
              "http://www.w3.org/ns/dqv#value": true,
              "http://purl.org/linked-data/sdmx/2009/dimension#refPeriod": {"@id": "http://reference.data.gov.uk/id/gregorian-instant/2019-08-06T15:14:58"}
            },
            {
              "@id": "https://dev.nkod.opendata.cz/zdroj/datová-kvalita/pozorování/metrikaSprávnostiMediaTypu/2019-08-06T15:15:02/https://data.gov.cz/zdroj/datové-sady/https---opendata.plzen.eu-api-3-action-package_show-id-gis-rastrovy-podklad-uzemni-plan-plzen-2-hlavni-vykres/distribuce/6998dfea40f62fe05c662967ec8ddf5e",
              "@type": "http://www.w3.org/ns/dqv#QualityMeasurement",
              "http://www.w3.org/ns/dqv#computedOn": {"@id": "https://data.gov.cz/zdroj/datové-sady/https---opendata.plzen.eu-api-3-action-package_show-id-gis-rastrovy-podklad-uzemni-plan-plzen-2-hlavni-vykres/distribuce/6998dfea40f62fe05c662967ec8ddf5e"},
              "http://www.w3.org/ns/dqv#isMeasurementOf": {"@id": "https://data.gov.cz/zdroj/datová-kvalita/metriky/metrikaSprávnostiMediaTypu"},
              "http://www.w3.org/ns/dqv#value": false,
              "http://www.w3.org/2004/02/skos/core#note": "NKOD: application/zip Server: application/x-zip-compressed",
              "http://purl.org/linked-data/sdmx/2009/dimension#refPeriod": {"@id": "http://reference.data.gov.uk/id/gregorian-instant/2019-08-06T15:15:02"}
            }
          ];
          break;
        case "https://data.gov.cz/zdroj/datové-sady/http---vdb.czso.cz-pll-eweb-package_show-id-290038r05/distribuce/522dc9728c20f84c2b9fc9607b82e1d9":
          jsonld = [
            {
              "@id": "https://dev.nkod.opendata.cz/zdroj/datová-kvalita/pozorování/metrikaDostupnostiDownloadURL/2019-08-06T15:14:58/https://data.gov.cz/zdroj/datové-sady/https---opendata.plzen.eu-api-3-action-package_show-id-gis-rastrovy-podklad-uzemni-plan-plzen-2-hlavni-vykres/distribuce/237261cc1648ec65891e29ac6949890f",
              "@type": "http://www.w3.org/ns/dqv#QualityMeasurement",
              "http://www.w3.org/ns/dqv#computedOn": {"@id": "https://data.gov.cz/zdroj/datové-sady/https---opendata.plzen.eu-api-3-action-package_show-id-gis-rastrovy-podklad-uzemni-plan-plzen-2-hlavni-vykres/distribuce/237261cc1648ec65891e29ac6949890f"},
              "http://www.w3.org/ns/dqv#isMeasurementOf": {"@id": "https://data.gov.cz/zdroj/datová-kvalita/metriky/metrikaDostupnostiDownloadURL"},
              "http://www.w3.org/ns/dqv#value": true,
              "http://purl.org/linked-data/sdmx/2009/dimension#refPeriod": {"@id": "http://reference.data.gov.uk/id/gregorian-instant/2019-08-06T15:14:58"}
            }
          ];
          break;
        default:
          break;
      }
      return Promise.resolve({"jsonld": jsonld});
    },
    "fetchQualityPublisherList": (language) => {
      return Promise.resolve({
        "jsonld": [
          {
            "@id": "http://localhost/publisher/004",
            "@type": "https://data.gov.cz/slovník/nkod/Vzorn\u00FDPoskytovatel",
          }
        ]
      });
    },
    "fetchCatalogList": (language) => {
      return Promise.resolve({
          "jsonld": [
            {
              "@id": "_:b2",
              "http://xmlns.com/foaf/0.1/email": "opendata@kr-vysocina.cz",
              "http://xmlns.com/foaf/0.1/name": "Jiří Hadámek"
            },
            {
              "@id": "_:b3",
              "http://xmlns.com/foaf/0.1/email": "sp@mmhk.cz",
            },
            {
              "@id": "_:b4",
              "http://xmlns.com/foaf/0.1/email": "opendata@vlada.cz",
              "http://xmlns.com/foaf/0.1/name": "Stanislav Volčík"
            },
            {
              "@id": "_:b5",
              "http://xmlns.com/foaf/0.1/email": "lhyks@upv.cz",
              "http://xmlns.com/foaf/0.1/name": "Lukáš Hykš"
            },
            {
              "@id": "https://data.gov.cz/zdroj/lokální-katalogy/HRADKRAL/37020675",
              "@type": "https://data.gov.cz/slovník/nkod/CkanApiLkod",
              "http://purl.org/dc/terms/publisher": {"@id": "https://data.gov.cz/zdroj/ovm/00268810"},
              "http://purl.org/dc/terms/title": "Statutární město Hradec Králové - otevřená data",
              "http://www.w3.org/ns/dcat#contactPoint": {
                "@id": "_:b3"
              },
              "http://www.w3.org/ns/dcat#endpointURL": "http://datahub.io/api/3/action/organization_show?id=statutarni-mesto-hradec-kralove"
            },
            {
              "@id": "https://data.gov.cz/zdroj/lokální-katalogy/KVYSOCINA/1889509",
              "@type": "https://data.gov.cz/slovník/nkod/CkanApiLkod",
              "http://purl.org/dc/terms/publisher": {"@id": "https://data.gov.cz/zdroj/ovm/70890749"},
              "http://purl.org/dc/terms/title": [{
                "@language": "cs",
                "@value": "Otevřená data Kraje Vysočina"
              }, {
                "@language": "en",
                "@value": "Open data of the Vysočina Region"
              }],
              "http://www.w3.org/ns/dcat#contactPoint": {
                "@id": "_:b2"
              },
              "http://www.w3.org/ns/dcat#endpointURL": "http://opendata.kr-vysocina.cz/api/3/action/package_list"
            },
            {
              "@id": "https://data.gov.cz/zdroj/lokální-katalogy/UPVlstnctv/712314686",
              "@type": "https://data.gov.cz/slovník/nkod/CkanApiLkod",
              "http://purl.org/dc/terms/publisher": {"@id": "https://data.gov.cz/zdroj/ovm/48135097"},
              "http://purl.org/dc/terms/title": "Úřad průmyslového vlastnictví - otevřená data",
              "http://www.w3.org/ns/dcat#contactPoint": {
                "@id": "_:b5"
              },
              "http://www.w3.org/ns/dcat#endpointURL": "https://isdv.upv.cz/opendata/upv/package_list"
            },
            {
              "@id": "https://data.gov.cz/zdroj/lokální-katalogy/UVladyCR/248554061",
              "@type": "https://data.gov.cz/slovník/nkod/CkanApiLkod",
              "http://purl.org/dc/terms/publisher": {"@id": "https://data.gov.cz/zdroj/ovm/00006599"},
              "http://purl.org/dc/terms/title": "Otevřená data Úřad vlády ČR",
              "http://www.w3.org/ns/dcat#contactPoint": {
                "@id": "_:b4"
              },
              "http://www.w3.org/ns/dcat#endpointURL": "https://www.vlada.cz/scripts/modules/otevrena_data/package_list"
            }]
        }
      );
    }
  }
}
