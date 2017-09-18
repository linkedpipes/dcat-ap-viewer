import React from "react";
import {PropTypes} from "prop-types";
import {
    Pagination,
    PaginationItem,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";

const PAGE_SIZES = [10, 20, 40, 80];

class Paginator extends React.Component {

    render() {
        const {
            recordsCount,
            pageIndex,
            pageSize,
            onIndexChange,
            onSizeChange
        } = this.props;

        const pages = createPageList(recordsCount, pageIndex, pageSize);
        const pageItems = createPageItemsList(pages, pageIndex, onIndexChange);
        // TODO Remove current value from the page list.
        return (
            <div>
                { pageItems.length > 0 &&
                    <Pagination style={{float: "left"}}>
                        {pageItems}
                    </Pagination>
                }
                <div style={{float: "right"}}>
                    <ComboBox
                        activeValue={pageSize}
                        values={PAGE_SIZES}
                        onChange={(index) => onSizeChange(PAGE_SIZES[index])}/>
                </div>
                <br/>
                <br/>
            </div>
        )
    }

}

Paginator.propTypes = {
    "recordsCount": PropTypes.number.isRequired,
    "pageIndex": PropTypes.number.isRequired,
    "pageSize": PropTypes.number.isRequired,
    "onIndexChange": PropTypes.func.isRequired,
    "onSizeChange": PropTypes.func.isRequired
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
    const output = [0, 1];
    const lastPage = pageCount - 1;
    const rangeValueStart = Math.max(pageIndex - 2, 0);
    const rangeValueEnd = Math.min(pageIndex + 2, lastPage);
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
    return (
        <PaginationItem active={isActive} key={index}>
            <Button className="page-button" onClick={() => onChange(index)}>
                {index + 1}
            </Button>
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

// TODO Extract to other file.
class ComboBox extends React.Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.state = {"open": false};
    }

    toggle() {
        this.setState({"open": !this.state.open});
    }

    render() {
        const {activeValue, values} = this.props;
        return (
            <ButtonDropdown style={{float: "right"}}
                            isOpen={this.state.open}
                            toggle={this.toggle}
                            dropup>
                <DropdownToggle caret>
                    {activeValue}
                </DropdownToggle>
                <DropdownMenu>
                    {values.map((value, index) => (
                        <DropdownItem key={index} onClick={() => this.onSelect(index)}>
                            {value}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </ButtonDropdown>
        )
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

