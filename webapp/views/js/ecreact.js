var EC = {}
window.EC = EC;

class ECGrid extends React.Component {
    componentDidMount() {
        $(this.refs.main).kendoGrid(this.props.config);
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
    
    refresh(cfg){
        $(this.refs.main).data("kendoGrid").refresh();
    }

    render(){
        return <div className="ecgrid" ref="main"></div>
    }
};

EC.Grid = ECGrid;
