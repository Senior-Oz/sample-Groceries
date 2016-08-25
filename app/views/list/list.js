var dialogsModule = require('ui/dialogs');
var Observable = require('data/observable').Observable;
var ObservableArray = require('data/observable-array').ObservableArray;
var GroceryListViewModel = require('../../shared/view-models/grocery-list-view-model');
var socialShare = require('nativescript-social-share');
var page;

var groceryList = new GroceryListViewModel([]);
var pageData = new Observable({
    groceryList: groceryList,
    grocery: ""
});

exports.loaded = function(args){
    page = args.object;
    var listView = page.getViewById("groceryList");
    page.bindingContext = pageData;
    
    groceryList.empty();
    pageData.set("isLoading", true);
    groceryList.load().then(function(){
        pageData.set("isLoading", false);
        listView.animate({
            opacity: 1,
            duration: 1000
        });
    });
}

exports.add = function(){
    if(pageData.get("grocery").trim() === ""){
        dialogsModule.alert({
            message: "Enter a grocery item",
            okButtonText: "OK"
        });
        return;
    }
    
    page.getViewById("grocery").dismissSoftInput();
    groceryList.add(pageData.get("grocery"))
            .catch(function(){
                dialogsModule.alert({
                    message: "An error occurred while adding an intem to your list.",
                    okButtonText: "OK"
                });
            });
            
    pageData.set("grocery","");
};

exports.share = function(){
    var list = [];
    var finalList = "";
    for(var i = 0, size = groceryList.length; i < size; i++){
        list.push(groceryList.getItem(i).name);
    }
    var listString = list.join(", ").trim();
    socialShare.shareText(listString);
};

exports.delete = function(args){
    var item = args.view.bindingContext;
    var index = groceryList.indexOf(item);
    groceryList.delete(index);
};