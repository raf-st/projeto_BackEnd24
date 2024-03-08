//pacotinho pra você trabalhar com caminho de arquivos, como ele você pode chegar
//em qualquer diretório ou arquivo de boa, você vai ver ali embaixo.
const path = require('path')
const GamerDAO = require('../../DAO/gamerDAO')
const PersonagemDAO= require('../../DAO/personagemDAO')
const CoinDAO= require('../../DAO/coinDAO')


//Lembra que você usou o consign no startup? Então, nem tudo é mamão com acucar
//Você precisa fazer isso para usar o app do startup. O app é exatamente o app de lá
module.exports = (app) => {   

   
    app.get("/registra",async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        const personagem = new PersonagemDAO()
        
        let lista_personagens = await personagem.consultarPersonagem()
       

        const coin = new CoinDAO()
        
        let lista_coins = await coin.consultarCoin()
       

        res.render('gamers/addgamer', { personagens: lista_personagens, coins: lista_coins})
    })

    app.get("/cupom/lista", async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")

        const cupomDAO = new CupomDAO()
        const lista_cupons = await cupomDAO.consultarCupons()
   
        res.render("cupom/listcupons", { cupom: lista_cupons })
    })

    app.get("/cupons", async (req, res) => {
        
        const cupomDAO = new CupomDAO();
        res.setHeader("Access-Control-Allow-Origin","*")

        res.status(201).json(await cupomDAO.consultarCupons())

    })


    app.post("/registrargamer", (req, res) => {
        
        const gamerDAO = new GamerDAO();
        res.setHeader("Access-Control-Allow-Origin","*")
        const {txtnomegamer, txtsenhagamer, txtemailgamer, dtval,selecionepersonagem,selecionecoin } = req.body

        gamerDAO.registrarGamer(txtnomegamer, txtsenhagamer, txtemailgamer, dtval,selecionepersonagem,selecionecoin)

        res.status(201).json({ 
            msg: "ok"
        })

    })
    app.delete("/cupom/apagar/:id", async (req,res) =>{
        const cupomDAO = new CupomDAO();
        res.setHeader("Access-Control-Allow-Origin","*")
    
        res.json(await cupomDAO.apagarCupom(req.params.id))

    })

    app.get("/cupom/alterar/:id", async (req, res) => {
        const cupomDAO = new CupomDAO()

        const dtcupom = await cupomDAO.consultarCuponId(req.params.id)
        

        res.render("cupom/upcupons", { cupom: dtcupom  })
    })

    app.put("/cupom/alterar", async (req, res) => {
        const cupomDAO = new CupomDAO();
        res.setHeader("Access-Control-Allow-Origin","*")

        //Destructuring
        const {nome, codigo, validade, valor, id } = req.body

        const r = await cupomDAO.atualizarCupom(id, nome, codigo, validade,valor)

        res.json({r})
        

    })
}