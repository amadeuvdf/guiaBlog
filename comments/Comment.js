const Sequelize = require('sequelize');
const connection = require('../database/database');
const Article = require('../articles/Article');

const Comments =  connection.define('comments',{
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }, body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Article.hasMany(Comments); //Um artigo possui muitos comentarios
Comments.belongsTo(Article); //Um Commentario pertence a um Artigo

//Comments.sync({force: true});

module.exports = Comments;