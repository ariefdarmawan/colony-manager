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
        console.log(cfg);
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

EC.Grid = ECGrid;
