import Backbone from 'backbone'
import $ from 'jquery'
import {EtsyModel, EtsyListingCollection, EtsySearchResultsCollection, EtsyCatagoryCollection} from './models/models-etsy.js'
import {MultiListingView, SingleItemView} from './views.js'

const AppRouter = Backbone.Router.extend({
	initialize: function(){
		Backbone.history.start()
	},

	el: '#app-contaner',

	routes: {
		'catagories/:catagoryId' : 'showCatagoryPage',
		'search/:keywords' : 'showSearchedItemsPage',
		'details/:id' : 'showItemPage',
    '' : 'showHomePage',
  },

	events: {
		'click .header' : 'handleReturnToHome',
		'click .navbar' : 'handleCatagoryChage'
	},

	handleReturnToHome: function(evt){
		window.location.hash = ''
	},

	handleCatagoryChage: function(evt){
		console.log(evt.currentTarget)
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

	showCatagoryPage: function(catagory){
		let etsyDataInstance = new EtsyCatagoryCollection(catagoryId)
		etsyDataInstance.fetch().then(function(serverRes){
			let etsyInformation = serverRes.results
			let viewInstance = new MultiListingView()
			viewInstance.render(etsyInformation)
			})
	},

})


let myApplication = new AppRouter();
