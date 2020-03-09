import React, {useState} from "react";
import {PropTypes} from "prop-types";
import Paginator from "../../user-iterface/paginator";
import {register, ELEMENT_DISTRIBUTION_LIST} from "../../../client-api";

function DistributionList({iris, DistributionContainer}) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(4);

  if (iris.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="row">
        {
          selectList(page, pageSize, iris).map((iri) => (
            <DistributionContainer key={iri} iri={iri}/>
          ))
        }
      </div>
      <Paginator
        recordsCount={iris.length}
        pageIndex={page}
        pageSize={pageSize}
        onIndexChange={setPage}
        onSizeChange={setPageSize}
        sizes={[1, 4, 16, 32]}
      />
    </div>
  );
}

DistributionList.propTypes = {
  "iris": PropTypes.arrayOf(PropTypes.string).isRequired,
  "DistributionContainer": PropTypes.object.isRequired,
};

function selectList(page, pageSize, items) {
  const result = [];
  const start = page * pageSize;
  const end = Math.min((page + 1) * pageSize, items.length);
  for (let index = start; index < end; ++index) {
    result.push(items[index]);
  }
  return result;
}

register({
  "name": ELEMENT_DISTRIBUTION_LIST,
  "element": DistributionList,
});
