const crypto = require('crypto');

const CHECK_LIST = {
    app: [
        { property: 'title', reg: /^.{2,10}$/, message: '2자 이상, 10자 이내로 제목을 입력해주세요!' },
        { property: 'contents', reg: /.+/m, message: '내용을 입력해주세요!' }
    ]
};

module.exports = {

    checkProperty: (data, service, strict) => {
        let result = {};
        for (const item of CHECK_LIST[service]) {
            if (data[item.property] && item.reg.exec(data[item.property])) {
                result[item.property] = data[item.property];
            } else {
                if (!strict && !data[item.property]) continue;
                return { message: item.message, data: null };
            }
        }
        return { message: 'SUCCESS', data: result };
    }

};