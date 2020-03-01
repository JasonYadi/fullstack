const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    /** 称号 */
    title: {
        type: String
    },
    /** 类型 */
    categories: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category'
    }],
    /** 评分 */
    scores: {
        /** 难度 */
        difficult: {
            type: Number
        },
        /** 技能 */
        skills: {
            type: Number
        },
        /** 攻击 */
        attack: {
            type: Number
        },
        /** 生存 */
        survive: {
            type: Number
        },

    },
    /** 技能 */
    skills: [{
        icon: {type: String},
        name: {type: String},
        description: {type: String},
        tips: {type: String}
    }],
    /** 装备 */
    /** 顺风 */
    goods1: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Good'
    }],
    /** 逆风 */
    goods2: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Good'
    }],
    /** 使用技巧 */
    usageTips: {type: String},
    /** 对抗技巧 */
    battleTips: {type: String},
    /** 团战思路 */
    teamTips: {type: String},
    /** 搭档 */
    partners: [{
        hero: {type: mongoose.SchemaTypes.ObjectId, ref: 'Hero'},
        description: {type: String}
    }],
    



});

module.exports = mongoose.model('Hero', schema);