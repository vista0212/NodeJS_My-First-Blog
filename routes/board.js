const router = require('express').Router();
const Free = require('../database/posts/free');
const Notice = require('../database/posts/notice');

router.get('/board', (req,res) => {

    var page = req.param('page');
    var limit = 10;
    var category = req.param('category');
    if(page == null){
        page = 1;
    }
    if(category === 'free'){
        Free.count({},function(err,count){
            if(err){
                return res.send('<script>alert("오류가 발생했습니다.");location.href="/"</script>');
            }
            var skip = (page-1)*limit;
            var maxPage = Math.ceil(count/limit);
            Free.find({}).sort({date: -1}).skip(skip).limit(limit).exec(function (err, rawContents) {
                if(err){
                res.send('<script>alert("오류가 발생했습니다.");location.href="/"</script>');
                }
                res.render("board", {title: '자유게시판', page: page, maxPage: maxPage, contents: rawContents, category: category});
            })
        })
    } else if(category === 'notice'){
        Notice.count({},function(err,count){
            if(err){
                return res.send('<script>alert("오류가 발생했습니다.");location.href="/"</script>');
            }
            var skip = (page-1)*limit;
            var maxPage = Math.ceil(count/limit);
            Notice.find({}).sort({date: -1}).skip(skip).limit(limit).exec(function (err, rawContents) {
                if(err){
                res.send('<script>alert("오류가 발생했습니다.");location.href="/"</script>');
                }
                res.render("board", {title: '공지사항', page: page, maxPage: maxPage, contents: rawContents, category: category});
            })
        })
    }
})

module.exports = router;