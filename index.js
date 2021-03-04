const express = require ('express')
const handlebars =  require ('express-handlebars')
const bodyparser = require ('body-parser')
const app = express()
const port = 3081

app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())

var resumogeral = []

class produto {
    constructor(codigo,descricao,quantidade,preco)
    {
        this.codigo = codigo
        this.descricao = descricao
        this.quantidade = quantidade
        this.preco = preco
    }

}

app.get('/',(req, res) =>{
    res.send(resumogeral)
})

app.get('/cadproduto',(req, res) =>{
    res.render('cadproduto')
})

app.post('/retornocadproduto',(req, res) => {
    const produtounico1 = req.body.codigo
    const produtounico2 = req.body.descricao
    const produtounico3 = req.body.quantidade
    const produtounico4 = req.body.preco

    const codigo = produtounico1.toString()
    const descricao = produtounico2.toString()
    const quantidade = produtounico3.toString()
    const preco = produtounico4.toString()

    var x = new produto(produtounico1.toString(),produtounico2.toString(),produtounico3.toString(), produtounico4.toString())

    


    if (codigo.length == 0)
    //conteudo que eu quero enviar
        res.render('produtounico', {msg: 'Mensagem Inválida'})
    else{
        resumogeral.push(x)

        res.render('produtounico',{msg: 'Inclusão Concluída com sucesso!'})
    }

})



app.listen(port)