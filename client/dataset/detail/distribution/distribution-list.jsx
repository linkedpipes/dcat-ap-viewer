import React from "react";
import Paginator from "@/app-ui/paginator";
import {DistributionContainer} from "./distribution-container";
import {PropTypes} from "prop-types";

export default class DistributionList extends React.PureComponent {
  render() {
    const {distributions} = this.props;
    if (distributions.length === 0) {
      return null;
    }
    const {recordsCount, page, pageSize, setPage, setPageSize} = this.props;
    return (
      <div>
        <div className="row">
          {distributions.map((iri) => (
            <DistributionContainer key={iri} iri={iri}/>
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
  "distributions": PropTypes.arrayOf(PropTypes.string).isRequired,
};
