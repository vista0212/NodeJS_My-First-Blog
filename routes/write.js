const router = require('express').Router();
const Free = require('../database/posts/free');
const Notice = require('../database/posts/notice');
const postTools = require('../tools/postTools');
const rndstring = require('randomstring');
const controller = require('../controllers/postcontroller');

const send = (res, message) => {
    return res.send(`<script>alert('${message}');history.back()</script>`);
}

router.get('/free', async (req, res) => {
    try{
        if(req.session.isLogin === true){
            return res.render('freepost');
        } else{
            return res.send('<script>alert("권한이 없습니다!");location.href="/"</script>');
        }
    } catch(err){
        return res.send('<script>alert("알 수 없는 오류");location.href="/"</script>');
    }
})

router.get('/notice', async (req, res) => {
    try{
        if(req.session.isLogin === true){
            return res.render('noticepost');
        } else{
            return res.send('<script>alert("권한이 없습니다!");location.href="/"</script>');
        }
    } catch(err){
        return res.send('<script>alert("알 수 없는 오류");location.href="/"</script>');
    }
})

router.post('/freepost', async (req, res) => {
    try{
        if(req.session.isLogin === true){
            const result = postTools.checkProperty(req.body, 'app', true);
            if(result.message === 'SUCCESS'){
                let addNewId = rndstring.generate(12);
                let addNewTitle = req.body.title;  
                let addNewContents = req.body.contents;
                addFree(addNewId, addNewTitle, addNewContents);

                return res.send('<script>alert("글이 작성되었습니다.");location.href="/"</script>');
            } else{
                return send(res, result.message);
            }
        } else{
            return res.send('<script>alert("권한이 없습니다!");location.href="/"</script>');
        }
    } catch(err){
        console.log(err);
        return res.send('<script>alert("알 수 없는 오류");location.href="/"</script>');
    }
})

router.post('/noticepost', async (req, res) => {
    try{
        if(req.session.isLogin === true){
            const result = postTools.checkProperty(req.body, 'app', true);
            if(result.message === 'SUCCESS'){
                var addNewId = rndstring.generate(12);
                var addNewTitle = req.body.title;
                var addNewContents = req.body.contents;
                addNotice(addNewId, addNewTitle, addNewContents);

                return res.send('<script>alert("글이 작성되었습니다.");location.href="/"</script>');
            } else{
                return send(res, result.message);
            }
        } else{
            return res.send('<script>alert("권한이 없습니다!");location.href="/"</script>');
        }
    } catch(err){
        console.log(err);
        return res.send('<script>alert("알 수 없는 오류");location.href="/"</script>');
    }
})

function addFree(id, title, contents){
    var newFree = new Free;

    newFree.id = id
    newFree.title = title;
    newFree.contents = contents;
    newFree.save(function (err) {
        if (err) throw err;
    });
}

function addNotice(id, title, contents){
    var newNotice = new Notice;

    newNotice.id = id
    newNotice.title = title;
    newNotice.contents = contents;
    newNotice.save(function (err) {
        if (err) throw err;
    });
}

module.exports = router;