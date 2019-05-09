var fs=require('fs');
var bodyParser=require('body-parser');
var urlencodedParser=bodyParser.urlencoded({extended: false});

var dbdata=fs.readFileSync('db.json');
var data=JSON.parse(dbdata);

module.exports=function(app){
    
    app.get('/', function(req,res){
        res.render('index');
    });
    
    app.get('/todo',function(req,res){
        res.render('todo',{todos: data});
    });
    
    app.post('/todo', urlencodedParser, function(req,res){
        data.push(req.body);
        res.json(data);      //res.json() is same as res.send() but explitly in json format
        var dataz=JSON.stringify(data);
        fs.writeFile('db.json',dataz,function(){
            console.log('db updated');
        })
    });
    
    app.delete('/todo/:item',function(req,res){
        data=data.filter(function(todo){
            return todo.item.replace(/ /g, '-')!==req.params.item;
        });
        res.json(data);
        var dataz=JSON.stringify(data);
        fs.writeFile('db.json',dataz,function(){
            console.log('db updated');
        })
    });
    
};