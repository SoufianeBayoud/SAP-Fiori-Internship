sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
  ], function(Controller, JSONModel) {
	"use strict";
  
	return Controller.extend("project1.controller.FavoritesView", {
	  onInit: function() {
      
      var favorites = JSON.parse(localStorage.getItem("favorites")) || [];

      // Create a JSON model with the favorites data
      var oModel = new sap.ui.model.json.JSONModel(favorites);
      console.log(oModel.getData());
      this.getView().setModel(oModel);

     
     
		// var oDetailView = sap.ui.core.UIComponent.getRouterFor(this).getView("project1.view.DetailView");
    // 	var favorites = oDetailView.getController().favorites;

    // // Use the 'favorites' array to bind the data to your table
   	// 	var oModel = new sap.ui.model.json.JSONModel(favorites);
	  //   this.getView().setModel(oModel);
	  },
	  
	onNavBack: function() {
		var oHistory = sap.ui.core.routing.History.getInstance();
		var sPreviousHash = oHistory.getPreviousHash();
	  
		if (sPreviousHash !== undefined) {
		  window.history.go(-1);
		} else {
		  var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		  oRouter.navTo("View1", {}, true); 
		}
	  },
    onClickSynchronize: function() {
      alert("kqjqlkjd");
      var oTable = this.byId("FavTable")
      oTable.getModel().refresh(true) ;


    }

	
	});
  });
  