class Venda {

    #id
    #hora
    #dia
    #cupons
    #skins

    
    get id() {
        return this.#id;
    }

    set id(value) {
        this.#id = value;
    }

    get hora() {
        return this.#hora;
    }

    set hora(valor) {
        this.#hora = valor;
    }

    get dia() {
        return this.#dia;
    }

    set dia(valor) {
        this.#dia = valor;
    }

    
    get cupons() {
        return this.#cupons;
    }

    set cupons(value) {
        this.#cupons = value;
    }

    get skins() {
        return this.#skins;
    }

    set skins(value) {
        this.#skins = value;
    }


    constructor(hora, dia, skins,cupons ) {

        this.#hora = hora;
        this.#dia = dia;
        this.#skins = skins;
        this.#cupons = cupons;

    }

    toJson(){
        return {
            "id": this.#id,
            "hora_venda": this.#hora,
            "dia_venda": this.#dia,
              "skins": this.#skins,
            "cupons": this.#cupons
          
        }
    }
}

module.exports = Venda;
