const router = require('express').Router();
const Free = require('../database/posts/free');
const NoticE = require('../database/posts/notice');


router.post('/free', async (req, res) => {
    try{
        if(req.session.isLogin === true){
            var confirm = confirm("정말로 삭제하시겠습니까?");
            if(confirm == true){
                Free.findOne({id : req.params.id});
            }
        }
    }
})

module.exports = router;