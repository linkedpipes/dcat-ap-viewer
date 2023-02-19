import {Literal} from "./primitives";
import {ContactPoint} from "./contact-point";

export interface DcatApDataset {

  // Mandatory.

  iri: string;

  title?: Literal;

  description?: Literal;

  // Recommended.

  contactPoints: ContactPoint[];

  distributions: string[];

  keywords: Literal[];

  publisher?: string;

  // Optional.

  themes: string[];

  datasetThemes: string[];

  accessRights: string[];

  conformsTo: string[];

  documentation: string[];

  frequency?: string;

  hasVersion: string[];

  identifier: string[];

  isVersionOf: string[];

  landingPage: string[];

  language: string[];

  otherIdentifier: string[];

  provenance: string[];

  relation: string[];

  issued: string[];

  sample: string[];

  source: string[];

  spatial: string[];

  spatialResolutionInMeters?: number;

  temporal?: Temporal;

  temporalResolution?: string;

  type: string[];

  modified: string[];

  version: string[];

  versionNotes: string[];

}

interface Temporal {

  startDate?: string;

  endDate?: string;

}

/**
 * Properties related to implementation.
 */
export interface NkodDataset extends DcatApDataset {

  datasets: string[];

  parentDataset?: string;

  catalog?: string;

  catalogSource?: string;

  lkod?: string;

  isFromForm: boolean;

  isFromCatalog: boolean;

  semanticThemes: string[];

  isCodelist: boolean;

  isFromVDF: boolean;

}
