const Free = require('../database/posts/free');
const Notice = require('../database/posts/notice');

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