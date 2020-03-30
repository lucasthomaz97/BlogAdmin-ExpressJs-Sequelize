const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Post = require('./models/Post')
var dlt = false
var edit = false

//body parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// config
//template engine
app.engine('handlebars',handlebars({defaultLayout:'main'}))
app.set('view engine', 'handlebars')

//rotas
app.get('/',function(req, res){
    Post.findAll({order:[['id', 'DESC']]}).then(function(posts){
        res.render('home', {posts:posts, del: dlt, edit:edit})
        dlt = false
        edit = false
    })
})

app.get('/cadastro', function(req, res){
    res.render(__dirname+'/views/formulario')
})

app.get('/editar/:id', function(req, res){
    Post.findOne({where:{id:req.params.id}}).then(function(epost){
        res.render(__dirname+'/views/editar',{epost:epost})
    })
})

app.post('/edit/:id', function(req, res){
    Post.update({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
      },{where: { id: req.params.id }
        }).then(function(){
            edit = true
            res.redirect('/')
    }).catch(function(erro){
        res.send('Houve um erro, segue a descrição:<br>'+erro)
    })
})

app.post('/add', function(req, res){
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function(){
        res.redirect('/')
    }).catch(function(erro){
        res.send('Houve um erro, segue a descrição:<br>'+erro)
    })
})

app.get('/deletar/:id', function(req, res){
    Post.destroy({where: {'id': req.params.id}}).then(function(){
        dlt = true  
        res.redirect('/')  
    }).catch(function(erro){
            res.send('Erro:<br>'+erro)
        })
})

//iniciar servidor
app.listen(8081,function(){
    console.log('Servidor rodando em http://localhost:8081')
})