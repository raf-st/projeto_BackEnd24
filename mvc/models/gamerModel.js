//Representa uma Cupom do mundo real, concorda?
class Gamer{

    #id

    get id() {
        return this.#id
    }
    set id(value) {
        this.#id = value
    }

   #nome
    get nome() {
        return this.#nome
    }
    set nome(value) {
        this.#nome = value
    }
   #senha
    get senha() {
        return this.#senha
    }
    set senha(value) {
        this.#senha = value
    }
   #email
    get email() {
        return this.#email
    }
    set email(value) {
        this.#email = value
    }
   #dtnasc    
    get dtnasc() {
        return this.#dtnasc
    }
    set dtnasc(value) {
        this.#dtnasc = value
        
    }
    #personagem
    get personagem() {
        return this.#personagem
    }
    set personagem(value) {
        this.#personagem = value
    }
   #coin    
    get coin() {
        return this.#coin
    }
    set coin(value) {
        this.#coin = value
        
    }
  
    //é um tipo de método padrão. Ele é invocado
    //quando o objeto é criado, ou seja, ele vai te
    //acompanhar e obrigar a passar os parametros declarados, se tiver.
    //exemplo const a = new Cupom("Batata","Frita",100)
    constructor(nome, senha, email, dtnasc,personagem,coin){
        this.#nome = nome
        this.#senha = senha
        this.#email = email
        this.#dtnasc = dtnasc
        this.#personagem = personagem
        this.#coin = coin
    }

     
    toJson(){
        return {
            "id": this.#id,
            "nome": this.#nome,
            "senha": this.#senha,
            "email": this.#email,
            "dtnasc": this.#dtnasc,
            "personagem": this.#personagem,
            "coin": this.#coin

        }
    }
}


module.exports = Gamer