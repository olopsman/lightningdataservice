({
	handleSaveRecord : function(cmp, event, helper) {
        var recordLoader = cmp.find("recordEditor");
        recordLoader.saveRecord($A.getCallback(function(saveResult) {
            if(saveResult.state === "ERROR") {
              var errMsg = '';
                for(var i = 0; i < saveResult.error.length; i ++) {
                    errMsg += saveResult.error[i].message + "\n";
                }
                cmp.set("v.recordSaveError", errMsg);
            } else {
            	console.log("save completed");
                cmp.set("v.recordSaveError", "");
            }                                      
        }));
	},
    handleRecordUpdated : function(component, event, helper) {
        var eventParams = event.getParams();
        if(eventParams.changeType === "CHANGED") {
            //get the fields that are changed for this record
            var changedFields = eventParams.changedFields;
            console.log('Fields that are changed :' + JSON.stringify(changedFields));
            var resultsToast = $A.get("e.force:showToast");
            resultsToast.setParams({
                "title":"Saved",
                "message":"The record was updated."
            });
            resultsToast.fire();
        } else if(eventParams.changeType === "LOADED") {
            //
        } else if(eventParams.changeType === "REMOVED") {
            //
        } else if(eventParams.changeType === "ERROR") {        
            console.log("Error :" + component.get("v.error"));
                component.set("v.recordSaveError", "bl");
        }
    }
})