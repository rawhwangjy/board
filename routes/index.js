var express = require('express');
var router = express.Router();
var controller = require('./board.controller');

router.get('/', controller.list); // 전체 보기
router.get('/board', controller.write); // 글쓰기 화면 라우팅
router.post('/board', controller.insert); // 글쓰기 저장

router.get('/board/view/:_id', controller.view); // 특정 글 보기
router.get('/board/edit/:_id', controller.write); // 글수정 화면 라우팅
router.put('/board/post/:_id', controller.insert); // 글 수정 저장


router.delete('/board/del', controller.delete); // 삭제

module.exports = router;