//definindo variaveis globais
var altura = 0
var largura = 0
var vidas = 1
var tempo = 15
var nivel = window.location.search
var criaMoscaTempo = 1500

// fazendo com que o nivel seja atualizado, removendo o ? que fica apos busca via location search
nivel = nivel.replace('?', '')

if(nivel === 'normal'){
    criaMoscaTempo = 1500
}else if( nivel === 'dificil'){
    criaMoscaTempo = 1000
}else if(nivel === 'hardcore'){
    criaMoscaTempo = 750
}


//criando funcao para ajustar tamanho da tela de acao
function ajustaTamanhoPalcoJogo(){

    altura = window.innerHeight
    largura = window.innerWidth
}
// chamando alteracao da variavel global altura/largura para as proximas funcoes
ajustaTamanhoPalcoJogo()

// definindo cronometro
var conometro = setInterval(function(){
    tempo -= 1

    if(tempo < 0){
        clearInterval(conometro)
        clearInterval(criaMosca)
        window.location.href="victory.html"

    }else{
        document.getElementById('cronometro').innerHTML = tempo
    }   
    
    
}, 1000)


// criando funcao para fazer a posicao do elemento ser aleatoria.
// atribuindo tambem outras funcoes como a de classes e tamanho
function posicaoRandomica(){

    //remover mosca anterior caso exista
    if(document.getElementById('mosca')){
        document.getElementById('mosca').remove()

        //controle de vidas
        if(vidas > 3){
            window.location.href = "gameover.html"
        }else{
            document.getElementById(`vida${vidas}`).src = "img/coracao_vazio.png"

            vidas++
        }
        
    }

    var posicaoX = Math.floor(Math.random() * largura) - 90
    var posicaoY = Math.floor(Math.random() * altura) - 90
    
    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY
    
    //criar elemento HTML
    var mosca = document.createElement('img')
    mosca.src = 'img/mosca.png'
    mosca.className = (`${tamanhoAleatorio()} ${ladoAleatorio()}`)
    mosca.id = 'mosca'
    mosca.style.position = 'absolute'
    mosca.style.left = posicaoX + 'px'
    mosca.style.top = posicaoY + 'px'

    //definindo logica ao clicar no element mosca
    mosca.onclick = function(){
        this.remove()

    }

    document.body.appendChild(mosca)
    tamanhoAleatorio()
}

//Chamando elemento mosca na tela 


var criaMosca = setInterval(function(){
    posicaoRandomica()
}, criaMoscaTempo)

// funcao para aleatorizar tamanho do elemento mosca
function tamanhoAleatorio(){
    var classe = Math.floor(Math.random() * 3)
    switch (classe){
        case 0:
            return 'mosca1'

        case 1:
            return 'mosca2'

        case 2:
           return 'mosca3'
    }
}

// funcao para mudar o lado do elemento e dar dinamismo na aplicacao
function ladoAleatorio(){
    var classe = Math.floor(Math.random() * 2)
    switch (classe){
        case 0:
            return 'ladoA'

        case 1:
            return 'ladoB'

    }
}