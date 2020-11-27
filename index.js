const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require("express-session");
const connection = require('./database/database');

const categoriesController = require('./categories/CategoriesController');
const ArticleController = require('./articles/ArticleController');
const UserController = require('./user/UserController');

const Article = require("./articles/Article");
const Category = require("./categories/Category");
const User = require("./user/User");

//view engine
app.set('view engine', 'ejs');

//session
app.use(session({
    secret: "password",
    cookie: {maxAge: 1800000}
}));

// Redis -> armazenamento de seções 

//dir estatic
app.use(express.static('public'));

//body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//database
connection.authenticate().then(
    () => {
        console.log("Conexão feita com sucesso");
    }).catch((error) => {
    console.log(error);
});

app.use("/", categoriesController); //diz para a aplicação que quero utilizar 
//aquelas rotas que estão nesta variavel exportada do arquivo

app.use("/", ArticleController);

app.use("/", UserController);



app.get('/', function(req, res){

    Article.findAll({
        order: [
            ['id','DESC']
        ],
        limit: 4
    }).then(articles => {

        Category.findAll().then(categories =>{
            res.render('index', {articles: articles, categories: categories});            
        });

    });
    
});

app.get("/:slug", (req, res) => {
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined){
            Category.findAll().then(categories =>{
                res.render('article', {article: article, categories: categories});            
            });
        }else{
            res.redirect("/");
        }
    }).catch(error => {
        res.redirect("/");
    })
});

app.get("/category/:slug", (req, res) => {
    var slug = req.params.slug;

    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then(category => {
        if(category != undefined){
            
            Category.findAll().then(categories => {
                res.render("index", {articles: category.articles,categories: categories});
            })

        }else{
            res.redirect("/");
        }
    }).catch( err => {
        res.redirect("/");
    });
})

app.listen(3333);
//npx kill-port 3333