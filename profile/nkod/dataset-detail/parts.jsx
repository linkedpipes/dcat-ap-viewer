import React, {useState} from "react";
import {PropTypes} from "prop-types";
import Part from "./part";
import Paginator from "../user-iterface/paginator";

export default function Parts({parts}) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(4);

  if (parts.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="row">
        {selectList(page, pageSize, parts).map((part) => (
          <Part key={part.iri} part={part}/>
        ))}
      </div>
      <Paginator
        recordsCount={parts.length}
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
  "parts": PropTypes.array.isRequired,
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
