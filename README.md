# LinkedPipes DCAT-AP Viewer

This is a native DCAT-AP 2.0.1 catalog viewer. 
It is originally developed for OpenData.cz projects, however, it is completely open-source and resuable. 
It addresses the most painful disadvantages of CKAN when it comes to representing DCAT compatible data such as
- native [DCAT-AP 2.0.1] input
- handles large numbers of distributions of a single dataset
- handles licenses attached to distributions
- supports [EU Vocabularies] codelists

## Requirements
- [Node.js] (not 15 ATM) & npm
- [OpenJDK] for Apache Solr, if not dockerized
- [Apache Solr] 8.7 ([Docker](https://hub.docker.com/_/solr/))
- [Apache CouchDB] 2.3 and up ([Docker](https://hub.docker.com/_/couchdb/))

### Requirements for data preparation
- [LinkedPipes ETL], the [preparation pipeline] and the [codelist pipeline]

## Installation
[Install Solr](https://lucene.apache.org/solr/guide/8_7/installing-solr.html) or run in it [Docker](https://hub.docker.com/_/solr/).
It will contain the search index. 
For installation, you may proceed like this:
- Download [Apache Solr] - e.g. ```solr-8.7.0.tgz```
- Extract the service installer ```tar xzf solr-8.7.0.tgz solr-8.7.0/bin/install_solr_service.sh --strip-components=2```
- Run the service installer ```sudo bash ./install_solr_service.sh solr-8.7.0.tgz```

Next, configure Solr like this:
- Create Solr core ```sudo -u solr /opt/solr/bin/solr create -c dcat-ap-viewer```

- Add following to `dcat-ap-viewer/conf/solrconfig.xml` file (adjust the version numbers as necessary) and restart Solr.
```
  <lib path="${solr.install.dir:../../../..}/dist/solr-analysis-extras-8.7.0.jar" />  
  <lib path="${solr.install.dir:../../../..}/contrib/analysis-extras/lib/icu4j-62.1.jar" />  
  <lib path="${solr.install.dir:../../../..}/contrib/analysis-extras/lucene-libs/lucene-analyzers-icu-8.7.0.jar" />
```

- Prepare Solr schema (change locale to your language, the example bellow is for `cs` and `en`):
```
curl http://localhost:8983/solr/dcat-ap-viewer/schema -X POST -H 'Content-type:application/json' --data-binary '{
    "add-field-type" : {
        "name" : "ascii_string",
        "class" : "solr.TextField",
        "positionIncrementGap" : "100",
        "analyzer" : {
            "tokenizer" : { "class" : "solr.WhitespaceTokenizerFactory" },
            "filters" : [
                { 
                    "class" : "solr.LowerCaseFilterFactory" 
                }, { 
                    "class" : "solr.ASCIIFoldingFilterFactory",
                    "preserveOriginal" : "false" 
                }
            ]
        }
    },
    "add-field-type" : {
        "name" : "string_icu_cs",
        "class" : "org.apache.solr.schema.ICUCollationField",
        "locale": "cs",
        "strength" : "primary"
    },    
    "add-field-type" : {
        "name" : "string_icu_en",
        "class" : "org.apache.solr.schema.ICUCollationField",
        "locale": "en",
        "strength" : "primary"
    },
    "add-field" : { "name" : "iri", "type" : "string" , "indexed" : false, "multiValued" : false },
    "add-field" : { "name" : "modified", "type" : "pdate", "multiValued" : false},
    "add-field" : { "name" : "issued", "type" : "pdate", "multiValued" : false },
    "add-field" : { "name" : "accrualPeriodicity", "type" : "string", "multiValued" : false },
    "add-field" : { "name" : "publisher", "type" : "string" , "indexed" : true, "multiValued" : false },
    "add-field" : { "name" : "format", "type" : "strings", "indexed" : true },
    "add-field" : { "name" : "license", "type" : "strings", "indexed" : true },
    "add-field" : { "name" : "theme", "type" : "strings" },
    "add-field" : { "name" : "temporal-start", "type" : "pdate", "docValues" : true, "multiValued" : false },
    "add-field" : { "name" : "temporal-end", "type" : "pdate", "docValues" : true, "multiValued" : false },
    "add-field" : { "name" : "spatial", "type" : "strings" },
    "add-field" : { "name" : "isPartOf", "type" : "string" , "indexed" : true, "multiValued" : false },

    "add-field" : { "name" : "description_cs", "type" : "string", "multiValued" : false },
    "add-field" : { "name" : "keyword_cs", "type" : "strings" },
    "add-field" : { "name" : "title_cs", "type" : "string", "multiValued" : false },
    "add-field" : { "name" : "title_cs_sort", "type" : "string_icu_cs", "docValues" : true, "multiValued" : false },
    "add-field" : { "name" : "title_cs_query", "type" : "ascii_string", "multiValued" : false },
    "add-copy-field" : { "source" : "title_cs_sort", "dest" : "title_cs_query" },

    "add-field" : { "name" : "description_en", "type" : "string", "multiValued" : false },
    "add-field" : { "name" : "keyword_en", "type" : "strings" },
    "add-field" : { "name" : "title_en", "type" : "string", "multiValued" : false },
    "add-field" : { "name" : "title_en_sort", "type" : "string_icu_en", "docValues" : true, "multiValued" : false },
    "add-field" : { "name" : "title_en_query", "type" : "ascii_string", "multiValued" : false },
    "add-copy-field" : { "source" : "title_en_sort", "dest" : "title_en_query" },

    "add-field" : { "name" : "vdf_codelist", "type" : "boolean", "multiValued" : false },
    "add-field" : { "name" : "vdf_public_data", "type" : "boolean", "multiValued" : false },

    "replace-field" : { "name": "_text_", "type" : "ascii_string", "multiValued" : true, "indexed" : true, "stored" : false },
    "add-copy-field" : { "source" : "title_cs", "dest" : "_text_" },
    "add-copy-field" : { "source" : "title_en", "dest" : "_text_" },
    "add-copy-field" : { "source" : "description_cs", "dest" : "_text_" },
    "add-copy-field" : { "source" : "description_en", "dest" : "_text_" },
    "add-copy-field" : { "source" : "keyword_cs", "dest" : "_text_" },
    "add-copy-field" : { "source" : "keyword_en", "dest" : "_text_" }    
}'
```
- And then:
```
curl http://localhost:8983/solr/dcat-ap-viewer/config -H 'Content-type:application/json' -d'{
    "set-property" : {"requestDispatcher.requestParsers.enableRemoteStreaming":true},
    "set-property" : {"requestDispatcher.requestParsers.enableStreamBody":true}
}'
```

Install [Apache CouchDB], e.g. via a package manager, or run it in [Docker](https://hub.docker.com/_/couchdb/).
It will contain the datasets, distributions and, optionally, the code list labels.

Install LinkedPipes DCAT-AP viewer
- Clone the repository
- Install dependencies:
```
npm install
```
- Copy and edit the configuration file: ```cp configuration-example.yaml configuration.yaml```
  Please refer to the profile of your choice, ```client/profile-lkod``` or ```client/profile-nkod``` , for more information about the configuration.
  

Load the data
- Install [LinkedPipes ETL] and import, configure and run the [preparation pipeline]. It has the DCAT-AP catalog (its RDF representation) on the input, this is where you provide your DCAT-AP dump. The pipeline assumes that Solr is running on ```localhost:8983``` and CouchDB is running on ```localhost:5984```.
- To enable support for the European Metadata Registry Named Authority Lists (EU MDR NALs) linked from DCAT-AP records, configure and run the [codelist pipeline]. It will populate the Apache CouchDB instance with the codelists.

## Running DCAT-AP Viewer
Before the first run the DCAT-AP Viewer client javascript needs to be compiled using command:
```
npm run build
``` 
After the compilation is done the following command can be used to start the server:
```
npm run start
```

[OpenJDK]: <https://jdk.java.net/15/>
[Node.js]: <https://nodejs.org>
[Apache Solr]: <http://lucene.apache.org/solr/>
[Apache CouchDB]: <http://couchdb.apache.org/>
[LinkedPipes ETL]: <https://etl.linkedpipes.com>
[preparation pipeline]: <https://raw.githubusercontent.com/linkedpipes/dcat-ap-viewer/nkod/lp-etl/dcatap2lpdav.jsonld>
[codelist pipeline]: <https://raw.githubusercontent.com/linkedpipes/dcat-ap-viewer/nkod/lp-etl/eumdrnals2couchdb.jsonld>
[DCAT-AP 2.0.1]: <https://joinup.ec.europa.eu/collection/semantic-interoperability-community-semic/solution/dcat-application-profile-data-portals-europe/release/201-0>
[EU Vocabularies]: <https://publications.europa.eu/en/web/eu-vocabularies/controlled-vocabularies>

