import {Literal} from "../jsonld";

interface DatasetMandatory {
  iri: string;
  description: Literal[];
}

interface DatasetRecommended {
  contactPoints: ContactPoint[];
  distributions: (Distribution | DataService)[];
  keywords: Literal[];
  publisher?: string;
  themes: string[];
  datasetThemes: string[];
}

export interface ContactPoint {
  iri: string;
  email?: string;
}

interface DatasetOptional {
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
  temporal: any;
  type: string[];
  modified: string[];
  version: string[];
  versionNotes: string[];
}

interface DatasetDcat2 {
  services: string[];
  temporalResolution?: string;
  spatialResolutionInMeters?: string;
}

/**
 * Properties related to implementation of dataset hierarchy.
 */
interface DatasetHierarchy {
  /**
   * Children datasets.
   */
  datasets: string[];
  /**
   * Parent dataset.
   */
  parentDataset?: string;
}

/**
 * Implementation specific properties.
 */
export interface DatasetCustom {
  rdfType: string[];
  catalog?: string;
  catalogSource?: string;
  lkod?: string;
}

export type Dataset =
  DatasetMandatory
  & DatasetRecommended
  & DatasetOptional
  & DatasetDcat2
  & DatasetHierarchy
  & DatasetCustom;

export enum DistributionType {
  Distribution,
  DataService,
}

interface DistributionMandatory {
  iri: string;
  accessURL?: string;
}

interface DistributionRecommended {
  description: Literal[];
  format?: string;
  license?: string;
}

interface DistributionOptional {
  byteSize?: string;
  checksum: string[];
  documentation: string [];
  downloadURL: string [];
  language: string [];
  conformsTo: string [];
  mediaType?: string;
  issued?: string;
  rights?: string;
  status?: string;
  modified?: string;
}

interface DistributionDcat2 {
  packageFormat?: string;
  compressFormat?: string;
}

/**
 * Properties specific for Czech National Open Data Catalog.
 */
interface DistributionCustom {
  type: DistributionType;
  legal: DistributionLegal;
}

export interface DistributionLegal {
  authorship?: string;
  author: Literal[];
  databaseAuthorship?: string;
  databaseAuthor: Literal[];
  protectedDatabase?: string;
  personalData?: string;
}

export type Distribution =
  DistributionMandatory
  & DistributionRecommended
  & DistributionOptional
  & DistributionDcat2
  & DistributionCustom;

export function isDistribution(content : any): content is Distribution {
  return content.type === DistributionType.Distribution;
}

export type DataService = Distribution & {
  endpointDescription?: string;
  endpointURL?: string;
  dataService: string;
}

export function isDataService(content : any): content is DataService {
  return content.type === DistributionType.DataService;
}

export interface QualityMeasure {
  value: boolean;
  lastCheck?: string;
  measureOf?: string;
  note: Literal[];
}

export class QualityMeasures {

  measures: QualityMeasure[];

  constructor(measures: QualityMeasure[]) {
    this.measures = measures;
  }

  public getMeasure(measureOf: string): QualityMeasure | undefined {
    for (const measure of this.measures) {
      if (measure.measureOf === measureOf) {
        return measure;
      }
    }
    return undefined;
  }

}
