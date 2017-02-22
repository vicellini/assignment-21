import Backbone from 'backbone'

export const EtsyModel = Backbone.Model.extend({
	initialize: function(itemListingId){
		this.url = `https://openapi.etsy.com/v2/listings/${itemListingId}.js?api_key=59fgij0pa379rvshx92jwzfl&callback=?&includes=Images`
	},
	parse: function(rawServerRes){
		if(typeof rawServerRes.results !== 'undefined' ){
			return rawServerRes.results[0]
		}else{
			return rawServerRes
		}
	},
})

export const EtsyListingCollection = Backbone.Collection.extend({
	model: EtsyModel,
	url : `https://openapi.etsy.com/v2/listings/active.js?api_key=59fgij0pa379rvshx92jwzfl&callback=?&includes=Images,Shop`,
   parse : function(rawJsonRes){
	 return rawJsonRes.data
	},
	initialize: function(){ /* no op */ }
})

export const EtsySearchResultsCollection = Backbone.Collection.extend({
	model: EtsyModel,
	initialize: function(searchData){
		this.url = `https://openapi.etsy.com/v2/listings/active.js?api_key=59fgij0pa379rvshx92jwzfl&keywords=${searchData}&includes=Images,Shop&callback=?`;
	},
	parse: function(rawJsonRes){
		return rawJsonRes.data
	},

})

export const EtsyCatagoryCollection = Backbone.Collection.extend({
	model: EtsyModel,
	initialize: function(catId){
		this.url = `https://openapi.etsy.com/v2/listings/active.js?api_key=59fgij0pa379rvshx92jwzfl&category=${catId}&includes=Images,Shop&callback=?`;
	},
	parse: function(rawJsonRes){
		return rawJsonRes.data
	},

})
