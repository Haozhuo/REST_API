'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var compareFunction = function(n1, n2){
    if(n1.votes === n2.votes){
        return (n2.updatedAt - n1.updatedAt);
    }
    return (n2.votes - n1.votes);
};

var answerSchema = new Schema({
    'text': String,
     createdAt: {type: Date, default: Date.now},
     updatedAt: {type: Date, default: Date.now},
     votes: {type: Number, default: 0}
});

answerSchema.method("update", function(updates, callback) {
	Object.assign(this, updates, {updatedAt: new Date()});
	this.parent().save(callback);
});

answerSchema.method("vote", function(vote, callback) {
	if(vote === "up") {
		this.votes += 1;
	} else {
		this.votes -= 1;
	}
	this.parent().save(callback);
});

var questionSchema = new Schema({
    'text': String,
    'time': {type: Date, default:Date.now},
    'answers': [answerSchema]
});
/*
answerSchema.methods.update = function(updates, callback){
    //this == document
    Object.assign(this, updates, {updatedAt: new Date()});
    this.parent().save(callback);
};*/



/*answerSchema.methods.vote = function(vote, callback){
    //this == document
    if(vote === "up"){
        this.votes += 1;
    }else{
        this.votes -= 1;
    }

    this.parent().save(callback);
};*/

questionSchema.pre('save',function(next){
    this.answers.sort(compareFunction);
    //console.log(this.answers);
    next();
});


var Question = mongoose.model('Question', questionSchema);
module.exports = Question;
