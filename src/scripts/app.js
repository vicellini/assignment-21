import Backbone from 'backbone'
import $ from 'jquery'
import {EtsyModel, EtsyListingCollection, EtsySearchResultsCollection, EtsyCatagoryCollection, EtsyMaxPriceCollection} from './models/models-etsy.js'
import {MultiListingView, SingleItemView, NavBarView} from './views.js'


const AppRouter = Backbone.Router.extend({
	el: '#appContainer',

	initialize: function(){
		let navView = new NavBarView()
		Backbone.history.start()
	},

	routes: {
		'catagories/:catagoryId' : 'showCatagoryPage',
		'search/:keywords' : 'showSearchedItemsPage',
		'details/:id' : 'showItemPage',
    '' : 'showHomePage',
  },


  showHomePage: function(){
    let etsyDataInstance = new EtsyListingCollection()
		etsyDataInstance.fetch().then(function(serverRes){
			let etsyInformation = serverRes.results
			console.log(etsyInformation)
			let viewInstance = new MultiListingView()
			viewInstance.render(etsyInformation)
			})
	},

	showItemPage: function(itemId){
		let itemModel = new EtsyModel(itemId)
		console.log(itemModel)
		itemModel.fetch().then(function(){
			let viewInstance = new SingleItemView
			viewInstance.render(itemModel)
		})

	},

	showSearchedItemsPage: function(inputData){
		let searchDataInstance = new EtsySearchResultsCollection(inputData)
		searchDataInstance.fetch().then(function(serverRes){
			let etsyInformation = serverRes.results
			let viewInstance = new MultiListingView()
			viewInstance.render(etsyInformation)
		})

	},

	showCatagoryPage: function(catId){
		let etsyDataInstance = new EtsyCatagoryCollection(catId)
		etsyDataInstance.fetch().then(function(serverRes){
			let etsyInformation = serverRes.results
			console.log(etsyInformation)
			let viewInstance = new MultiListingView()
			viewInstance.render(etsyInformation)
			})
	},

})

let myApplication = new AppRouter();
