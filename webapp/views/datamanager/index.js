
setPageTitle("Data Manager")

var models = [
    {width:30, template:"<input type='checkbox'>"},
    {id:"_id", field:"_id", type:"string", title:"ID"},
    {id:"type", field:"type", type:"string", title:"Type"},
    {id:"connectioninfo", type:"string", title:"Connection"}
]

var gridData = [{"_id":"DS01","title":"Z01FK001 Flat File / FTP", "type":"Flat"},
                    {"_id":"DS02","title":"Z01FK002 Flat File / HDFS", "type":"HDFS"},
                    {"_id":"DS03","title":"Z0321102 MongoDb 190", "type":"Mongo"}];

var gridConfig = new GridConfig().set("dataSource",{
                pageSize:2, 
                data: gridData,
                serverPaging: true
            }).
            //set("columns",models).
            set("pageable",true).
            set("filterable",false).
            metadataFromUrl("http://localhost:9100/restapi/metadata?modelname=connection");

var ds = {
        url:"http://localhost:9100/restapi/populate",
        postdata:function(obj){
                return {}; 
            }
        };

var gf = gridConfig.fetch();

var DbrConn = React.createClass({
    componentDidMount: function(){
        this.refs.dbrConn.populate();
    },
    render : function(){
        return <div>
            <EC.DataBrowser ref="dbrConn" gridConfig={gf} dataSource={ds} />
            </div>;
    }
});

ReactDOM.render(<DbrConn />, document.getElementById("panel_grid"));