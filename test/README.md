# Integration tests
Test in subdirectories of this directory requires additional services running.
The tests covers three main areas:
 * user interface
 * API
 * Solr

## User interface
Tests in this directory requires running dcat-ap-viewer instance.
Use ```npm run integration-test``` command to run them. 
Test are designed to run with the ```nkod``` profile.
Their aim is to test basic features and interactions with user interface.
They assume running on test data (```test``` provider.)

## API

## Solr
These test are design to make sure that queries that we utilize to 
search in Solr are still functional - i.e. regression testing.
