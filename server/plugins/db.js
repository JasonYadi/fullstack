module.exports = app => {
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }, err => {
        if (err) {
            console.log('数据库连接失败')
        } else {
            console.log('数据库连接成功')
        }
    })
}