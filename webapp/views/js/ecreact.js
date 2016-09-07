var EC = {}
window.EC = EC;

class ECGrid extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        $(this.refs.main).data("kendoGrid").destroy();
    }

    hide(){
        $(this.refs.main).hide();
    }

    show(){
        $(this.refs.main).show();
    }

    initGrid(cfg){
        var mainObj = $(this.refs.main);
        if(mainObj.data("kendoGrid")!=undefined){
            $(this.refs.main).data("kendoGrid").destroy();
        }
        $(this.refs.main).kendoGrid(cfg);
    }

    setData(data){
        var mainObj = $(this.refs.main);
        if(mainObj.data("kendoGrid")!=undefined){
            mainObj.data("kendoGrid").setDataSource(new kendo.data.DataSource({data:data}));
        }
    }   

    refresh(cfg){
        if(cfg==undefined || cfg==null){
            $(this.refs.main).data("kendoGrid").refresh();
        }
    }

    render(){
        return <div className="ecgrid" ref="main"></div>
    }
};
//EC.Grid = ECGrid;

class ECDataBrowser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            simpleQuery: "",
            gridConfig: {}
        };
    }

    componentDidMount(){
        this.refs.grid.initGrid(this.props.gridConfig);
    }

    initGrid(cfg){
        this.refs.grid.initGrid(cfg);
    }

    handleState(event){
        handleState(this,event);
    }

    hide(){
        $(this.refs.main).hide();
    }

    show(){
        $(this.refs.main).show();
    }

    setData(data, currentPage, pageCount){
        this.refs.grid.setData(data)
    }

    refresh(){
        var q = this.state.simpleQuery;
        var refreshQuery = {
            q: q
        };
        this.refs.grid.refresh(refreshQuery);
    }

    add(){
    }

    delete(){
        confirm("Are you sure you want to delete selected data ?");
    }

    manage(){
    }

    render(){
        var searchControls, buttonControls, divControls;

        searchControls = this.props.hideSearch=="true" ? <div></div> :  
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
                        </div>;

        buttonControls =  this.props.hideButton=="true" ? <div></div> : 
                        <div>
                        <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-primary" onClick={this.add}>Add New</button>
                            <button type="button" className="btn btn-sm btn-warning" onClick={this.delete}>Delete</button>
                        </div>
                        &nbsp;&nbsp;
                        <button type="button" className="btn btn-sm btn-primary" onClick={this.manage}>
                            <span className="glyphicon glyphicon-cog"></span>
                        </button>
                        </div>;

        divControls = this.props.hideSearch=="true" ? 
                    <div style={{marginBottom:5+"px"}} className="row">
                    <div className="col-sm-12">
                        {buttonControls}
                    </div>
                    </div> :
                    <div style={{marginBottom:5+"px"}} className="row">
                    <div className="col-sm-6">
                        {searchControls}
                    </div>
                    <div className="col-sm-6">
                        {buttonControls}
                    </div>
                    </div>

        return <div ref="main">
                {divControls}
                <ECGrid ref="grid" />
            </div>;
    }
};
EC.DataBrowser = ECDataBrowser;
