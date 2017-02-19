(function(){
'use strict';



var outputList =[{
     name:"Rubber",
     quantity:"200"
},
{
  name:"Coconuts",
  quantity:"100"
}
];
//console.log(outputList);
angular.module('ShoppingListApp',[])
.controller('ShoppingListController2',ShoppingListController2)
.factory('ShoppingListFactory', ShoppingListFactory);

ShoppingListController2.$inject = ['ShoppingListFactory'];
function ShoppingListController2(ShoppingListFactory){
  var list2 = this;
  var shoppingList = ShoppingListFactory(3);
  list2.items = shoppingList.getItems();
  list2.outItems = shoppingList.getoutItems();
  console.log("outItems",list2.outItems);
  list2.itemName = "";
  list2.itemQuantity = "";
  list2.msg = "Nothing bought yet";
  list2.addItem = function () {
      try {
        shoppingList.addItem(list2.itemName, list2.itemQuantity);
      } catch (error) {
        list2.errorMessage = "Sorry rich kid. Only 3 items.";
      }

    }

    list2.removeItem = function (itemIndex) {
    shoppingList.removeItem(itemIndex);
  }

  list2.cancelItem = function (itemIndex) {
  shoppingList.cancelItem(itemIndex);
};
}

// ShoppingListShowController.$inject = ['ShoppingListService'];
// function ShoppingListShowController(ShoppingListService) {
//   var showList = this;
//
//   showList.items = ShoppingListService.getItems();
//   showList.outItems = ShoppingListService.getoutItems();
//
//   showList.removeItem = function (itemIndex) {
//     ShoppingListService.removeItem(itemIndex);
//   };
//   showList.cancelItem = function (itemIndex) {
//     ShoppingListService.cancelItem(itemIndex);
//   };
// }


function ShoppingListService(maxItems) {
  var service = this;

  // List of shopping items
  var items = [];
  var outItems = [];

  service.addItem = function (itemName, quantity) {
    if ((maxItems === undefined) ||
       (maxItems !== undefined) && (items.length < maxItems)) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    items.push(item);
  }
  else {
      throw new Error("Max items (" + maxItems + ") reached.");
    }
  };

  service.removeItem = function (itemIdex) {
    service.addToOut(items[itemIdex].name,items[itemIdex].quantity);
    console.log(outItems);

    items.splice(itemIdex, 1);
  };
  service.cancelItem = function (itemIdex) {

    items.splice(itemIdex, 1);
  };

  service.getItems = function () {
    return items;
  };

  service.addToOut = function (itemName, quantity) {
    var item1 = {
      name: itemName,
      quantity: quantity
    };
    outItems.push(item1);
  };

  service.getoutItems = function () {
    return outItems;
  };
}

function ShoppingListFactory() {
  var factory = function (maxItems) {
    return new ShoppingListService(maxItems);
  };

  return factory;
}
})();
