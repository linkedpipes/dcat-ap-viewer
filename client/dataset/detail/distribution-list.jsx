import React from "react";
import {Table} from "reactstrap";
import Paginator from "../../components/paginator";
import {getString} from "../../application/strings";

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
        if (dist === undefined || dist.status === "fetching") {
            return (
                <tr>
                    <td colSpan={3}>
                        {getString("s.fetching")}
                    </td>
                </tr>
            )
        } else if (dist.status === "failed") {
            return (
                <tr>
                    <td colSpan={3}>
                        {getString("s.fetch_failed")}
                    </td>
                </tr>
            )
        }

        let title = dist.title;
        if (title === undefined || title === "") {
            title = getString("s.unnamed_distribution");
        }

        let url;
        if (dist.downloadURL === undefined) {
            url = dist.accessURL;
        } else {
            url = dist.downloadURL;
        }

        let formatLabel;
        if (dist.format === undefined) {
            formatLabel = undefined;
        } else {
            if (dist.format.prefLabel === undefined) {
                formatLabel = dist.format.iri;
            } else {
                formatLabel = dist.format.prefLabel;
            }
        }

        return (
            <tr>
                <td>
                    <a href={url}>{title}</a>
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
        const distributions = this.props.values;

        const pageSize = 10;
        let rows = [];
        const iterStart = this.props.page * pageSize;
        const iterEnd = Math.min(
            (this.props.page + 1) * pageSize,
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

        const pageCount = Math.ceil(this.props.keys.length / pageSize);

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
                    start={0}
                    value={this.props.page}
                    end={pageCount}
                    onChange={this.props.setPage}/>
            </div>
        );
    }

}

export default DistributionList;