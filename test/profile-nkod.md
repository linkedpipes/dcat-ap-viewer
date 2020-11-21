# Functionality specification for profile-nkod
This file describes, very loosely, functionality that should be implemented,
supported, and tested. The functionality is described with respect to views.

In general all tests should be carried out on a computer as well as on a mobile
device. The visual layout must be tested on a computer and mobile device as 
well, it is possible to use browser developer console to emulate mobile device
screen. 

This profile extends *profile-lkod*, so all tests from *profile-lkod* should
also be evaluated.

## dataset-detail
 * [TN01] User can navigate to dataset forms using icons next to dataset title. 
 
## dataset-list
 * [TN02] User must be able to navigate to dataset list from navigation bar.
 * There are facets on the left side for:
   * [TN03] Publishers.
 * [TN04] If publisher facet is active, no publisher is shown in the dataset 
   list.

## catalog-list
 * [TN05]  User must be able to navigate to catalog-list from navigation bar.
 * The catalog-list view must contain:
   * [TN06] Header.
   * [TN07] Total number of catalog available.
   * Detail of catalogs:
     * [TN08] Publisher name, link.
     * [TN09] Catalog name, link.
     * [TN10] Contact as an email.
     * [TN11] Link to the catalog.
     * [TN12] Link to dataset forms to catalog removal.

## publisher-list
 * [TN13] User must be able to navigate to publisher-list from navigation bar.
 * The publisher-list view must contain:
   * [TN14] Header.
   * [TN15] Total number of publisher available.
   * Detail of publishers:
    * [TN16] Publisher name.
    * [TN17] Number of datasets.
    * [TN18] Link to pre-filtered dataset-list.

