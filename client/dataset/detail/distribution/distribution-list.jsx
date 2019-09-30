import React from "react";
import Paginator from "@/app-ui/paginator";
import {DistributionContainer} from "./distribution-container";
import {PropTypes} from "prop-types";

export default class DistributionList extends React.PureComponent {
  render() {
    const {records} = this.props;
    if (records.length === 0) {
      return null;
    }
    const {recordsCount, page, pageSize, setPage, setPageSize} = this.props;
    return (
      <div>
        <div className="row">
          {records.map((record) => (
            <DistributionContainer key={record.iri} record={record}/>
          ))}
        </div>
        <Paginator
          recordsCount={recordsCount}
          pageIndex={page}
          pageSize={pageSize}
          onIndexChange={setPage}
          onSizeChange={setPageSize}
          sizes={[1, 4, 16, 32]}
        />
      </div>
    );
  }
}

DistributionList.propTypes = {
  "setPageSize": PropTypes.func.isRequired,
  "setPage": PropTypes.func.isRequired,
  "recordsCount": PropTypes.number.isRequired,
  "page": PropTypes.number.isRequired,
  "pageSize": PropTypes.number.isRequired,
  "records": PropTypes.arrayOf(PropTypes.object).isRequired,
};
