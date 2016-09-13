
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
			metadataUrl: "", 
            columns:[],
			error: ""
        };

	this.metadataUrl = "";
}

GridConfig.prototype.fetch = function(){
	thisObj = this;
	columns = [];
	$.ajax({
		url:thisObj.metadataUrl,
		async:false
	}).done(function(data){
		if(data && data.Status=="OK"){
			columns = _.chain(data.Data.Fields).
				filter(function(item){
					return item.ShowGrid==true;
				}).
				sort(function(item){
					return item.ShowGridColumn
				}).
				map(function(item){
					return {
						field:item.DBFieldId,
						title:item.Label	
					};
				}).
				value();
		} else {
			alert("Error call " + thisObj.metadataUrl);
		}
	}).fail(function(txt){
		alert("Error call " + thisObj.metadataUrl);	
	});

	this.cfgObj.columns = columns;
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

GridConfig.prototype.metadataFromUrl = function(url){
	//var models = metadataFromUrl(url);
	this.metadataUrl = url;
	return this;
}

function handleState(x, event){
    var target = event.target;
    var bindStateId = $(target).attr("data-bind");
    var stateObj = {};
    stateObj[bindStateId]=target.value;
    x.setState(stateObj);
}
