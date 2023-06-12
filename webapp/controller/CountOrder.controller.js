sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/viz/ui5/data/FlattenedDataset",
  "sap/viz/ui5/controls/common/feeds/FeedItem",
  "sap/viz/ui5/controls/VizFrame"
], function(Controller, JSONModel, Filter, FilterOperator, FlattenedDataset, FeedItem, VizFrame) {
  "use strict";

  return Controller.extend("project1.controller.CountOrder", {
    onInit: function() {
      var oModel = new sap.ui.model.odata.v2.ODataModel({
        serviceUrl: "/sap/opu/odata/sap/ZUI_ORDER_BACKEND/"
        // Additional parameters and configurations if needed
      });

      // Set the model to your view
      this.getView().setModel(oModel, "MaintenanceOrders");

      // Get the reference to the OData model
      var oModel = this.getView().getModel("MaintenanceOrders");

      //Count all the orders
      // Fetch the order count from the backend
      oModel.read("/ZI_ORDER_BACKEND/$count", {
        success: function(iCount) {
          // Update the count property in your model
          oModel.setProperty("/MaintenanceOrderCount", iCount);
          var totalOrders = this.byId('totalOrders')
          totalOrders.setText(iCount);
          console.log(iCount);
        }.bind(this),
        error: function(oError) {
          // Handle error if necessary
        }
      });

      // Users + their number of orders
      var oVBox = this.byId("id1HBox");
      var VBoxProfit = this.byId("id2HBox");
      var VBoxCreationDate = this.byId("id3HBox");

      oModel.read("/ZI_ORDER_BACKEND", {
        success: function(oData) {
          // List of users
          var aOrders = oData.results;
          var aUsers = [];
          aOrders.forEach(function(order) {
            if (aUsers.indexOf(order.CreatedByUser) === -1) {
              aUsers.push(order.CreatedByUser);
            }
          });

          var oOrdersByUser = {};
          aUsers.forEach(function(user) {
            var aFilteredOrders = aOrders.filter(function(order) {
              return order.CreatedByUser === user;
            });
            oOrdersByUser[user] = aFilteredOrders;
          });
          aUsers.forEach(function(user) {
            var iOrderCount = oOrdersByUser[user].length;
            var sTitle = user + " : " + iOrderCount;
            var oText = new sap.m.Text({ text: sTitle }); // Create a new Text control with the title
            oVBox.addItem(oText); // Add the Text control to the VBox
          });
          oVBox.setModel(new JSONModel(oOrdersByUser));

          // ProfitCenter
          var aProfitCenters = [];
          aOrders.forEach(function(order) {
            if (aProfitCenters.indexOf(order.ProfitCenter) === -1) {
              aProfitCenters.push(order.ProfitCenter);
            }
          });
          var oOrdersByProfitCenter = {};
          aProfitCenters.forEach(function(profitCenter) {
            var aFilteredOrders = aOrders.filter(function(order) {
              return order.ProfitCenter === profitCenter;
            });
            oOrdersByProfitCenter[profitCenter] = aFilteredOrders;
          });
          aProfitCenters.forEach(function(profitCenter) {
            var iOrderCount = oOrdersByProfitCenter[profitCenter].length;
            var sTitle = profitCenter + " : " + iOrderCount;
            var oText = new sap.m.Text({ text: sTitle }); // Create a new Text control with the title
            VBoxProfit.addItem(oText); // Add the Text control to the VBox
          });
          VBoxProfit.setModel(new JSONModel(oOrdersByProfitCenter));

          // CreationDate
          var oOrdersByYear = {};
          aOrders.forEach(function(order) {
            var creationYear = new Date(order.CreationDate).getFullYear();
            if (!oOrdersByYear[creationYear]) {
              oOrdersByYear[creationYear] = [];
            }
            oOrdersByYear[creationYear].push(order);
          });

          var oSelectYear = new sap.m.Select(
            
            {
            change: function(oEvent) {
              
              var selectedYear = oEvent.getParameter("selectedItem").getText();
              var aSelectedOrders = oOrdersByYear[selectedYear];
              
              VBoxCreationDate.insertItem(oSelectYear, 0); // Insert the Select control at the top
              VBoxCreationDate.setModel(new JSONModel(oOrdersByYear));

              aSelectedOrders.forEach(function(order) {
                var sOrderTitle = "Order ID: " + order.MaintenanceOrder + " | Created By: " + order.CreatedByUser;
                var oOrderText = new sap.m.Text({ text: sOrderTitle });
                VBoxCreationDate.addItem(oOrderText);
              });
            }
          });
        
          for (var year in oOrdersByYear) {
            if (oOrdersByYear.hasOwnProperty(year)) {
              oSelectYear.addItem(new sap.ui.core.Item({ text: year }));
              
            }
          }
           // Clear the VBox before adding items
           function clearVBox() {
            VBoxCreationDate.setItems([]); // Clear the items aggregation of the VBox
          }
           
          VBoxCreationDate.insertItem(oSelectYear, 0); // Insert the Select control at the top
          VBoxCreationDate.setModel(new JSONModel(oOrdersByYear));
        },
        error: function(oError) {
          // Handle error if necessary
        }
      
      });
    },
    

    onNavBack: function() {
      var oHistory = sap.ui.core.routing.History.getInstance();
      var sPreviousHash = oHistory.getPreviousHash();

      if (sPreviousHash !== undefined) {
        window.history.go(-1);
      } else {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("View1", {}, true); // Replace "RouteName" with the actual name of the route you want to navigate to
      }
    }
  });
});
