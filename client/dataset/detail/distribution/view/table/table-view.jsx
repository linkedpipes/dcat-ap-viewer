import React from "react";
import {Table} from "reactstrap";
import Paginator from "app-components/paginator";
import {getString} from "app/strings";
import {DistributionContainer} from "../../distribution-container";
import {DistributionTableEntry} from "./table-view-entry";

export class DistributionTableView extends React.PureComponent {

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
                            key={iri}
                            iri={iri}
                            component={DistributionTableEntry}/>
                    ))}
                    </tbody>
                </Table>
                <Paginator
                    recordsCount={recordsCount}
                    pageIndex={page}
                    pageSize={pageSize}
                    onIndexChange={setPage}
                    onSizeChange={setPageSize}
                    sizes={[4,20,30,40]}
                />
            </div>
        );
    }

}
