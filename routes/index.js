var express = require('express');
var router = express.Router();
var controller = require('./board.controller');

//router.get('/', controller.index);

router.get('/', controller.list); // 전체 보기
router.get('/board', controller.write); // 글쓰기 화면 라우팅
router.post('/board', controller.insert); // 글쓰기 저장

router.get('/board/view/:_id', controller.view); // 특정 글 보기
router.get('/board/edit/:_id', controller.write); // 글수정 화면 라우팅
router.put('/board/post/:_id', controller.insert); // 글 수정 저장


router.delete('/board/:id', controller.delete); // 삭제

module.exports = router;



/*

get
put

URI가 똑같다
method 를 이용해 알아서 잡아서 들어가는데
그걸 제대로 못 하거나

그래서 get으로 들어간다




view 화면 가면 무조건 create 된다.




Client ===> Server ===> DB ===> Server ===> Client
User ===> Controller ===> Model ===> (controller) ===> View ===> User


view -> controller -> model -> controller -> User

*/