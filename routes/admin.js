const router = require('express').Router();
const jsonfile = require('jsonfile');
const account = require('../config/account');

router.get('/auth', (req, res) => {
    res.redirect('/auth.html');
})

router.post('/auth', (req, res) => {
    if (req.body.userID === account.user_id && req.body.userPW === account.user_pw) {
        req.session.isLogin = true;
        return res.redirect('/');
    } else {
        req.session.destroy();
        return res.send("<script>alert('아이디 혹은 비밀번호가 틀렸습니다!');location.href='/auth.html'</script>");
    }
})

module.exports = router;