# Functionality specification for profile-lkod
This file describes, very loosely, functionality that should be implemented,
supported, and tested. The functionality is described with respect to views.

In general all tests should be carried out on a computer as well as on a mobile
device. The visual layout must be tested on a computer and mobile device as 
well, it is possible to use browser developer console to emulate mobile device
screen. 

## global
 * [TL00] User can see a loading indicator any time something is loading.
          Does not include labels.   
 * [TL01] If backend becomes unavailable (no internet connection) an error 
          message is shown.
 * [TL02] User can switch language between cs and en. 
 * [TL42] There is no-page-found screen if user access non-existing URL.
 * [TL43] Change title page as user navigate views.
 
## dataset-detail
 * [TL03] User can navigate to dataset view by clicking a dataset in dataset 
          list.
 * [TL04] User can navigate to dataset view from dataset view, using dataset 
          hierarchy (parent, children).
 * [TL05] User can see dataset title, publisher, metadata.
 * [TL06] User can see information about quality. 
 * [TL07] User can see distributions/datasets.
 * [TL08] A pagination is used for distributions/datasets.
 * [TL09] If the dataset is a parent in a hierarchy, then user can navigate to 
          dataset list with isPartOf filter.
 * [TL10] User can navigate to dataset forms using icons next to dataset title. 
 
## dataset-list
 * [TL11] User must be able to navigate to dataset list from navigation bar.
 * There are facets on the left side for:
   * [TL12] isPartOf - visible only when filter is active. 
   * [TL13] Theme.
   * [TL14] Keywords.
   * [TL15] Formats.
 * [TL16] User can filter datasets with facet filters.
   * [TL17] At start at most 7 facets are visible.
   * [TL18] Use can click on *show more* button to see more facets. 
        Expand one facet view, filter to limit the number of facets so all 
        values for given facet are visible. Remove filters, the number of 
        visible facets should be same as before filtering.        
   * [TL19] User can click on *show popular* to see only starting number of facets.
   * [TL20] The number of visible facets is preserved when user applies 
            any filter.
 * [TL21] When user update/clear filters the pagination resets to 0.
 * [TL22] Use can change page size.
 * [TL23] User can navigate using pagination.
 * [TL24] User can filter using text query both by pressing enter on search,
          or pressing *search* button.
   * [TL25] When typing user see suggestions of dataset names.
 * [TL26] User can filter using start and end time (temporal filter).
 * [TL27] User can clear all filters.
 * [TL28] User can change ordering of the datasets.
 * [TL29] User can switch view to themes.
   * [TL30] User can see themes for filtered datasets as a tag cloud. 
   * [TL31] By clicking on a theme it is applied as a facet filter.
   * [TL32] For each theme user can see the number of datasets.
   * [TL33] User can see number of found themes.
   * [TL34] At the start 14 themes are visible.
   * [TL35] User can click *show more* button to see 15 more themes.
 * [TL45] User can switch view to keyword.
   * [TL46] User can see keyword for filtered datasets as a tag cloud. 
   * [TL47] By clicking on a keyword it is applied as a facet filter.
   * [TL48] For each keyword user can see the number of datasets.
   * [TL49] User can see number of found keywords.
   * [TL50] At the start 14 keywords are visible.
   * [TL51] User can click *show more* button to see 15 more keywords.
 * [TL36] During initial loading of the data the UI does not react to user inputs. 
 * [TL44] User can refresh the page with filters and see the same data. 
  
## keyword-list
 * [TL37] User must be able to navigate to keyword-list from navigation bar.
 * The keyword-list view must contain:
   * [TL39] Header.
   * [TL40] Total number of keywords available.
   * [TL41] Keywords - as links to pre-filtered dataset-list.