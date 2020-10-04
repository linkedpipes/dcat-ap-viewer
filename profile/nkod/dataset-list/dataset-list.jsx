import React, {useMemo} from "react";
import {useDispatch} from "react-redux";
import {Col, Container, Row} from "reactstrap";
import {
  ELEMENT_DATASET_LIST,
  replaceNavigation,
} from "../../../client/dataset-list";
import {
  register,
  getRegisteredElement,
} from "../../client-api";
import {toNavigation} from "./dataset-list-query-service";
import {
  toViewQuery,
} from "./dataset-list-query-service";

const DatasetList = (props) => {
  const dispatch = useDispatch();
  // const status = useSelector(selectDatasetListStatus);
  const viewQuery = useMemo(() => toViewQuery(props.query), [props.query]);
  const updateNavigation =
    (query) => dispatch(replaceNavigation(toNavigation(query)));
  // const previousDatasetQueryRef = useRef();
  // useEffect(() => {
  //   const previousDatasetQuery = previousDatasetQueryRef.current;
  //   previousDatasetQueryRef.current = toDatasetListQuery(state, viewQuery);
  //   console.log(
  //     "props.query", status, "\n",
  //     "dataset:\n",
  //     previousDatasetQuery, "\n",
  //     previousDatasetQueryRef.current, "\n"
  //   );
  //   dispatch(updateDatasets(
  //     previousDatasetQueryRef.current,
  //     previousDatasetQuery)
  //   );
  // }, [viewQuery, state]);
  return datasetListView(updateNavigation, viewQuery);
};

register({
  "name": ELEMENT_DATASET_LIST,
  "element": DatasetList,
});

function datasetListView(updateNavigation, viewQuery) {
  const FacetFilter = getRegisteredElement("app.dataset-list.facets");
  const Query = getRegisteredElement("app.dataset-list.query");
  const View = selectView(viewQuery.view);
  return (
    <Container>
      <Row>
        <Col xs={12} md={3}>
          <FacetFilter
            query={viewQuery}
            onUpdateNavigation={updateNavigation}
          />
        </Col>
        <Col xs={12} md={9}>
          <div className="m-md-1">
            <Query
              query={viewQuery}
              onUpdateNavigation={updateNavigation}
            />
          </div>
          <div className="m-md-1">
            <View
              query={viewQuery}
              onUpdateNavigation={updateNavigation}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

function selectView(view) {
  switch (view) {
  case 1:
    return getRegisteredElement("app.dataset-list.keyword-view");
  case 2:
    return getRegisteredElement("app.dataset-list.theme-view");
  case 0:
  default:
    return getRegisteredElement("app.dataset-list.dataset-view");
  }
}

//
//
//
//
//

// class DatasetListAA extends React.PureComponent {

// render() {
//   if (this.props.error > 0 || !this.props.ready) {
//     return (
//       <Status
//         t={this.props.t}
//         error={this.props.error}
//         ready={this.props.ready}
//       />
//     );
//   }
//   //
//   const query = paramsToViewQuery(this.props.query, this.state);
//   const {FacetFilters, QueryElement} = this;
//   const ViewElement = this.selectViewElement(query.view);
//   return (
//     <Container>
//       <Row>
//         <Col xs={12} md={3}>
//           <FacetFilters
//             t={this.props.t}
//             tLabel={this.props.tLabel}
//             withFacetProps={this.props.withFacetProps}
//             fetchMoreFacet={this.onFetchMoreFacet}
//             toggleFacet={this.onToggleFacet}
//             activeFacet={query}
//             fetchLabels={this.props.fetchLabels}
//           />
//         </Col>
//         <Col xs={12} md={9}>
//           <div className="m-md-1">
//             <QueryElement
//               t={this.props.t}
//               query={query}
//               onSetView={this.onSetView}
//               onSetSearchText={this.onSetSearchText}
//               onClearFilters={this.onClearFilters}
//               onSetTemporal={this.onSetTemporal}
//             />
//           </div>
//           <div className="m-md-1">
//             <ViewElement
//               t={this.props.t}
//               tLabel={this.props.tLabel}
//               query={query}
//               onDatasetsPage={this.onDatasetsPage}
//               onDatasetsPageSize={this.onDatasetsPageSize}
//               onDatasetsSort={this.onDatasetsSort}
//               onShowMoreDatasets={this.onShowMoreDatasets}
//               toggleFacet={this.onToggleFacet}
//               fetchMoreFacet={this.onFetchMoreFacet}
//               fetchLabels={this.props.fetchLabels}
//             />
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// }
//
// onFetchMoreFacet(facetName, count) {
//   const key = facetName + "Limit";
//   this.setState({[key]: count});
// }
//
// onToggleFacet(facetName, value) {
//   const query = paramsToViewQuery(this.props.query, this.state);
//   const index = query[facetName].indexOf(value);
//   if (index > -1) {
//     query[facetName].splice(index, 1);
//   } else {
//     query[facetName].push(value);
//   }
//   this.setState({"showMore": 0});
//   this.props.onUpdateNavigation(viewQueryToNavigation(query));
// }
//
// onSetView(value) {
//   const query = paramsToViewQuery(
//     this.props.query, this.state, ["page", "pageSize", "sort"]);
//   query.view = value;
//   this.setState({"showMore": 0});
//   this.props.onUpdateNavigation(viewQueryToNavigation(query));
// }
//
// onDatasetsPage(page) {
//   const query = paramsToViewQuery(this.props.query, this.state);
//   query.page = page;
//   this.setState({"showMore": 0});
//   this.props.onUpdateNavigation(viewQueryToNavigation(query));
// }
//
// onDatasetsPageSize(size) {
//   const query = paramsToViewQuery(this.props.query, this.state);
//   query.page = 0;
//   query.pageSize = size;
//   this.setState({"showMore": 0});
//   this.props.onUpdateNavigation(viewQueryToNavigation(query));
// }
//
// onDatasetsSort(sortBy) {
//   const query = paramsToViewQuery(this.props.query, this.state);
//   query.sort = sortBy;
//   this.props.onUpdateNavigation(viewQueryToNavigation(query));
// }
//
// onSetSearchText(search) {
//   const query = paramsToViewQuery(
//     this.props.query, this.state, ["page", "pageSize", "sort"]);
//   query.search = search;
//   this.setState({"showMore": 0});
//   this.props.onUpdateNavigation(viewQueryToNavigation(query));
// }
//
// onClearFilters() {
//   const query = createDefaultQuery();
//   this.setState({"showMore": 0});
//   this.props.onUpdateNavigation(viewQueryToNavigation(query));
// }
//
// onSetTemporal(start, end) {
//   const query = paramsToViewQuery(
//     this.props.query, this.state, ["page", "pageSize", "sort"]);
//   query.temporalStart = start;
//   query.temporalEnd = end;
//   this.setState({"showMore": 0});
//   this.props.onUpdateNavigation(viewQueryToNavigation(query));
// }
//
// onShowMoreDatasets() {
//   this.setState({"showMore": this.state.showMore + SHOW_MORE_DATASETS});
// }

// }

// DatasetList.propTypes = {
//   "t": PropTypes.func.isRequired,
//   "tLabel": PropTypes.func.isRequired,
//   //
//   "ready": PropTypes.bool.isRequired,
//   "error": PropTypes.number.isRequired,
//   "query": PropTypes.object.isRequired,
//   "onFetchDatasets": PropTypes.func.isRequired,
//   "onUpdateNavigation": PropTypes.func.isRequired,
//   "withFacetProps": PropTypes.func.isRequired,
//   "withTypeaheadProps": PropTypes.func.isRequired,
//   "withViewProps": PropTypes.func.isRequired,
//   "fetchLabels": PropTypes.func.isRequired,
// };

// register({
//   "name": ELEMENT_DATASET_LIST,
//   "element": connect((state) => ({
//     "t": selectT(state),
//     "tLabel": selectTLabel(state),
//   }))(DatasetList),
// });
