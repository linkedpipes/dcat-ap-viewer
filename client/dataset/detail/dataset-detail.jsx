import React from "react";
import {selectLabel, selectString} from "../../app-services/labels";
import {Link} from "react-router";
import DatasetPropertyTable from "./dataset-property-table";
import TagLine from "app-components/tag-line";

export class DatasetDetail extends React.PureComponent {
    render() {
        const {dataset, publisherUrl, labels} = this.props;
        const title = selectLabel(labels, this.props.dataset);

        const keywordsLabels = selectString(labels, dataset.keywords);

        return (
            <div>
                <div style={{"marginTop": "2em"}}>
                    <h1>{title}</h1>
                    <h2>
                        <Link to={publisherUrl}>
                            {selectLabel(labels, dataset.publisher)}
                        </Link>
                    </h2>
                    <p>{selectString(labels, dataset.description)}</p>
                    <TagLine values={keywordsLabels}/>
                </div>
                <div style={{"marginTop": "2em"}}>
                    <DatasetPropertyTable dataset={dataset} labels={labels}/>
                </div>
            </div>
        )
    }
}