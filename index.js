const express = require('express')
const handlebars = require('express-handlebars')
const bodyparser = require('body-parser')
const app = express()
const port = 3081

app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

var resumogeral = []

class produto {
    constructor(codigo, descricao, quantidade, preco) {
        this.codigo = codigo
        this.descricao = descricao
        this.quantidade = quantidade
        this.preco = preco
    }
}

app.get('/', (req, res) => {
    res.render('all', { lista: resumogeral })
})

app.get('/cadproduto', (req, res) => {
    res.render('cadproduto')
})

app.post('/retornocadproduto', (req, res) => {
    const produtounico1 = req.body.codigo
    const produtounico2 = req.body.descricao
    const produtounico3 = req.body.quantidade
    const produtounico4 = req.body.preco

    const codigo = produtounico1.toString()
    const descricao = produtounico2.toString()
    const quantidade = produtounico3.toString()
    const preco = produtounico4.toString()

    var x = new produto(produtounico1.toString(), produtounico2.toString(), produtounico3.toString(), produtounico4.toString())

    if (codigo.length == 0)
        //conteudo que eu quero enviar
        res.render('produtounico', { msg: 'Mensagem Inválida' })
    else {
        resumogeral.push(x);

        res.render('produtounico', { msg: 'Inclusão Concluída com sucesso!' })
    }
})

app.get('/produto/:codigo', (req, res) => {
    try {
        resumogeral.forEach(item => item.codigo == req.params.codigo ? res.send(item) : res.render('produtounico', { msg: 'Não tem' }));
    } catch (error) {
        res.render(error);
    }
})

app.post('/getProduto/:codigo', (req, res) => {
    try {
        resumogeral.forEach(item => {
            if (item.codigo == req.params.codigo) {
                res.render('editproduto', { codigo: item.codigo, descricao: item.descricao, quantidade: item.quantidade, preco: item.preco })
            }
        });
    } catch (error) {
        res.render(error);
    }
})

app.post('/edit/:codigo', (req, res) => {
    try {
        resumogeral.forEach(item => {
            if (item.codigo == req.params.codigo) {
                
                item.descricao = req.body.descricao
                item.quantidade = req.body.quantidade
                item.preco = req.body.preco
            }
        });
        res.redirect('/')
    } catch (error) {
        res.render('produtounico', { msg: error })
    }
});

app.post('/delete/:codigo', (req, res) => {
    try {
        var newList = []
        resumogeral.forEach(item => {
            if (item.codigo != req.params.codigo) {
                newList.push(item)
            }
        });
        resumogeral = newList;
        res.redirect('/')
    } catch (error) {
        res.render('produtounico', { msg: error })
    }
})

app.listen(port)