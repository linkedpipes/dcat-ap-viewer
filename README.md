# DCAT-AP Viewer

## Requirements
- [Node.js] & npm
- Solr 

## Installation
Install dependencies:
```
npm install
```

You need to copy and edit the configuration file.

Prepare Solr schema before loading the data:
```
curl http://localhost:{solr_port}/solr/{core_name}/schema -X POST -H 'Content-type:application/json' --data-binary '{
    "add-field" : { "name" : "iri", "type" : "string" , "indexed" : false },
    "add-field" : { "name" : "modified", "type" : "tdate", "docValues" : true },
    "add-field" : { "name" : "issued", "type" : "tdate" },
    "add-field" : { "name" : "accrualPeriodicity", "type" : "string" },
    "add-field" : { "name" : "description", "type" : "string" },
    "add-field" : { "name" : "publisher", "type" : "string" , "indexed" : false },
    "add-field" : { "name" : "publisherName", "type" : "string" },
    "add-field" : { "name" : "title", "type" : "string" },
    "add-field" : { "name" : "format", "type" : "strings", "indexed" : false },
    "add-field" : { "name" : "formatName", "type" : "strings" },
    "add-field" : { "name" : "license", "type" : "strings", "indexed" : false },
    "add-field" : { "name" : "keyword", "type" : "strings" },
    "delete-copy-field":{ "source" : "*", "dest" : "_text_" },
    "add-copy-field" : { "source" : "description", "dest" : "_text_" },
    "add-copy-field" : { "source" : "title", "dest" : "_text_" },
    "add-copy-field" : { "source" : "keyword", "dest" : "_text_" }
}'
```

## Running DCAT-AP Viewer
```
node server -configFileLocation=configuration.properties
```

## Known issues
- Internet Explorer is not supported as it is missing implementation of fetch API
