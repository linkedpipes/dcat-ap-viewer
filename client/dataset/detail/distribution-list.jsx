import React from "react";
import {Table} from "reactstrap";
import Paginator from "../../components/paginator";
import {getString} from "../../application/strings";
import {selectLabel} from "./../../services/labels";
import {isStatusLoading, isStatusFailed} from "./../../services/http-request";

class DistributionRow extends React.Component {

    componentWillMount() {
        const dist = this.props.distribution;
        if (dist == undefined) {
            this.props.fetchDistribution(this.props.iri);
        }
    }

    render() {
        const dist = this.props.distribution;

        // TODO Introduce some general handling of fetching - DAO. Children can be wrapped as a properties.
        if (dist === undefined || isStatusLoading(dist.status)) {
            return (
                <tr>
                    <td colSpan={3}>
                        {getString("s.fetching")}
                    </td>
                </tr>
            )
        } else if (isStatusFailed(dist.status)) {
            return (
                <tr>
                    <td colSpan={3}>
                        {getString("s.fetch_failed")}
                    </td>
                </tr>
            )
        }

        let title = dist.title;
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
            formatLabel = selectLabel(dist.format);
        }

        return (
            <tr>
                <td>
                    <a href={url} className="distribution-link">{title}</a>
                </td>
                <td>
                    {dist.format !== undefined &&
                    <a href={dist.format.iri}>{formatLabel}</a>
                    }
                </td>
                <td>
                    {dist.conformsTo !== undefined &&
                    <a href={dist.conformsTo}>{dist.conformsTo}</a>
                    }
                </td>
                <td>
                    {dist.license !== undefined &&
                    <a href={dist.license}>{dist.license}</a>
                    }
                </td>
            </tr>
        )
    }
}

class DistributionList extends React.Component {

    render() {
        const distributionIris = this.props.keys;
        if (distributionIris === undefined) {
            return (
                <div></div>
            )
        }

        const distributions = this.props.values;
        let rows = [];
        const iterStart = this.props.pageIndex * this.props.pageSize;
        const iterEnd = Math.min(
            (this.props.pageIndex + 1) * this.props.pageSize,
            this.props.keys.length);

        for (let index = iterStart; index < iterEnd; ++index) {
            const key = this.props.keys[index];
            const distribution = distributions[key];
            rows.push((
                <DistributionRow
                    key={key}
                    iri={key}
                    distribution={distribution}
                    fetchDistribution={this.props.fetchDistribution}
                />
            ));
        }

        return (
            <div>
                <h4>{getString("s.distribution")}</h4>
                <Table>
                    <thead>
                    <tr>
                        <th>{getString("s.file")}</th>
                        <th>{getString("s.format")}</th>
                        <th>{getString("s.structure")}</th>
                        <th>{getString("s.licence")}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </Table>
                <Paginator
                    recordsCount={this.props.keys.length}
                    pageIndex={this.props.pageIndex}
                    pageSize={this.props.pageSize}
                    onIndexChange={this.props.setPage}
                    onSizeChange={this.props.setPageSize}
                />
            </div>
        );
    }

}

export default DistributionList;