const router = require('express').Router();
const Free = require('../database/posts/free');
const Notice = require('../database/posts/notice');

router.get('/view', async (req, res) => {
    try{
        var category = req.param('category');
        var contentId = req.param('id');
        if(category === 'free'){
            await Free.findOne({id:contentId}, function(err, rawContents){
                if(err){
                    res.send('<script>alert("오류가 발생했습니다.");location.href="/"</script>');
                }
                rawContents.count += 1;
                rawContents.save(function(err){
                    if(err){
                        res.send('<script>alert("오류가 발생했습니다.");location.href="/"</script>');
                    }
                    res.render('view', {title: "자유게시판", contents: rawContents});
                })
            })
        } else if(category === 'notice'){
            await Notice.findOne({id:contentId}, function(err, rawContents){
                if(err){
                    res.send('<script>alert("오류가 발생했습니다.");location.href="/"</script>');
                }
                rawContents.count += 1;
                rawContents.save(function(err){
                    if(err){
                        res.send('<script>alert("오류가 발생했습니다.");location.href="/"</script>');
                    }
                    res.render('view', {title: "공지사항", contents: rawContents});
                })
            })
        }
    } catch(err){
        return res.send('<script>alert("알 수 없는 오류");location.href="/"</script>');
    }
})

module.exports = router;