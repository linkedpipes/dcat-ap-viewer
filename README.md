# DCAT-AP Viewer

## Requirements
- [Node.js] & npm
- [Apache Solr] 7
- [Apache CouchDB] 2.1.1

## Installation
Install dependencies:
```
npm install
```
You need to copy and edit the configuration file.

Prepare Solr schema before loading the data (here the Solr core is called ```dcat-ap-viewer```:
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
And then:
```
curl http://localhost:8983/solr/dcat-ap-viewer/config -H 'Content-type:application/json' -d'{
    "set-property" : {"requestDispatcher.requestParsers.enableRemoteStreaming":true},
    "set-property" : {"requestDispatcher.requestParsers.enableStreamBody":true}
}'
```
CouchDB needs to contain the datasets, distributions and, optionally, the code list labels.

We do it by using [LinkedPipes ETL] with a custom pipeline, which has the DCAT-AP catalog on the input.
The pipeline is still WIP, so if you are interested to run DCAT-AP Viewer now, please contact us.
We will provide the pipeline and the CouchDB records descriptions shortly.

## Running DCAT-AP Viewer
```
node server -configFileLocation=configuration.properties
```

## Known issues
- Internet Explorer is not supported as it is missing implementation of fetch API

[Node.js]: <https://nodejs.org>
[Apache Solr]: <http://lucene.apache.org/solr/>
[Apache CouchDB]: <http://couchdb.apache.org/>
[LinkedPipes ETL]: <https://etl.linkedpipes.com>
