import React from "react";
import {
    selectLabel,
    selectString
} from "@/app-services/labels";

export class DatasetWebPageMetadata extends React.PureComponent {
    render() {
        return (
            <script type="application/ld+json">
                {createJsonLdDescription(this.props.labels, this.props.dataset)}
            </script>
        )
    }
}

function createJsonLdDescription(labels, dataset) {
    let content = '\n{\n' +
        '"@context":"http://schema.org/",\n' +
        '"@type":"Dataset",\n' +
        '"name":"' + selectLabel(labels, dataset) + '",\n' +
        '"description":"' + selectString(dataset["description"]) +
        '",\n' +
        '"url":"' + dataset["@id"] + '"\n';

    if (dataset["catalog"] !== undefined) {
        content += ',"includedInDataCatalog": "' + dataset["catalog"] + '"\n';
    }

    if (dataset["spatial"] !== undefined) {
        content += ',"spatialCoverage":"' + dataset["spatial"]["@id"] + '"\n';
    }

    if (dataset["temporal"] !== undefined) {
        content += ',"temporalCoverage":"' +
            dataset["temporal"]["startDate"] + "/" +
            dataset["temporal"]["endDate"] + '"\n';
    }

    if (dataset["keywords"] !== undefined) {
        const keywords = JSON.stringify(selectString(dataset["keywords"]));
        content += ',"keywords":' + keywords + '\n';
    }

    if (dataset["publisher"] !== undefined) {
        content += ',' +
            '"creator":{\n' +
            ' "@type":"Organization",\n' +
            ' "url": "' + dataset["publisher"]["@id"] + '",\n' +
            ' "name":"' + selectLabel(labels, dataset["publisher"]) + '"\n' +
            ' }\n' +
            '}\n';
    }

    content += '}';

    return content;
}
