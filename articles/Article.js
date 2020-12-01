const Sequelize = require('sequelize');
const connection = require('../database/database');
const Category = require('../categories/Category');

const Article =  connection.define('articles',{
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false
    }
    
})

Category.hasMany(Article); //Uma categoria possui muitos artigos
Article.belongsTo(Category); //Um artigo pertence a uma categoria

//Article.sync({force: true})

module.exports = Article;