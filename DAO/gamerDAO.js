const Gamer = require("../mvc/models/gamerModel");
const Database = require("../repository/database");

class GamerDAO {

    #conexao

    constructor() {
        this.#conexao = new Database();
    }

    async consultarGamers() {

        const lista_gamer = []
        const gamers = await this.#conexao.selecionarGamers()

        if (gamers) {
            for (const gamer of gamers) {
                const objgamer = new Gamer()

                objgamer.id = gamer.id_gamer
                objgamer.nome = gamer.nome_gamer
                objgamer.senha = gamer.senha_gamer
                objgamer.email = gamer.email_gamer
                objgamer.dtnasc = gamer.dtnasc_gamer
                objgamer.personagem = gamer.personagens_id_personagem
                objgamer.coin = gamer.coins_id_coin


                lista_gamer.push(objgamer.toJson())
            }
        }

        return lista_gamer
    }
    registrarGamer(nome, senha, email, dtnasc,personagem,coin){

        const gamer = new Gamer()

        gamer.nome = nome
        gamer.senha = senha
        gamer.email = email
        gamer.dtnasc = dtnasc
        gamer.personagem = personagem
        gamer.coin = coin

        this.#conexao.insertGamers(gamer.nome, gamer.senha, gamer.email,gamer.dtnasc,gamer.personagem,gamer.coin)
    }
    
    async consultarGamerId(id) {

        const gamer = await this.#conexao.selecionarGamersId(id)
              
        const objgamer = new Gamer()

        objgamer.id = gamer[0].id_gamer
        objgamer.nome = gamer[0].nome_gamer
        objgamer.senha = gamer[0].senha_gamer
        objgamer.email = gamer[0].email_gamer
        objgamer.dtnasc = gamer[0].dtnasc_gamer
        objgamer.personagem = gamer[0].personagens_id_personagem
        objgamer.coin = gamer[0].coins_id_coin
      

        return objgamer.toJson()
    }

    async atualizarCupom(id, nome, codigo, validade, valor){

        const cupom = new Cupom()

        cupom.id = id
        cupom.nomeCupom = nome
        cupom.codCupom = codigo
        cupom.validadeCupom = validade
        cupom.valorCupom = valor

        const dt = await this.#conexao.updateCupom(cupom.codCupom, cupom.nomeCupom, cupom.validadeCupom, cupom.valorCupom, cupom.id)
        return dt
    }


    async apagarGamer(id){
     const dados =  await this.#conexao.deleteGamers(id)
     return dados
    }
}

module.exports = GamerDAO