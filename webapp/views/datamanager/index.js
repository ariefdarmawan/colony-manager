
setPageTitle("Data Manager")

var models = [
    {id:"_id", type:"string", label:"ID"},
    {id:"title", type:"string", label:"Title"},
    {id:"type", type:"string", label:"Type"},
    {id:"connectioninfo", type:"string", label:"Connection"}
]

var config = new GridConfig().set("dataSource",{
                pageSize:10, 
                data: []
            }).
            set("filterable",false).
            metadataFromUrl("http://localhost:9100/metadata","datasource").
            fetch();

var GridWidget = React.createClass({
    getInitialState : function(){
        return {
            simpleQuery : ""
        };
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
        return <div ref="main">
                <div style={{marginBottom:5+"px"}} className="row">
                    <div className="col-sm-6">
                        <div className="input-group input-group-sm">
                            <input type="text" className="form-control" ref="bind_simpleQuery" 
                                placeholder="Search for ..." 
                                data-bind="simpleQuery"
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
                <EC.Grid config={config} ref="grid" />
            </div>;
    }
});

ReactDOM.render(<GridWidget />, 
    document.getElementById("panel_grid"));