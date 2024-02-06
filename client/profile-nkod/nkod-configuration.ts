interface NkodConfiguration {

  dereferenceUrlPrefix: string;

  yasguiUrl: string;

  yasguiDefaultQuery: string;

  dcatApFormsUrl: string;

  dashboardsUrlTemplate: string;

  dashboardsDetailedUrlTemplate: string;

  classPropertiesUrlTemplate: string

  applicationsUrl: string;

  applicationsFormUrl: string;

  suggestionsFormUrl: string;

}

declare var CONFIGURATION: NkodConfiguration;

export default CONFIGURATION;
