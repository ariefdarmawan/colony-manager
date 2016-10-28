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

var dsWidgetList = new kendo.data.HierarchicalDataSource({
                    data: [
                        {widgetid:"datasource",title:"Data Source",
                            widgets:[
                                {widgetid:"ds01",title:"Production Report [HDFS Flat]"},
                                {widgetid:"ds02",title:"Production Costing [SAP]"},
                                {widgetid:"ds03",title:"Work Attendance [SQLServer]"},
                                {widgetid:"ds04",title:"Production Model [Memory]"}
                            ]},
                        {widgetid:"widget",title:"Widgets"}    
                    ],
                    schema: {
                        model: {
                            children: "widgets"
                        }
                    }
                });

var PageLayout = React.createClass({
    componentDidMount: function(){
        var thisObj = $(this.refs.layoutwidgetlist);
        thisObj.kendoTreeView({
            dataSource: dsWidgetList,
            dataTextField: ["title"]
        });
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