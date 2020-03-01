module.exports = app => {
    const express = require('express');
    const assert = require('http-assert');
    const jwt = require('jsonwebtoken');
    const AdminUser = require('../../models/AdminUser');
    const router = express.Router({
        mergeParams: true
    });
    /** 鉴权中间件 */
    const authMiddleware = require('../../middleware/auth')({
        app
    });
    /** 资源中间件 */
    const resourceMiddleware = require('../../middleware/resource');
    /** 新增 */
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body);
        res.send(model);
    });

    /** 修改 */
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
        res.send(model);
    });

    /** 获取数据 */
    router.get('/', async (req, res) => {
        let queryOptions = {},
            modelName = req.Model.modelName;
        if (modelName === 'Category') {
            queryOptions.populate = 'parent'
        } else if (modelName === 'Hero') {
            // queryOptions.populate = 'categories'
        }
        const model = await req.Model.find().setOptions(queryOptions);
        res.send(model);
    })

    /** 获取详情 */
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id);
        res.send(model);
    })

    /** 删除 */
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id);
        res.send({
            success: true,
            message: '删除成功'
        })
    })
    /**  */
    app.use('/admin/api/rest/:resource', authMiddleware, resourceMiddleware(), router);
    
    /** 上传文件 */
    const multer = require('multer');
    const upload = multer({dest: __dirname + '/../../uploads/'});
    app.post('/admin/api/upload',upload.single('file'), authMiddleware, async (req, res) => {
        const file = req.file;
        file.url = `http://localhost:3000/uploads/${file.filename}`;
        res.send(file);
    }, router);

    /** 登录 */
    app.post('/admin/api/login', async (req, res) => {
        const {username, password} = req.body;
        //1.根据用户名查找用户
        const user = await AdminUser.findOne({username}).select('+password');
        assert(user, 422, '用户不存在');
        //2.校验密码
        const isValid = require('bcrypt').compareSync(password || '', user.password);
        assert(isValid, 422, '密码错误');
        //3.返回token
        const token = jwt.sign({id: user._id}, app.get('secret'));
        res.send({
            token,
            success: true
        })
    });

    /** 错误处理函数 */
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}