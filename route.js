'use strict';

var express = require('express');
var router = express.Router();

var Question = require('./models.js');

router.param("qId", function(req,res,next,id){
    Question.findById(id, function(err, doc){
        if(err){
            return next(err);
        } else if(!doc){
            error = new Error("Not Found");
            error.status = 404;
            return next(error);
        } else{
            req.question = doc;
            return next();
        }
    });
});

router.param("aId", function(req,res,next,id){
    req.answer = req.question.answers.id(id);
    if(!req.answer){
        error = new Error("Not Found");
        error.status = 404;
        return next(error);
    } else{
        next();
    }
});

//GET /questions
router.get('/', function(req,res, next){
    Question.find({}, null, {sort: {"time": -1}},function(err, question){
        if(err){
            return next(err);
        }else{
            res.json(question);
        }
    });
});

//POST /questions
router.post('/', function(req,res,next){
    var question = new Question(req.body);
    question.save(function(err, question){
        if(err){
            return next(err);
        }else{
            res.status(201);
            res.json(question);
        }
    });
});

router.get('/:qId', function(req,res){
    res.json(req.question);
});

//Route for creating an answer
router.post('/:qId/answers', function(req, res, next){
    req.question.answers.push(req.body);
    req.question.save(function(err, question){
        if(err){
            return next(err);
        }else{
            res.status(201);
            res.json(question);
        }
    });
});

//Edit a specific answer
router.put('/:qId/answers/:aId',function(req, res){
    req.answer.update(req.body, function(err, result){
        if(err){
            return next(err);
        } else{
            res.json(result);
        }
    });
});

//delete a specific answer/
router.delete("/:qId/answers/:aId",function(req, res){
    req.answer.remove(function(err){
        req.question.save(function(err, question){
            if(err){
                return next(err);
            } else{
                res.json(question);
            }
        });
    });
});

//vote-up ;POST
//vote-down; POST
router.post('/:qId/answers/:aId/vote-:dir',
    function(req, res, next){
        if(req.params.dir != "up" && req.params.dir != "down"){
            var err = new Error("Not Found");
            err.status = 404;
            next(err);
        }
        else{
            req.voteOfUser = req.params.dir;
            next();
        }
    },
    function(req, res, next){
        req.answer.vote(req.voteOfUser, function(err, question){
            if(err)
                return next(err);
            res.json(question);
    });
});


module.exports = router;
