import React, {useState} from "react";
import {PropTypes} from "prop-types";
import Part from "./part";
import Paginator from "../user-iterface/paginator";

export default function Parts({distributions}) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(4);

  if (distributions.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="row">
        {selectList(page, pageSize, distributions).map((distribution) => (
          <Part key={distribution.iri} distribution={distribution}/>
        ))}
      </div>
      <Paginator
        recordsCount={distributions.length}
        pageIndex={page}
        pageSize={pageSize}
        defaultPageSize={4}
        onIndexChange={setPage}
        onSizeChange={setPageSize}
        sizes={[1, 4, 16, 32]}
      />
    </div>
  );
}

Parts.propTypes = {
  "distributions": PropTypes.array.isRequired,
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
