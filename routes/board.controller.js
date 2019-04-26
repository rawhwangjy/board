var Board = require('../models/board');

exports.index = (req, res) => {
    res.render('index')
};
exports.list = (req, res) => {
    //res.send('why');
    Board.find(function(err, board){
        if(err) return res.status(500).send({error: 'database failure'});
        //res.send(boards);
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

    // Board.findOne({_id: req.params._id}, function(err, board){
    //     if(err) return res.status(500).json({error: err});
    //     if(!board) return res.status(404).json({error: 'board not found'});
    //     res.render('view', {
    //         name: board.name,
    //         date: board.date,
    //         title: board.title,
    //         content: board.content
    //     })
    // })
};
exports.write = (req, res) => { // 화면 라우팅 // new 면 새화면 // 수정이면 input에 value 추가
    if(req.params._id){ // id값 있으면 => 수정
        console.log('글 수정 라우팅');
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
    }else{ // id값 없으면 => new
        console.log('new 글 라우팅');
        res.render('write', {
            action: '/board',
            method: 'post'
        });
    }
};
exports.insert = (req, res) => { // DB 추가, 수정
    if(req.params._id){ // id값 있으면 => 수정
        console.log('글 수정 db 보내기');
        // 5cb6c921a5262b4d485295ca
        // ObjectId("5cb6c921a5262b4d485295ca")
        Board.findById(req.params._id, function(err, board){
            console.log('222222222222222');
            if(req.body._id) board._id = req.body._id;
            if(req.body.name) board.name = req.body.name;
            if(req.body.title) board.title = req.body.title;
            if(req.body.content) board.content = req.body.content;
            if(req.body.date) board.date = req.body.date;

            board.save((err) => {
                console.log('333333333333');
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
    }else{ // id값 없으면 => new
        console.log('글 new db 보내기');
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
    console.log(_id);
    
    Board.deleteOne({ _id: req.params._id}, function(err){
        console.log('삭제완료');
        console.log(req.body._id);
        console.log(req.params._id);
        res.redirect('/');
    });
    // if(req.params._id){
    //     console.log('bb');
    //     Board.remove({ _id: req.params.board_id }, function(err, output){
    //         if(err) return res.status(500).json({ error: "database failure" });
    //         console.log('삭제완료');
    //         res.render('list', {
    //             board_list: boards
    //         })
    //         res.status(204).end();
    //     });
    // }
    // Board.deleteMany({ _id: req.params.board_id}, function(err, output){

    //     // if(err) return res.status(500).json({ error: "database failure" });
    //     // res.status(204).end();
    // });

//https://www.zerocho.com/category/MongoDB/post/579ecb1fc097d015000404dd

};






// exports.show = (req, res) => {
//     const id = parseInt(req.params.id, 10);
//     if (!id) {
//         return res.status(400).json({error: 'Incorrect id'});
//     }
//     let user = users.filter(user => user.id === id)[0]
//     if (!user) {
//         return res.status(404).json({error: 'Unknown user'});
//     }
//     return res.json(user);
// };

// exports.destroy = (req, res) => {
//     const id = parseInt(req.params.id, 10);
//     if (!id) {
//         return res.status(400).json({error: 'Incorrect id'});
//     }
//     if (userIdx === -1) {
//         return res.status(404).json({error: 'Unknown user'});
//     }
//     users.splice(userIdx, 1);
//     res.status(204).send();
// };

// exports.create = (req, res) => {
//     const name = req.body.name || '';
//     if (!name.length) {
//         return res.status(400).json({error: 'Incorrenct name'});
//     }
//     const id = users.reduce((maxId, user) => {
//         return user.id > maxId ? user.id : maxId
//     }, 0) + 1;
//     const newUser = {
//         id: id,
//         name: name
//     };
//     users.push(newUser);
//     return res.status(201).json(newUser);
// };

// exports.delete = (req, res) => {
//     Board.deleteMany({ _id: req.params.board_id}, function(err, output){
//         // if(err) return res.status(500).json({ error: "database failure" });
//         // res.status(204).end();
//     })
// };

/*
    app.js: 익스프레스로 서버 설정 및 구동
    api/user/index.js: User API에 대한 라우팅 설정
    api/user/user.controller.js: User API에 대한 실제 로직
*/