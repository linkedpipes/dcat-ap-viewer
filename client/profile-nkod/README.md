# Profile for national open data catalog
This directory contains profile definition for national open data catalog.
This profile is build as an extension to ```profile-lkod```.

## How configure
```
dcat-ap-viewer:
  client:
    profiles:
      - profile-lkod
      - profile-nkod
    page-title-prefix: ""
    page-title-suffix: ""
    default-language: "cs"
    dereference-url-prefix: ""
    dcat-ap-forms-url: "https://example.com/"
```

## Configuration

| Key | Description |
| --- | ----------- |
| page-title-prefix | Prefix used before page title. |
| page-title-suffix | Suffix used after page title. |
| default-language | Used for canonical links and as a default language. |
| dereference-url-prefix | Prefix used before IRIs of referencable entities. |
| dcat-ap-forms-url | URL to running instance of [dcat-ap-forms](https://github.com/linkedpipes/dcat-ap-forms) | 
