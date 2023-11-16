const express = require('express');
const PORT = 8080;
const path = require('path');
const mongoose = require('./config/mongoose');
const tododata = require('./models/schema');

const app = express();
app.use(express.static('assets'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));

app.get('/',function(req,res){
    const list1 = tododata.find({}).exec();
    list1.then(data =>{
        res.render('todoejs',{'data':data});
    })
    .catch(err => console.log("Error in fetching data"));
});

app.post('/add_data', function(req,res){
    const task = new Promise((resolve,reject) =>{
        tododata.create({
            description:req.body.description,
            category:req.body.category,
            date:req.body.date
        }).then(newdata =>{
            console.log("New task added successfully",newdata);
            resolve(newdata);
        }).catch( err => {
            console.log("error in creating data");
            reject(err);
        });
    });
        task.then(data =>{
            res.redirect('back');
        })
        .catch((err) =>{
            console.log("Error in creation");
        });
});

app.get('/delete_data',function(req,res){
    var id=req.query;
    var len = Object.keys(id).length;
    var deletePromises = [];
    for(let i=0;i<len;i++){
        deletePromises.push(tododata.findByIdAndDelete(Object.keys(id)[i]));
    }
    Promise.all(deletePromises)
    .then(() =>{
        console.log("task(s) deleted successfully");
        return res.redirect('back');
    })
    .catch((err) => {
        console.log("Error in deleting data",err);
        return res.redirect('back');
    })
});

app.listen(PORT,function(err){
    if(err){
        console.log("Server is not Running");
        return;
    }
    console.log("Server is Running on the port : ",PORT);
});
