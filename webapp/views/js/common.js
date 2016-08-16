
function setPageTitle(t){
	$("#pagetitle").text(t)
}

function GridConfig(){
	this.cfgObj =  {
            dataSource:{
                pageSize:10, 
                data: []
            },
            sortable:true,
			resizable:true,
            filterable:true,
            columns:[],
			error: ""
        };
}

GridConfig.prototype.fetch = function(){
	return this.cfgObj;
}

GridConfig.prototype.set = function (attribute, value){
	this.cfgObj[attribute]=value;
	return this;
}

GridConfig.prototype.get = function (attribute){
	return this.cfgObj[attribute];
}

GridConfig.prototype.setDataSource = function (attribute, ds) {
	if(attribute==""){
		this.cfgObj.dataSource = ds;
	} else {
		this.cfgObj[attribute]=ds
	}
	return this;
}

GridConfig.prototype.fromMetaData = function(mdts){
	var columns = [];
	mdts.forEach(function(obj,idx){
		columns.push({
			field:obj.field,
			title:obj.label
		})
	});
	this.set("columns",columns)
	return this;
}

GridConfig.prototype.metadataFromUrl = function(url,modelname){
	var models = metadataFromUrl(url,modelname);
	return this;
}

function handleState(x, event){
    var target = event.target;
    var bindStateId = $(target).attr("data-bind");
    var stateObj = {};
    stateObj[bindStateId]=target.value;
    x.setState(stateObj);
}

function metadataFromUrl(url,modelname){
	var processing  = true;
	var models = []

	/*
		ajaxPost(url,{model:modelname},
			function(data){
				processing=false;
			}, function(e){
				processing=false;
			});

		while(processing){
			//--- do nothing
		}
	*/
	return models; 
}

