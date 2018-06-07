import React from "react";
import {getString} from "app/strings";
import {selectLabel} from "app-services/labels/index";

export class DistributionTableEntry extends React.Component {

    render() {
        if (this.props.isLoading) {
            return (
                <tr>
                    <td colSpan={3}>
                        {getString("s.fetching")}
                    </td>
                </tr>
            )
        }
        const dist = this.props.distribution;
        const labels = this.props.labels;

        let title = selectLabel(labels, dist);
        // TODO Move to helper class.
        if (title === undefined || title.length === 0) {
            title = getString("s.unnamed_distribution");
        }

        // TODO Handle multiple values.
        let url;
        if (dist.downloadURL === undefined || dist.downloadURL.length === 0) {
            if (dist.accessURL === undefined || dist.accessURL.length === 0) {
                // TODO Handle missing URL - ie. invalid data.
                console.log("Invalid data, missing accessURL", dist);
            } else {
                url = dist.accessURL[0];
            }
        } else {
            url = dist.downloadURL[0];
        }

        let formatLabel;
        if (dist.format === undefined) {
            formatLabel = undefined;
        } else {
            formatLabel = selectLabel(labels, dist.format);
        }

        return (
            <tr>
                <td>
                    <a href={url} rel="nofollow" className="distribution-link">
                        {title}
                    </a>
                </td>
                <td>
                    {dist.format !== undefined &&
                    <a href={dist.format.iri} rel="nofollow">{formatLabel}</a>
                    }
                </td>
                <td>
                    {dist.conformsTo !== undefined &&
                    <a href={dist.conformsTo} rel="nofollow">
                        {dist.conformsTo}
                    </a>
                    }
                </td>
                <td>
                    {dist.license !== undefined &&
                    <a href={dist.license} rel="nofollow">{dist.license}</a>
                    }
                </td>
            </tr>
        )
    }
}
