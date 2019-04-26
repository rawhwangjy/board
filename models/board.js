var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Counter model
var CounterSchema = new Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
});
var counter = mongoose.model('counter', CounterSchema);

// Board model
var boardSchema = new Schema({
    idx: Number,
    name: String,
    title: String,
    content: String,
    date: { type: Date, default: Date.now }
});

// middleware
// 미들웨어 (프리 훅 및 포스트 훅 이라고도 함)는 비동기 함수 실행 중에 제어를 통과하는 함수입니다. 미들웨어는 스키마 레벨에서 지정되며 플러그인 작성에 유용합니다.
boardSchema.pre('save', function(next) {
    var doc = this;
    counter.findByIdAndUpdate({_id: 'board_id'}, {$inc: {seq: 1}}, function(error, counter)   {
        if(error) return next(error);
        doc.idx = counter.seq;
        next();
    });
});

module.exports = mongoose.model('board', boardSchema);