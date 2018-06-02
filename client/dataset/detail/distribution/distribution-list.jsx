import React from "react";
import {Table} from "reactstrap";
import Paginator from "../../../app-components/paginator";
import {getString} from "../../../app/strings";
import {DistributionContainer} from "./entry/distribution-container";
import {Distribution} from "./entry/distribution";

export default class DistributionList extends React.PureComponent {

    render() {
        const {distributions} = this.props;
        if (distributions.length === 0) {
            return null;
        }

        const {recordsCount, page, pageSize, setPage, setPageSize} = this.props;

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
                    {distributions.map((iri) => (
                        <DistributionContainer
                            key={iri} iri={iri} component={Distribution}/>
                    ))}
                    </tbody>
                </Table>
                <Paginator
                    recordsCount={recordsCount}
                    pageIndex={page}
                    pageSize={pageSize}
                    onIndexChange={setPage}
                    onSizeChange={setPageSize}
                />
            </div>
        );
    }

}
