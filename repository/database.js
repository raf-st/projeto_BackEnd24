const mysql = require("mysql2");

class Database {
    #connection;

    constructor() {
        // Configuração do banco
        this.#connection = mysql.createPool({
            host: "localhost",
            user: "root",
            password: "",
            database: "bdgp",
        }).promise();
    }



    //////////////////////////////////////////////////// Skin ////////////////////////////////////////////////////
    async selecionarSkins() {
        const skinsData = await this.#connection.query("SELECT * FROM skins;");
        return skinsData[0];
    }
    async selecionarSkinsCount() {
        const countQuery = await this.#connection.query("SELECT COUNT(*) AS total FROM skins;");
        return countQuery[0][0].total;
    }
    
    async insertSkin( categoria, nome, descr, genero, raridade, valor, foto1, foto2,promocoes ) {
        const sql = `
            INSERT INTO skins (categoria_skin, nome_skin, descr_skin, genero_skin, raridade_skin,
            valor_skin, foto1_skin, foto2_skin,promocoes_id_promocao)
            VALUES ('${categoria}','${nome}','${descr}','${genero}', '${raridade}',
            ${valor},'${foto1}','${foto2}','${promocoes}');
        `
        const bd = await this.#connection.execute(sql);
        return bd[0];
    }

    async selecionarSkins() {
        const skinsData = await this.#connection.query("select * from skins")
        return skinsData[0]
    }

    async selecionarSkinsId(id) {
        const skinsData = await this.#connection.query("select * from skins where id_skin =" + id)
        return skinsData[0]
    }

    async deleteSkin(id) {
        const sql =
            `
        delete from skins
        where id_skin = ${id}`

        const dt = await this.#connection.execute(sql)
        return dt[0]
    }

    async updateSkin(categoria, nome, descr, genero,  valor,raridade, foto1, foto2, id) {
        const sql = `update skins 
        set categoria_skin = "${categoria}",
            nome_skin = "${nome}",
            descr_skin = "${descr}",
            genero_skin = "${genero}",
            valor_skin = ${valor}   ,
            raridade_skin = "${raridade}",
            foto1_skin = "${foto1}",
            foto2_skin = "${foto2}",
         id_skin = "${id}"
         `

        const dt = await this.#connection.execute(sql)
        return dt[0]
    }


     

    //////////////////////////////////////////////////// Atrativos ////////////////////////////////////////////////////
    
    async selectAtrativos(){
        const query = await this.#connection.query("select * from atrativos")
        return query[0]
     }
     async selectAtrativosId(id){
        const query = await this.#connection.query("select * from atrativos where id_atrativo =" +id)
        return query[0]
     }
     async insertAtrativo (param) {
        const sql = `insert into atrativos (nome_atrativo, lat_atrativo, long_atrativo, desc_atrativo, image_atrativo) 
                    values ( '${param.nome} ',  '${param.latitude} ',  '${param.longitude} ',  '${param.descricao} ', '${param.imagem} ')`
        const query = await this.#connection.execute(sql) 
        return query[0]
     }
    async deleteAtrativos(id){
        const sql = `delete from atrativos where id_atrativo = ${id}`

        const res = await this.#connection.execute(sql)
        console.log(res)
        return res[0]
     }
     async updateAtrativo(nome, lat, long, desc, image, id){
        const sql = `update atrativos
        set nome_atrativo  = "${nome}",
            lat_atrativo   = "${lat}",
            long_atrativo  = "${long}",
            desc_atrativo  = "${desc}",
            image_atrativo = "${image}",
            id_atrativo    = "${id}"
        `
        const r = await this.#connection.execute(sql)
        return[0]
     }


    //////////////////////////////////////////////////// Cupom ////////////////////////////////////////////////////

    async selecionarCupons(){
        const cuponsData = await this.#connection.query("select * from cupons;")
        return cuponsData[0]
     } 

     async selecionarCupomCount() {
        const countQuery = await this.#connection.query("SELECT COUNT(*) AS total FROM cupons;");
        return countQuery[0][0].total;
    }

     async selecionarCuponId(id) {
        const cuponsData = await this.#connection.query("select * from cupons where id_cupom ="+id)
        return cuponsData[0]
    }
     async insertCupom(nome, codigo, validade, valor){
        const retorno = await this.#connection.execute(`
         INSERT INTO cupons (codigo_cupom, nome_cupom, validade_cupom, valor_cupom) VALUES
         ('${codigo}', '${nome}', '${validade}', ${valor});
       `)
     }

    async deleteCupom(id){
        const sql = `
        delete from cupons
        where id_cupom = ${id}
        `
        const dt = await this.#connection.execute(sql)
        return dt[0]
    }
    async updateCupom(codigo, nome, validade, valor, id) {
  
        const sql = `update cupons
            set codigo_cupom = "${codigo}",
                nome_cupom = "${nome}",
                validade_cupom = "${validade}",
                valor_cupom = ${valor}
            where id_cupom = ${id}`

        const dtbs = await this.#connection.execute(sql)
        return dtbs[0]
    }
    //////////////////////////////////////////////////// Promoção ////////////////////////////////////////////////////
    
    async selecionarPromos() {
        const promosData = await this.#connection.query("SELECT * from promocoes INNER JOIN descontos ON promocoes.descontos_id_desconto = descontos.id_desconto");
        return promosData[0];
    }
    
    async selecionarPromocaoId(id) {
        const promocaoData = await this.#connection.query("SELECT * from promocoes INNER JOIN descontos ON promocoes.descontos_id_desconto = descontos.id_desconto where id_promocao ="+id)
        return promocaoData[0]
    }
    async insertPromo(nome, dtstart, dtend, descricao, ativa,desconto)
    {
   const retorno = await this.#connection.execute(`
     insert into promocoes (nome_promocao,dt_start_promocao, dt_end_promocao,
       descr_promocao, ativa_promocao,descontos_id_desconto ) 
         values ('${nome}','${dtstart}','${dtend}','${descricao}',
        ' ${ativa}',' ${desconto}')
     `)
 }
    async deletePromo(id) {
        const sql = `
            DELETE FROM promocoes
            WHERE id_promocao = ${id};
        `;

        const dt = await this.#connection.execute(sql);
        return dt[0];
    }
    async updatePromocao( id, nome, start, end, desc, ativa, desconto ) {
       
        const sql = `update promocoes
            set nome_promocao = "${nome}",
            dt_start_promocao  = "${start}",
            dt_end_promocao  = "${end}",
            descr_promocao = "${desc}",
            ativa_promocao = "${ativa}",
            descontos_id_desconto = "${desconto}"
            where id_promocao  = ${id}`

        const r = await this.#connection.execute(sql)
        return[0]
    }

     
     //////////////////////////////////////////////////// Desconto ////////////////////////////////////////////////////
     
     async selecionarDescontos() {
        const promocoesData = await this.#connection.query("select * from descontos;")
        return promocoesData[0]
      }

      async selecionarDescontoCount() {
        const countQuery = await this.#connection.query("SELECT COUNT(*) AS total FROM descontos;");
        return countQuery[0][0].total;
    }

      async selecionarDescontosId(id) {
        const descontosData = await this.#connection.query("select * from descontos where id_desconto ="+id)
        return descontosData[0]
      }

      async insertDesconto(valor)
       {
      const retorno = await this.#connection.execute(`
        insert into descontos (valor_desconto) 
            values ('${valor}')
        `)
    }

    async deleteDesconto(id) {
        const sql = `
        delete from descontos
        where id_desconto = ${id};
        `
      
        const dt = await this.#connection.execute(sql)
        return dt[0]
      }   

      async updateDesconto(id, valor) {
        const sql = `    UPDATE descontos
        SET valor_desconto = "${valor}"
        WHERE id_desconto = ${id};
      `;
      
        const dtbs = await this.#connection.execute(sql)
        return dtbs[0]
      }
      
      //////////////////////////////////////////////////// Vendas ////////////////////////////////////////////////////

      async insertVenda(hora,dia , skins,cupons ) {
        const sql = `
            INSERT INTO vendas (hora_venda, dia_venda, skins_id_skin,cupons_id_cupon )
            VALUES ('${hora}', '${dia}','${skins}','${cupons}');
        `;
        const bd = await this.#connection.execute(sql);
        return bd[0];
    }
    async somarVenda() {
        try {
            const [rows, fields] = await this.#connection.execute(`
                SELECT SUM(skins.valor_skin) AS total
                FROM vendas
                LEFT JOIN skins ON vendas.skins_id_skin = skins.id_skin;
            `);
    
            return rows[0].total;
        } catch (error) {
            console.error('Erro ao somar vendas:', error.message);
            throw error;
        }
    }
    

    async calcularDiferencaSkinsCupons() {
    try {
        const [rows, fields] = await this.#connection.execute(`
            SELECT (SUM(skins.valor_skin) - SUM(cupons.valor_cupom)) AS diferenca
            FROM vendas
            INNER JOIN skins ON skins.id_skin = vendas.skins_id_skin
            INNER JOIN cupons ON cupons.id_cupom = vendas.cupons_id_cupon;
        `);

        return rows[0].diferenca;
    } catch (error) {
        console.error('Erro ao calcular diferença entre skins e cupons:', error.message);
        throw error;
    }
}

    
      async selecionarVendas() {
        const vendasData = await this.#connection.query("SELECT * FROM vendas;");
        return vendasData[0];
    }

    async selecionarVendaCount() {
        const countQuery = await this.#connection.query("SELECT COUNT(*) AS total FROM vendas;");
        return countQuery[0][0].total;
    }

    async selecionarVendasId(id) {
        const vendas_Data = await this.#connection.query("SELECT * FROM vendas WHERE id_venda ="+id)
        return vendas_Data[0]
    }

    async updateVenda(hora, dia,skins,cupons, id) {
        const sql = `
            UPDATE vendas
            SET hora_venda = '${hora}',
            dia_venda = '${dia}',
            skins_id_skin = '${skins}',
            cupons_id_cupon  = '${cupons}'
           
            WHERE id_venda = ${id};
        `;
    
        const bd = await this.#connection.execute(sql);
        return bd[0];
    }
    async deleteVenda(id) {
        const sql = `
            DELETE FROM vendas
            WHERE id_venda = ${id};
        `;
    
        const [bd] = await this.#connection.execute(sql);
        return bd;
    }

    //////////////////////////////////////////////////// Atrativos ////////////////////////////////////////////////////

    async selectAtrativos(){
        const query = await this.#connection.query("select * from atrativos")
        return query[0]
     }
     async selectAtrativosId(id){
        const query = await this.#connection.query("select * from atrativos where id_atrativo =" +id)
        return query[0]
     }
     async insertAtrativo (param) {
        console.log(param)
        const sql = `insert into atrativos values (null, '${param.nome} ',  '${param.latitude} ',  '${param.longitude} ', '${param.imagem} '  ,'${param.descricao} ')`
        const query = await this.#connection.execute(sql) 
        return query[0]
     }
     
     async deleteAtrativo(id){
      
        const sql = 'delete from atrativos where id_atrativo =' +id;
     
        const res = await this.#connection.execute(sql)
       
        return res[0]
     }
     async updateAtrativo(nome, lat, long ,image , desc, id){
        const sql = `update atrativos
        set nome_atrativo  = "${nome}",
            lat_atrativo   = "${lat}",
            long_atrativo  = "${long}",
            image_atrativo = "${image}",
            desc_atrativo  = "${desc}"
            where
            id_atrativo    = "${id}"
            
        `
        const r = await this.#connection.execute(sql)
        return r[0]
     }
     async verificarLogin(email, senha) {
        try {
            // Consulta SQL para verificar o login
            const sql = 'SELECT * FROM gamers WHERE email_gamer = ? AND senha_gamer = ?';
            const [rows, fields] = await this.#connection.execute(sql, [email, senha]);
            
            // Retorna o resultado da consulta
            return rows;
        } catch (error) {
            // Trate os erros aqui
            console.error('Erro ao verificar login:', error);
            throw error; // Você pode tratar de forma mais apropriada de acordo com o seu contexto
        }
    }

    async selecionarCoins() {
        const coinsData = await this.#connection.query("SELECT * FROM coins;");
        return coinsData[0];
    }

    async insertCoins( nome, valor, imagem) {
        const sql = `
            INSERT INTO coins (nome_coin,value_coin,image_coin)
            VALUES ('${nome}','${valor}','${imagem}');
        `
        const bd = await this.#connection.execute(sql);
        return bd[0];
    }

    async selecionarCoinsId(id) {
        const coinsData = await this.#connection.query("select * from coins where id_coin =" + id)
        return coinsData[0]
    }

    async selecionarCoinsCount() {
        const countQuery = await this.#connection.query("SELECT COUNT(*) AS total FROM coins;");
        return countQuery[0][0].total;
    }


    async deleteCoins(id) {
        const sql =
            `
        delete from coins
        where id_coin = ${id}`

        const dt = await this.#connection.execute(sql)
        return dt[0]
    }

    async selecionarPersonagem() {
        const personagensData = await this.#connection.query("SELECT * FROM personagens;");
        return personagensData[0];
    }

    async selecionarPersonagemCount() {
        const countQuery = await this.#connection.query("SELECT COUNT(*) AS total FROM personagens;");
        return countQuery[0][0].total;
    }

    async insertPersonagens( nome, genero, tipo,totalcoin,latitude,longitude,skins) {
        const sql = `
            INSERT INTO personagens (nome_personagem,genero_personagem,tipo_personagem,totalcoin_personagem,start_latitude_personagem,start_longitude_personagem,skins_id_skin  )
            VALUES ('${nome}','${genero}','${tipo}','${totalcoin}','${latitude}','${longitude}','${skins}');
        `
        const bd = await this.#connection.execute(sql);
        return bd[0];
    }

    async selecionarPersonagensId(id) {
        const personagensData = await this.#connection.query("select * from personagens where id_personagem =" + id)
        return personagensData[0]
    }

    async deletePersonagens(id) {
        const sql =
            `
        delete from personagens
        where id_personagem = ${id}`

        const dt = await this.#connection.execute(sql)
        return dt[0]
    }



    async selecionarGamers() {
        const gamersData = await this.#connection.query("SELECT * FROM gamers;");
        return gamersData[0];
    }

    async insertGamers( nome, senha, email,dtnasc,personagem,coins) {
        const sql = `
            INSERT INTO gamers (nome_gamer,senha_gamer,email_gamer,dtnasc_gamer,personagens_id_personagem,coins_id_coin)
            VALUES ('${nome}','${senha}','${email}','${dtnasc}','${personagem}','${coins}');
        `
        const bd = await this.#connection.execute(sql);
        return bd[0];
    }

    async selecionarGamersId(id) {
        const gamersData = await this.#connection.query("select * from gamers where id_gamers =" + id)
        return gamersData[0]
    }

    async selecionarGamersCount() {
        const countQuery = await this.#connection.query("SELECT COUNT(*) AS total FROM gamers;");
        return countQuery[0][0].total;
    }

    async deleteGamers(id) {
        const sql =
            `
        delete from gamers
        where id_gamers = ${id}`

        const dt = await this.#connection.execute(sql)
        return dt[0]
    }
    }



module.exports = Database;
