var Board = require('../models/board');

exports.index = (req, res) => {
    res.render('index')
};
exports.list = (req, res) => {
    Board.find(function(err, board){
        if(err) return res.status(500).send({error: 'database failure'});
        res.render('list', {
            board_list: board
        })
    })
};
exports.view = (req, res) => {
    Board.findById(req.params._id,  function(err, board){
        if(err) return res.status(500).json({error: err});
        if(board.length === 0) return res.status(404).json({error: 'board not found'});
        res.render('view', {
            _id: board._id,
            name: board.name,
            title: board.title,
            content: board.content,
            date: board.date
        })
    })
};
exports.write = (req, res) => {
    if(req.params._id){
        Board.findById(req.params._id,  function(err, board){
            res.render('write', {
                action: '/board/post/',
                method: 'put',
                _id: board._id,
                idx: board.idx,
                name: board.name,
                title: board.title,
                content: board.content,
                date: board.date
            });
        });
    }else{
        res.render('write', {
            action: '/board',
            method: 'post'
        });
    }
};
exports.insert = (req, res) => {
    if(req.params._id){
        Board.findById(req.params._id, function(err, board){
            if(req.body._id) board._id = req.body._id;
            if(req.body.name) board.name = req.body.name;
            if(req.body.title) board.title = req.body.title;
            if(req.body.content) board.content = req.body.content;
            if(req.body.date) board.date = req.body.date;

            board.save((err) => {
                if(err){
                    console.error(err);
                    return;
                }
                res.render('view', {
                    _id: board._id,
                    idx: board.idx,
                    name: board.name,
                    title: board.title,
                    content: board.content,
                    date: board.date
                })
            });
        })
    }else{
        var board = new Board();
        board.name = req.body.name;
        board.title = req.body.title;
        board.content = req.body.content;
        board.date = new Date();
        board.save((err) => {
            if(err){
                console.error(err);
                return;
            }
            res.render('view', {
                _id: board._id,
                idx: board.idx,
                name: board.name,
                title: board.title,
                content: board.content,
                date: board.date
            })
        })
    }
};
exports.delete = (req, res) => {
    Board.deleteOne({ _id: req.params._id}, function(err){
        res.redirect('/');
    });

};