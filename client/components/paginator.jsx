import React from "react";
import {PropTypes} from "prop-types";
import {Pagination, PaginationItem, PaginationLink} from "reactstrap";

const Paginator = ({start, end, value, onChange}) => {
    if (start === end || start + 1 === end) {
        return null;
    }
    const pages = createPageList(start, end, value);
    const pageItems = createPageItemsList(pages, value, onChange);
    return (
        <Pagination>
            {pageItems}
        </Pagination>
    )
};

function createPageList(start, end, value) {
    // FORMAT: 1, 2, ... V - 2, V - 1, V, V + 1, V + 2, ... E - 1, E
    if (end - start < 9) {
        return createArrayWithRangeOfValues(start, end);
    }
    const output = [0, 1];
    const lastPage = end - 1;
    const rangeValueStart = Math.max(value - 2, start);
    const rangeValueEnd = Math.min(value + 2, lastPage);
    for (let index = rangeValueStart; index <= rangeValueEnd; ++index) {
        appendIfGreaterThenLast(output, index);
    }
    appendIfGreaterThenLast(output, lastPage - 1);
    appendIfGreaterThenLast(output, lastPage);
    return output;
}

function createArrayWithRangeOfValues(start, end) {
    const output = [];
    for (let index = start; index < end; ++index) {
        output.push(index);
    }
    return output;
}

function appendIfGreaterThenLast(array, value) {
    if (array[array.length - 1] < value) {
        array.push(value);
    }
}

function createPageItemsList(pages, active, onChange) {
    const output = [];
    output.push(createPageItem(pages[0], pages[0] == active, onChange));
    for (let index = 1; index < pages.length; ++index) {
        const currentPage = pages[index];
        const expectedCurrentPage = pages[index - 1] + 1;
        const isActive = currentPage == active;
        if (currentPage !== expectedCurrentPage) {
            output.push(createItemForIndexGap(expectedCurrentPage));
        }
        output.push(createPageItem(currentPage, isActive, onChange));
    }
    return output;
}

function createPageItem(index, isActive, onChange) {
    return (
        <PaginationItem active={isActive} key={index}>
            <PaginationLink href="javascript:void(0)"
                            onClick={() => onChange(index)}>
                {index + 1}
            </PaginationLink>
        </PaginationItem>
    )
}

function createItemForIndexGap(index) {
    return (
        <PaginationItem key={"stub_" + index}>
            <div style={{"padding": "0.5rem 0.75rem"}}>
                ...
            </div>
        </PaginationItem>
    )
}

Paginator.propTypes = {
    "start": PropTypes.number.isRequired,
    "end": PropTypes.number.isRequired,
    "value": PropTypes.number.isRequired,
    "onChange": PropTypes.func.isRequired
};

export default Paginator;