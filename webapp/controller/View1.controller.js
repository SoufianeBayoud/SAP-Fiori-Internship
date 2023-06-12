sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/Sorter",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "sap/ui/model/FilterType",
        "sap/ui/core/Fragment",
        "sap/ui/core/routing/History",
        "sap/ui/core/UIComponent",
        "sap/ui/model/json/JSONModel",
        "sap/ui/model/Model"
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,
	Sorter,
	Filter,
	FilterOperator,
	FilterType,
	Fragment,
	History,
	UIComponent,
	JSONModel,
	Model) {
        "use strict";

        return Controller.extend("project1.controller.View1", {
            onInit: function () {
                // var oModel = new JSONModel();
                // this.getView().setModel(oModel, "sourceModel");
                // var oModel = new sap.ui.model.odata.v2.ODataModel({
                //     serviceUrl: "/sap/opu/odata/sap/ZUI_ORDER_BACKEND/"
                //     // Additional parameters and configurations if needed
                //   });
                
                //   // Set the model to your view
                //   this.getView().setModel(oModel, "MaintenanceOrders");
                
                // //   var oText = this.byId("orderCountText");
                // //   oText.bindProperty("text", "MaintenanceOrders>/MaintenanceOrderCount");

                //   // Get the reference to the OData model
                //   var oModel = this.getView().getModel("MaintenanceOrders");
                
                //   // Fetch the notification count from the backend
                //   oModel.read("/ZI_ORDER_BACKEND/$count", {
                //     success: function(iCount) {
                //       // Update the count property in your model
                //       oModel.setProperty("/MaintenanceOrderCount", iCount);
                //       console.log(iCount);
                //     }.bind(this),
                //     error: function(oError) {
                //       // Handle error if necessary
                //     }
                //   });

            },
            onOrderCount: function (){
                
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("CountOrder");
            },
            onSearch: function (oEvent) {
                //alert("Sa marche");
                var aFilters = [];
                var sQuery = oEvent.getParameter("query");

                if (sQuery) {
                    aFilters.push(new sap.ui.model.Filter("CreatedByUser", sap.ui.model.FilterOperator.Contains, sQuery))
                }

                var oTable = this.byId("Table1");
                var oBinding = oTable.getBinding("items");

                oBinding.filter(aFilters);

            },
            onSort: function () {
            //Get the current view 
                var oView = this.getView();
            //Load the fragment file 
            sap.ui.core.Fragment.load({
                    id:oView.getId(),
                    name:"project1.fragment.SortDialog",
                    controller:this
                }).then({
                    function(oDialog) {
                        //Open the dialog
                        oDialog.open();
                    }
                })
            
               

            },
            onSortDialogConfirm: function (oEvent) {
                var oSortItem = oEvent.getParameter("sortItem");
                var sColumnPath = "MaintenanceOrder";
                var bDescending = oEvent.getParameter("sortDescending");
                var aSorters = [];
    
     
    
                if (oSortItem) {
                    sColumnPath = oSortItem.getKey();
                }
    
     
    
                aSorters.push(new Sorter(sColumnPath, bDescending));
    
                var oTable = this.byId("Table1");
                var oBinding = oTable.getBinding("items");
    
     
    
                oBinding.sort(aSorters);
            },
            onOrderClick: function (oEvent) {
                var oItem = oEvent.getSource();
                var oBindingContext = oItem.getBindingContext();
                console.log(oBindingContext);
                if (oBindingContext) {
                    var sId = oBindingContext.getProperty("sId");
                    var maintenanceOrder = oBindingContext.getProperty("MaintenanceOrder");

                   
                    console.log(maintenanceOrder);
                    var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("Detail", {
                    MaintenanceOrder: maintenanceOrder
                });
                }
                



                // oItem.getBindingContext().getProperty("MaintenanceOrder");
                // var oRouter = this.getOwnerComponent().getRouter();
                // oRouter.navTo("Detail", {
                //     MaintenanceOrder: oItem.getBindingContext().getProperty("MaintenanceOrder")
                // });
            },
            onPress: function (oItem) {
                console.log(oItem)
            },
            onCreate: function(){
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("Create");
            },
            onToFavorites: function(){
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("FavoritesView");
            }


        });
    });