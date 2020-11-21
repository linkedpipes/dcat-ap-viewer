# Data API definition
Define API build on top of the data-model. Because the API is build with RDF 
in mind multiple different objects can be returned for a single call. For 
example database detail may also include detail about a publisher, 
distributions, and labels. That is the reason why the api calls often response
objects with multiple entities. It is up to the application to use the extra
data or throw them away and request them again later.
