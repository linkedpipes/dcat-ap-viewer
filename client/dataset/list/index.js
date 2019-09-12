import {register} from "app/register.js";
import reducer from "./dataset-list-reducer";
import {DatasetList} from "./dataset-list";
import {DATASET_LIST_URL} from "app/navigation";

register({
  "reducer": reducer.reducer,
  "name": reducer.name,
  "url": [DATASET_LIST_URL],
  "component": DatasetList,
  "homepage": true,
  "strings": {
    "cs": {
      "facet.show_popular": "Zobrazit pouze populární"
      , "facet.show_more": "Zobrazit další"
      , "query.temporal": "Časové pokrytí"
      , "query.from": "od"
      , "query.to": "do"
      , "query.hide_filters": "Skrýt pokročilé filtry"
      , "query.show_filters": "Zobrazit pokročilé filtry"
      , "query.clear_filters": "Smaž filtry"
      , "dataset-list": "Seznam datových sad"
      , "keyword-cloud": "Klíčová slova"
      , "theme-cloud": "Témata"
      , "search.searching": "Vyhledávám data ..."
      , "search.no_data_found": "Dotazu neodpovídají žádná data."
      , "search.search": "Vyhledat"
      , "facet.hide": "Skrýt filtry"
      , "facet.show": "Zobrazit filtry"
      , "query.datasets_found": "datových sad nalezeno"
      , "query.with": " na dotaz"
      , "title_sort asc": "Název vzestupně"
      , "title_sort desc": "Název sestupně"
      , "issued asc": "Datum vydání vzestupně"
      , "issued desc": "Datum vydání sestupně"
      , "modified asc": "Datum aktualizace vzestupně"
      , "modified desc": "Datum aktualizace sestupně"
      , "themes": "Témata"
      , "formats": "Formáty"
      , "query.last_year": "Minulý rok"
      , "query.this_year": "Tento rok",
    },
    "en": {
      "facet.show_popular": "Show popular only"
      , "facet.show_more": "Show more"
      , "query.temporal": "Temporal coverage"
      , "query.from": "from"
      , "query.to": "to"
      , "query.hide_filters": "Hide advanced filters"
      , "query.show_filters": "Show advanced filters"
      , "query.clear_filters": "Clear filters"
      , "dataset-list": "Dataset list"
      , "keyword-cloud": "Keywords"
      , "theme-cloud": "Themes"
      , "search.searching": "Searching ..."
      , "search.no_data_found": "No data found."
      , "search.search": "Search"
      , "facet.hide": "Hide filters"
      , "facet.show": "Show filters"
      , "query.datasets_found": "datasets found"
      , "query.with": "with query"
      , "title_sort asc": "Title Ascending"
      , "title_sort desc": "Title Descending"
      , "issued asc": "Issued Ascending"
      , "issued desc": "Issued Descending"
      , "modified asc": "Modified Ascending"
      , "modified desc": "Modified Descending"
      , "themes": "Themes"
      , "formats": "Formats"
      , "query.last_year": "Last year"
      , "query.this_year": "This year",
    },
  },
});