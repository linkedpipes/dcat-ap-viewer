import React from "react";
import {PropTypes} from "prop-types";
import {
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown
} from "reactstrap";

class Paginator extends React.PureComponent {

    render() {
        const {
            recordsCount,
            pageIndex,
            pageSize,
            onIndexChange,
            onSizeChange,
            sizes
        } = this.props;

        if (recordsCount < pageSize) {
            return null;
        }

        const pages = createPageList(recordsCount, pageIndex, pageSize);
        const pageItems = createPageItemsList(pages, pageIndex, onIndexChange);

        const paginationStyle = {
            "flexWrap": "wrap",
            "display": "flex",
            "listStyle": "none"
        };

        return (
            <div className="row">
                <ul className="col-sm-12 col-md-11" style={paginationStyle}>
                    {pageItems}
                </ul>
                <div className="col-sm-12 col-md-1">
                    <ComboBox
                        activeValue={pageSize}
                        values={sizes}
                        onChange={onSizeChange}/>
                </div>
            </div>
        )
    }
}

Paginator.propTypes = {
    "recordsCount": PropTypes.number.isRequired,
    "pageIndex": PropTypes.number.isRequired,
    "pageSize": PropTypes.number.isRequired,
    "onIndexChange": PropTypes.func.isRequired,
    "onSizeChange": PropTypes.func.isRequired,
    "paginatorLabel": PropTypes.string,
    "sizes": PropTypes.array.isRequired
};

export default Paginator;

function createPageList(elementCount, pageIndex, pageSize) {
    // FORMAT: 1, 2, ... V - 2, V - 1, V, V + 1, V + 2, ... E - 1, E
    if (elementCount <= pageSize) {
        return [];
    }
    const pageCount = Math.ceil(elementCount / pageSize);
    if (pageCount < 9) {
        return createArrayWithRangeOfValues(0, pageCount);
    }
    const output = [0];
    const lastPage = pageCount - 1;
    const rangeValueStart = Math.max(pageIndex - 2, 0);
    const rangeValueEnd = Math.min(pageIndex + 2, lastPage);
    for (let index = rangeValueStart; index <= rangeValueEnd; ++index) {
        appendIfGreaterThenLast(output, index);
    }
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
    if (pages.length === 0) {
        return [];
    }
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
    let className = "page-item pt-2";
    if (isActive) {
        className += " active";
    }
    return (
        <li className={className} key={index}>
            <a className="page-link" onClick={() => onChange(index)}>
                {index + 1}
            </a>
        </li>
    );
}

function createItemForIndexGap(index) {
    return (
        <li className="page-item px-3 pt-2" key={"stub_" + index}>
            ...
        </li>
    )
}

class ComboBox extends React.Component {

    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
    }

    render() {
        const {activeValue, values} = this.props;
        return (
            <UncontrolledDropdown>
                <DropdownToggle caret>
                    {activeValue}
                </DropdownToggle>
                <DropdownMenu>
                    {values.map((value, index) => (
                        <DropdownItem key={index}
                                      onClick={() => this.onSelect(value)}>
                            {value}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }

    onSelect(value) {
        if (this.props.activeValue === value) {
            return;
        }
        this.props.onChange(value);
    }
}

ComboBox.propTypes = {
    "activeValue": PropTypes.number.isRequired,
    "values": PropTypes.arrayOf(PropTypes.number).isRequired,
    "onChange": PropTypes.func.isRequired
};

