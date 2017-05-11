import React from "react";
import {PropTypes} from "prop-types";
import {Pagination, PaginationItem, PaginationLink} from "reactstrap";

// TODO Add active state https://reactstrap.github.io/components/pagination/

// TODO Add dots 1 ... 9 10 11 ... 199

const Paginator = ({start, end, value, onChange}) => {
    if (start === end) {
        return null;
    }
    return (
        <Pagination>
            <PaginationItem active={start == value}>
                <PaginationLink
                    href="javascript:void(0)"
                    onClick={() => onChange(start)}>
                    {start + 1}
                </PaginationLink>
            </PaginationItem>
            {(() => {
                const pageReferences = [];
                const indexStart = Math.max(start + 1, value - 2);
                const indexEnd = Math.min(value + 3, end - 1);
                for (let index = indexStart; index < indexEnd; ++index) {
                    pageReferences.push((
                        <PaginationItem key={index} active={index == value}>
                            <PaginationLink href="javascript:void(0)"
                                            onClick={() => onChange(index)}>
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ));
                }
                return pageReferences;
            })()}
            <PaginationItem active={end == value}>
                <PaginationLink
                    href="javascript:void(0)"
                    onClick={() => onChange(end)}>
                    {end + 1}
                </PaginationLink>
            </PaginationItem>
        </Pagination>
    )
}

Paginator.propTypes = {
    "start": PropTypes.number.isRequired,
    "end": PropTypes.number.isRequired,
    "value": PropTypes.number.isRequired,
    "onChange": PropTypes.func.isRequired
};

export default Paginator;