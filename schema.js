const mongoose = require('mongoose');
const todoschema = new mongoose.Schema(
    {
        description: {
            type:String,
            required:true
        },
        category: {
            type:String,
            required:false
        },
        date: {
            type:Date,
            required:false
        }
    }
);
const tododata = mongoose.model('tododata',todoschema);
module.exports = tododata;