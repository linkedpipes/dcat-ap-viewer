# LinkedPipes DCAT-AP Viewer

This is a native DCAT-AP v1.1 catalog viewer. 
It is originally developed for OpenData.cz projects, however, it is completely open-source and resuable. 
It addresses the most painful disadvantages of CKAN when it comes to representing DCAT compatible data such as
- native [DCAT-AP v1.1](https://joinup.ec.europa.eu/release/dcat-ap-v11) input
- handles large numbers of distributions of a single dataset
- handles licenses attached to distributions
- supports [EU MDR NAL](http://publications.europa.eu/mdr/authority/) codelists

## Requirements
- [Node.js] & npm
- [Apache Solr] 7
- [Apache CouchDB] 2.1.1

### Requirements for data preparation
- [LinkedPipes ETL], the [preparation pipeline] and the [codelist pipeline]

## Installation

[Install Solr](https://lucene.apache.org/solr/guide/7_3/installing-solr.html). 
It will contain the search index. 
For instance, you may proceed like this:
- [Download Apache Solr](http://lucene.apache.org/solr/) - e.g. ```solr-7.3.0.tgz```
- Extract the service installer ```tar xzf solr-7.3.0.tgz solr-7.3.0/bin/install_solr_service.sh --strip-components=2```
- Run the service installer ```sudo bash ./install_solr_service.sh solr-7.3.0.tgz```
- Create Solr core ```sudo -u solr /opt/solr/bin/solr create -c dcat-ap-viewer```
- Prepare Solr schema:
```
curl http://localhost:8983/solr/dcat-ap-viewer/schema -X POST -H 'Content-type:application/json' --data-binary '{
    "add-field" : { "name" : "iri", "type" : "string" , "indexed" : false },
    "add-field" : { "name" : "modified", "type" : "pdate", "docValues" : true , "multiValued" : false},
    "add-field" : { "name" : "issued", "type" : "pdate", "docValues" : true },
    "add-field" : { "name" : "accrualPeriodicity", "type" : "string" },
    "add-field" : { "name" : "description", "type" : "string" },
    "add-field" : { "name" : "publisher", "type" : "string" , "indexed" : false },
    "add-field" : { "name" : "publisherName", "type" : "string" },
    "add-field" : { "name" : "title", "type" : "string", "docValues" : true },
    "add-field" : { "name" : "format", "type" : "strings", "indexed" : false },
    "add-field" : { "name" : "formatName", "type" : "strings" },
    "add-field" : { "name" : "license", "type" : "strings", "indexed" : false },
    "add-field" : { "name" : "keyword", "type" : "strings" },
    "add-copy-field" : { "source" : "description", "dest" : "_text_" },
    "add-copy-field" : { "source" : "title", "dest" : "_text_" },
    "add-copy-field" : { "source" : "keyword", "dest" : "_text_" },
    "add-field" : { "name" : "temporal-start", "type" : "pdate", "docValues" : true },
    "add-field" : { "name" : "temporal-end", "type" : "pdate", "docValues" : true },
    "add-field" : { "name" : "spatial", "type" : "string" }
}'
```
- And then:
```
curl http://localhost:8983/solr/dcat-ap-viewer/config -H 'Content-type:application/json' -d'{
    "set-property" : {"requestDispatcher.requestParsers.enableRemoteStreaming":true},
    "set-property" : {"requestDispatcher.requestParsers.enableStreamBody":true}
}'
```

Install [Apache CouchDB], e.g. via a package manager.
It will contain the datasets, distributions and, optionally, the code list labels.

Install LinkedPipes DCAT-AP viewer
- Clone the repository
- Install dependencies:
```
npm install
```
- Copy and edit the configuration file: ```cp configuration.properties.sample configuration.properties```

Load the data
- Install [LinkedPipes ETL] and import, configure and run the [preparation pipeline]. It has the DCAT-AP catalog (its RDF representation) on the input, this is where you provide your DCAT-AP dump. The pipeline assumes that Solr is running on ```localhost:8983``` and CouchDB is running on ```localhost:5984```.
- To enable support for the European Metadata Registry Named Authority Lists (EU MDR NALs) linked from DCAT-AP records, configure and run the [codelist pipeline]. It will populate the Apache CouchDB instance with the codelists.

## Running DCAT-AP Viewer
```
node server -configFileLocation=configuration.properties
```

[Node.js]: <https://nodejs.org>
[Apache Solr]: <http://lucene.apache.org/solr/>
[Apache CouchDB]: <http://couchdb.apache.org/>
[LinkedPipes ETL]: <https://etl.linkedpipes.com>
[preparation pipeline]: <https://raw.githubusercontent.com/linkedpipes/dcat-ap-viewer/develop/pipeline/dcatap2lpdav.jsonld>
[codelist pipeline]: <https://raw.githubusercontent.com/linkedpipes/dcat-ap-viewer/develop/pipeline/eumdrnals2couchdb.jsonld>
