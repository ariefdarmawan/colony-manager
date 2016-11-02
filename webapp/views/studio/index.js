setPageTitle("Studio")

var Button = React.createClass({
    render: function(){
        var btnClassName, btnGlyp;

        btnClassName = "btn btn-xs btn-" + this.props.type;
        btnGlyp = "glyphicon glyphicon-" + this.props.icon;
        return <button className={btnClassName} title={this.props.title}>
                    <span className={btnGlyp} />
                    &nbsp;
                    {this.props.title}
                </button>;
    }
})

var WidgetLists = React.createClass({
    render:function(){
        return <div className="widgetlists" _style={{padding:3+"px",backgroundColor:"whitesmoke"}}>
                    <div className="btn-toolbar">
                        <div className="btn-group">
                            <Button type="primary" icon="plus" title="Add Datasource" />
                        </div>
                        <div className="btn-group">
                            <Button type="primary" icon="th-large" title="Container" />
                        </div>
                        <div className="btn-group">
                            <Button type="primary" icon="th" title="Grid" />
                            <Button type="primary" icon="list-alt" title="Form" />
                            <Button type="primary" icon="search" title="Selector" />
                            <Button type="primary" icon="signal" title="Chart" />
                        </div>
                        <div className="btn-group">
                            <Button type="primary" icon="font" title="Label" />
                            <Button type="primary" icon="map-marker" title="Map" />
                            <Button type="primary" icon="picture" title="Multimedia" />
                            <Button type="primary" icon="pencil" title="Input" />
                            <Button type="primary" icon="inbox" title="Button" />
                        </div>
                        <div className="btn-group">
                            <Button type="primary" icon="fire" title="Script" />
                            <Button type="primary" icon="gift" title="Orchestration" />
                        </div>
                    </div>
            </div>;
    }
});

function addNode(data, idfieldname, parentid, childfieldname,obj){
    var node = getNode(data,idfieldname,parentid,childfieldname);
    if(node!=null){
        var widgets = node.widgets;
        if(!widgets || widgets.length==0){
            widgets=[];
        }
        obj.titleshown = obj.title + " ["+obj.id+"]";
        widgets.push(obj);
        node.widgets = widgets;
    }
}

function getNode(data, fieldname, id, childnodename){
    var found = false;
    var l = data.length;

    for(var i=0;i<l;i++){
        var dataitem = data[i];
        if(dataitem[fieldname]==id){
            return dataitem;
        }

        if(!dataitem[childnodename]){
            var childnodes = dataitem[childnodename];
            var childnodefind = getNode(childnodes, fieldname, id, childnodename);
            if(childnodefind!=null){
                return childnodefind;
            }
        }
    }

    return null;
}

var PageLayout = React.createClass({
    getInitialState: function(){
        return {dswidgetlists:[
                {id:"DS",titleshown:"Data Source [DS]",widgets:[]},
                {id:"WI",titleshown:"Widgets [WI]",widgets:[]}    
            ]};
    },
    componentDidMount: function(){
        var thisObj = $(this.refs.layoutwidgetlist);
        thisObj.kendoTreeView({
            dataTextField: ["titleshown"],
            select: function(e){
                console.log($(e.node).find(".k-in").text());
            }
        });
        this.setWidgetDataSource();
        this.addDataSource({id:"DS01",title:"HDFS"});
        this.addWidget({id:"WI01",title:"Container"});
    },
    addDataSource: function(ds){
        var dsdata = this.state.dswidgetlists;
        ds.titleshown=ds.title + "["+ds.id+"]";
        addNode(dsdata,"id","DS","",ds);
        this.setState({dswidgetlists:dsdata});
        this.setWidgetDataSource();
    },
    addWidget: function(widget, parentid){
        var dsdata = this.state.dswidgetlists;
        if(!parentid || parentid==""){
            parentid="WI"
        }
        if(!widget.widgets){
            widget.widgets=[];
        }
        widget.titleshown=widget.title + "["+widget.id+"]";
        addNode(dsdata,"id",parentid,"widgets",widget);
        this.setState({dswidgetlists:dsdata});
        this.setWidgetDataSource();
    },
    setWidgetDataSource: function(){
        var thisObj = $(this.refs.layoutwidgetlist);
        thisObj.data("kendoTreeView").setDataSource(new kendo.data.HierarchicalDataSource({
                    data: this.state.dswidgetlists,
                    schema: {
                        model: {
                            children: "widgets"
                        }
                    }
                }));
    },
    render:function(){
        return <div className="pagelayout">
                <div ref="layoutwidgetlist" />
            </div>
    }
});

var PageStudio = React.createClass({
    render:function(){
        var wh = ($(window).height()-100) + "px";
        return <div className="pagestudio" 
                //style={{border:"solid 1px #aaa",padding:"2px",height:wh}}
                style={{padding:"2px"}}
            >
            &nbsp;
            </div>
    }
});

var StudioFormApp = React.createClass({
    render:function(){
            return <div> 
                <div className="row" style={{marginBottom:"5px"}}>
                    <div className="col-md-12">
                        <WidgetLists />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <PageLayout />
                    </div>
                    <div className="col-md-10">
                        <PageStudio />
                    </div>
                </div>
            </div>
    }
});

ReactDOM.render(<StudioFormApp />, document.getElementById("panel_form"));