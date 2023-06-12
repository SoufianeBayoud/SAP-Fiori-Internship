sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/viz/ui5/format/ChartFormatter',
	'sap/viz/ui5/api/env/Format'
  ], function(Controller, JSONModel, ChartFormatter, Format) {
	'use strict';
  
	return Controller.extend('project1.controller.Create', {
		onInit: function() {
			// var oModel = new sap.ui.model.json.JSONModel(); // Create a new JSONModel
			// this.getView().setModel(oModel); // Set the JSONModel to the view			
			// var aOrders = oModel.getProperty("/ZI_ORDER_BACKEND/results");
		  
			// var aUsers = [];
			// aOrders.forEach(function(order) {
			//   if (aUsers.indexOf(order.CreatedByUser) === -1) {
			// 	aUsers.push(order.CreatedByUser);
			//   }
			// });
		  
			// var oOrdersByUser = {};
		  
			// aUsers.forEach(function(user) {
			//   var aFilteredOrders = aOrders.filter(function(order) {
			// 	return order.CreatedByUser === user;
			//   });
			//   oOrdersByUser[user] = aFilteredOrders;
			// });
		  
			// var oVizFrame = this.getView().byId("oVizFrame");
			// oVizFrame.setModel(new sap.ui.model.json.JSONModel(oOrdersByUser));
		  }
		  ,
  
	//   loadOrders: function() {
	// 	var oModel = this.getView().getModel();
  
	// 	oModel.read('/ZI_ORDER_BACKEND', {
	// 	  success: function(oData) {
	// 		var aOrders = oData.results;
  
	// 		var aUsers = [];
	// 		aOrders.forEach(function(order) {
	// 		  if (aUsers.indexOf(order.CreatedByUser) === -1) {
	// 			aUsers.push(order.CreatedByUser);
	// 		  }
	// 		});
  
	// 		var aChartData = aUsers.map(function(user) {
	// 		  var iOrderCount = aOrders.filter(function(order) {
	// 			return order.CreatedByUser === user;
	// 		  }).length;
	// 		  return {
	// 			user: user,
	// 			orderCount: iOrderCount
	// 		  };
	// 		});
  
	// 		oModel.setData(aChartData);
	// 	  }
	// 	});
	//   }
	});
  });
  