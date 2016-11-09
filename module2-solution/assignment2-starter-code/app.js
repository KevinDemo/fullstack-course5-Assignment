(function(){

angular.module('ShoppingListCheckOff',[])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
 var ToBuy = this;
 ToBuy.toBuyItems = ShoppingListCheckOffService.getToBuyItems();
 ToBuy.buyItem = function(index){
   try {
      ShoppingListCheckOffService.buyItem(index);
   } catch (error) {
     list.errorMessage = error.message;
   }
 };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){
  var AleadyBought = this;
  AleadyBought.boughtItems = ShoppingListCheckOffService.getBoughtItems();
  AleadyBought.removeItem = function(index){
    ShoppingListCheckOffService.removeItem(index);
  };
}

function ShoppingListCheckOffService(){
  var service = this;
  var toBuyItems = [
    { name:"cookies", quantity : 10},
    { name:"cookies", quantity : 10}
  ];
  var boughtItems = [
      { name:"cookies", quantity : 10}
  ];

  service.buyItem = function(index){
    var item = toBuyItems[index];
    boughtItems.push(item);
    toBuyItems.splice(index,1);
  };

  service.removeItem = function(index){
    var item = boughtItems[index];
    boughtItems.splice(index,1);
    toBuyItems.push(item);
  };

  service.getToBuyItems = function(){
    return toBuyItems;
  }

  service.getBoughtItems = function(){
    return boughtItems;
  }

}


})();
