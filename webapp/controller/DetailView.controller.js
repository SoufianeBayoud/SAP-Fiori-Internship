sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/routing/History",
  "sap/ui/model/odata/v2/ODataModel"
], function(Controller, History, ODataModel) {
  "use strict";

  return Controller.extend("project1.controller.DetailView", {
    onInit: function() {
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("Detail").attachPatternMatched(this._onObjectMatched, this);
    },

    _onObjectMatched: function(oEvent) {
      var maintenanceOrder = oEvent.getParameter("arguments").MaintenanceOrder;
      console.log(maintenanceOrder);
      this._maintenanceOrder = maintenanceOrder;
      this._onObjectMatchedCallback(maintenanceOrder);
    },

    _onObjectMatchedCallback: function(maintenanceOrder) {
      var oView = this.getView();
      var oTextControl = oView.byId("MaintenanceOrder_Text");
      oTextControl.setText(maintenanceOrder);
      console.log(maintenanceOrder);

      var oTitleControl = oView.byId("oh");
      oTitleControl.setTitle("Order: " + maintenanceOrder);

      // Retrieve and bind specific data based on MaintenanceOrder
      var oModel = new ODataModel("/sap/opu/odata/sap/ZUI_ORDER_BACKEND/");
      var sPath = "/ZI_ORDER_BACKEND('" + maintenanceOrder + "')";
      oModel.read(sPath, {
        success: function(oData) {
          // Bind the data to relevant view elements
          var oAttributes = {
            WorkCenterInternalID: "WorkCenterInternalID",
            BusinessArea: "BusinessArea",
            FunctionalArea: "FunctionalArea",
            ProfitCenter: "ProfitCenter",
            CreatedByUser: "CreatedByUser",
            CreationDate: "CreationDate",
            Material: "Material",
            Equipment: "Equipment",
            SerialNumber: "SerialNumber",
            CompanyCode: "CompanyCode"
          };

          for (var attr in oAttributes) {
            var oControl = oView.byId(attr);
            if (oControl) {
              oControl.setText(oData[oAttributes[attr]]);
            }
          }

          // Refresh the view after data binding
          oView.getModel().refresh(true);
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
        oRouter.navTo("View1", {}, true); 
      }
    },
    onExport: function(){
      var vbox = this.getView().byId("vb");
      var objectAttributes = vbox.getItems().filter(function(item) {
        return item.getMetadata().getName() === "sap.m.ObjectAttribute";
      });
    
      var data = objectAttributes.map(function(attribute) {
        return attribute.getText();
      });
    
      var worksheet = XLSX.utils.aoa_to_sheet([data]);
      var workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    
      // Generate a download link for the Excel file
      var excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      var blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    
      // Use a different approach to trigger the file download
      if (navigator.msSaveBlob) {
        // For IE/Edge browsers
        navigator.msSaveBlob(blob, "data.xlsx");
      } else {
        // For other browsers
        var link = document.createElement("a");
        if (link.download !== undefined) {
          var url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", "data.xlsx");
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    },
    favorites: [],
    onAddToFavorites: function() {
      var selectedMaintenanceOrder = this.byId("MaintenanceOrder_Text").getText();
      var createdByUser = this.byId("CreatedByUser").getText();
      var creationDate = this.byId("CreationDate").getText();
      console.log("Launched")
      var newFavorite = {
        maintenanceOrder: selectedMaintenanceOrder,
        createdByUser: createdByUser,
        creationDate: creationDate
      };
    
      // Retrieve the existing favorites from local storage
      var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    
      // Add the new favorite to the favorites array
      favorites.push(newFavorite);
    
      // Save the updated favorites array in local storage
      localStorage.setItem("favorites", JSON.stringify(favorites));
    
      // Navigate to the FavoritesView
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.navTo("FavoritesView");
    }
    
  });
});