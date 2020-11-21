import {Literal} from "./primitives";

export enum DistributionType {
  Distribution = "Distribution",
  DataService = "DataService",
}

export interface DcatApDistribution {

  iri: string;

  title?: Literal;

  accessURL?: string;

  description?: Literal;

  format?: string;

  license?: string;

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

  packageFormat?: string;

  compressFormat?: string;

}

export interface NkodDistribution extends DcatApDistribution {

  type: DistributionType;

  legal?: DistributionLegal;

}

export interface DistributionLegal {

  authorship?: string;

  author?: Literal;

  databaseAuthorship?: string;

  databaseAuthor?: Literal;

  protectedDatabase?: string;

  personalData?: string;

}

export interface NkodDataService extends NkodDistribution {

  dataService: string;

  dataServiceTitle?: Literal;

  endpointDescription?: string;

  endpointURL?: string;

  dataServiceConformsTo: string [];

}
