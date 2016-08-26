
setPageTitle("Data Manager")

var models = [
    {id:"_id", type:"string", title:"ID"},
    {id:"title", type:"string", title:"Title"},
    {id:"type", type:"string", title:"Type"},
    {id:"connectioninfo", type:"string", title:"Connection"}
]

var gridConfig = new GridConfig().set("dataSource",{
                pageSize:10, 
                data: []
            }).
            set("columns",models).
            set("filterable",false).
            metadataFromUrl("http://localhost:9100/metadata","datasource");

var GridWidget = React.createClass({
    getInitialState : function(){
        return {
            simpleQuery : ""
        };
    },    
    componentDidMount: function () {
       this.refs.grid.initGrid(gridConfig.fetch());
    },
    handleState : function(event){
        handleState(this,event);
    },
    hide : function(){
        $(this.refs.main).hide();
    },
    show : function(){
        $(this.refs.main).show();
    },
    refresh : function(){
        var q = this.state.simpleQuery;
        var refreshQuery = {
            q: q
        };
        this.refs.grid.refresh(refreshQuery);
    },
    add : function(){

    },
    delete : function(){

    },
    manage : function(){

    },
    render : function(){
        var gcfg = this.state.gridConfig;
        return <div ref="main">
                <div style={{marginBottom:5+"px"}} className="row">
                    <div className="col-sm-6">
                        <div className="input-group input-group-sm">
                            <input type="text" className="form-control" ref="bind_simpleQuery" 
                                placeholder="Search for ..." 
                                data-bind="simpleQuery" value={this.state.simpleQuery} 
                                onChange={this.handleState}
                                />
                            <span className="input-group-btn">
                                <button className="btn btn-sm btn-default" type="button" 
                                    onClick={this.refresh}>Refresh</button>
                                <button className="btn btn-sm btn-default">
                                    <span className="glyphicon glyphicon-tasks"></span>
                                </button>
                            </span>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-primary" onClick={this.add}>Add New</button>
                            <button type="button" className="btn btn-sm btn-warning" onClick={this.delete}>Delete</button>
                        </div>
                        &nbsp;&nbsp;
                        <button type="button" className="btn btn-sm btn-primary" onClick={this.manage}>
                            <span className="glyphicon glyphicon-cog"></span>
                        </button>
                    </div>
                </div>
                <EC.Grid ref="grid" />
            </div>;
    }
});

ReactDOM.render(<GridWidget />, 
    document.getElementById("panel_grid"));