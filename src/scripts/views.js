import $ from 'jquery'

export const MultiListingView = Backbone.View.extend({
  el: '.page-content',

  events: {
    'click .item-thumbnail' : 'handleIndividualItem',
    'submit #form-search' : 'handleSearchData'
  },

  _keywordSearchData: function(someString){
    let finalString = ''
    for(let i = 0; i < someString.length; i++){
      let letter = someString[i]
        if(letter === ' '){
          finalString += '+'
        }else{
          finalString += letter;
        }
    }
    return finalString
  },

  handleIndividualItem: function(evt){
    let clickedItemEl = evt.currentTarget
    window.location.hash = `details/${clickedItemEl.dataset.itemid}`
  },

  handleSearchData: function(evt){
    evt.preventDefault();
    let searchData = evt.target
    let hasSearchData = this._keywordSearchData(searchData.keyword.value)
    window.location.hash = `search/${hasSearchData}`
  },

  _singleItemTemplate: function(listingModel){
      let mainItemImage = listingModel.Images[0].url_570xN;
        return `
            <div class="col-xs-12 col-md-4 item-thumbnail" data-itemid="${listingModel.listing_id}">
              <div class="thumbnail">
                <img src="${mainItemImage}">
                  <div class="caption">
                    <h3>${listingModel.title.slice(0,40)}${listingModel.title.length > 40 && '...'}</h3>
                    <div class ="row">
                      <p class="col-xs-6 shop-name">${listingModel.Shop.shop_name}</p>
                      <p class="col-xs-6 item-price">${listingModel.price}</p>
                    </div>
                  </div>
              </div>
            </div>
            `
    },

  _buildHTMLTemplate: function(listOfEtsyModels){
    return `
    </hr>
    <div class="row">
      <form class="col-xs-2" id="form-search">
        <div class="searchbar field_keyword">
          <h3>Search</h3>
          <input type="text" name="keyword"/>
        </div>
      </form>
      <div class="col-xs-10 active-list-items">
        <div class="row">
          ${listOfEtsyModels.map(this._singleItemTemplate).join('')}
        </div>
      </div>
    </div>
    `
  },



  render: function(listOfEtsyModels){
      this.el.innerHTML = this._buildHTMLTemplate(listOfEtsyModels)
    },
})

export const SingleItemView = Backbone.View.extend({

  el: '.page-content',

  _individualPageTemplate: function(itemModel){
    let attributeObj = itemModel.attributes

    let getAllImages = itemModel.get('Images').map(function(image){
        return `
            <img src="${image.url_75x75}">
          `
        }).join('')

      return `
        <div class="item-page-content row">
          <div class="col-xs-6 item-images">
            <img class="main-image" src="${attributeObj.Images[0].url_570xN}">
            <div class="row image-cycle">
              ${getAllImages}
            </div>
          </div>
          <div class="col-xs-6 item-information">
            <h2>${attributeObj.title.slice(0,40)}${attributeObj.title.length > 40 && '...'}</h2>
            <div class="row price_button">
              <p class="col-xs-6 item-information__price">$${attributeObj.price}</p>
              <div class="col-xs-6 text-right">
                <button type="button">Ask Questions</button>
              </div>
            </div>
            <p class="item-description">${attributeObj.description}</p>
          </div>
        </div>
        `
      },

      render: function(itemModel){
        this.el.innerHTML = this._individualPageTemplate(itemModel)
      },

  })