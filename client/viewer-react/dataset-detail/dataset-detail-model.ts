import { NkodDataset } from "../../data-model/dataset";
import {
    NkodDistribution, NkodDataService,
} from "../../data-model/distribution";
import {QualityMeasures} from "../../data-model/quality";
import {DatasetListItem} from "../../data-api/api-dataset";

interface ResourceStatus {

    loading: boolean;

    failed: boolean;

}

export interface DatasetDetailData extends ResourceStatus {

    dataset: NkodDataset | undefined;

}

export interface DistributionData extends ResourceStatus{

    distribution: NkodDistribution | NkodDataService | undefined

}

export interface QualityData extends ResourceStatus {

    quality: QualityMeasures | undefined;

}

export interface DescendantsData extends ResourceStatus {

    count: number;

    datasets: DatasetListItem[];

}
