interface Configuration {

  pageTitlePrefix: string;

  pageTitleSuffix: string;

  /**
   * Used as a prefix for external URLs in the application.
   */
  dereferenceUrlPrefix: string;

  defaultLanguage: string;

}

declare var CONFIGURATION: Configuration;

export default CONFIGURATION;
