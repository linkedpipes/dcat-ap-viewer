import React from "react";
import {PropTypes} from "prop-types";
import {Pagination, PaginationItem, PaginationLink} from "reactstrap";

const Paginator = ({start, end, value, onChange}) => (
    <Pagination>
        {value != start &&
        <PaginationItem>
            <PaginationLink previous href="#" onClick={() => onChange(start)}/>
        </PaginationItem>
        }
        {(() => {
            const pageReferences = [];
            const indexStart = Math.max(start, value - 2);
            const indexEnd = Math.min(value + 3, end);
            for (let index = indexStart; index != indexEnd; ++index) {
                pageReferences.push((
                    <PaginationItem key={index}>
                        <PaginationLink href="javascript:void(0)"
                                        onClick={() => onChange(index)}>
                            {index + 1}
                        </PaginationLink>
                    </PaginationItem>
                ));
            }
            return pageReferences;
        })()}
        {end != value &&
        <PaginationItem>
            <PaginationLink next href="#" onClick={() => onChange(end - 1)}/>
        </PaginationItem>
        }
    </Pagination>
);

Paginator.propTypes = {
    "start": PropTypes.number.isRequired,
    "end": PropTypes.number.isRequired,
    "value": PropTypes.number.isRequired,
    "onChange": PropTypes.func.isRequired
};

export default Paginator;