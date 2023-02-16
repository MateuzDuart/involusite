var popUpAtivado = false
const todosElementos = document.querySelectorAll('nav ul li')

function carregarProjetos() {
    const container = document.querySelector('#container')
    var pedido = new XMLHttpRequest()
    pedido.open('GET', '/projetos.json')
    pedido.responseType = 'json';
    pedido.send()

    pedido.onload = function() {
        var projetos = pedido.response;
        for(var i in projetos) {
            var projeto = projetos[i]
            if (projeto.descricao.length >= 105) {
                var verMais = `<div class="verMais"><a href="${projeto.site}" target="_blank">Ver Site</a><p>Ver Mais</p><img class="papel-baixo" src="/Imagens/parte-baixo.png" alt="parte de baixo de um papiro" srcset=""></div>`
            } else {
            var verMais = `<div class="verMais"><a href="${projeto.site}" target="_blank">Ver Site</a><img class="papel-baixo" src="/Imagens/parte-baixo.png" alt="parte de baixo de um papiro" srcset=""></div>`
            }
            var projetoHTML = `<div class="containerProjeto"><div class="projeto" onclick="ativador(this)">
                <img class="selo" src="https://raw.githubusercontent.com/MateuzDuart/involusite/main/Imagens/simbolo-de-selo-de-carta-real.png" alt="Selo de carta real" onclick="desativar(this)">
                <img class="papel" src="/Imagens/papel.svg" alt="Textura papel chique">
                <div class="imagem"><img src="/${projeto.imagen}" alt="${projeto.alt}"></div>
                <h2>${projeto.titulo}</h2>
                <p class="desc">${projeto.descricao}</p>
                ${verMais}
                </div></div>`
            
            container.innerHTML += projetoHTML
        }

      }


}

function ativador(e) {
    if (!popUpAtivado) {
        var fechar = document.querySelector('.fechar')
        var tamanho = String(window.screen.width * 5.5 / 1326).replace('.', '')
        e.setAttribute('style', `transform: scale(1.${tamanho})`)
        e.classList.add('ativado')
        fechar.classList.add('ativado')
        e.parentElement.classList.add('ativado')
        popUpAtivado = true
    }
}

function desativar(e=false) {
    var projetos = document.querySelectorAll('.ativado')
    projetos.forEach((e) => {
        e.classList.remove('ativado')
        e.setAttribute('style', ``)
    })
    
    setTimeout(() => {
        popUpAtivado = false
    }, 100)
    
}
function ativadorNav() {
    todosElementos.forEach((e) => {
        e.classList.remove('navAtivado')
        this.classList.add('navAtivado')
    })

}
todosElementos.forEach((e) => {
    e.addEventListener('click', ativadorNav)
})

function EnviarDados() {
    var selecionado = {"servicos": []}
    document.getElementsByName('TotFuncionarios').forEach(
        (e) => {
            if (e.checked) {
                selecionado["funcionarios"] = e
            } else {
                return
            }
        }        
    )
    document.getElementsByName('servico').forEach(
        (e) => {
            if (e.checked) {
                selecionado["servicos"].push(e) 
            } else {
                return
            }
        }        
    )
    document.getElementsByName('investimento').forEach(
        (e) => {
            if (e.checked) {
                selecionado["investimento"] = e
            } else {
                return
            }
        }        
    )
    var formularioCompleto = false
    try {
            var totFuncionarios = selecionado["funcionarios"].value
            var investimento = selecionado["investimento"].value
            var botoes = document.querySelector('#questionario .centralizar')
            var servicos = []
            selecionado["servicos"].forEach((e) => {
                servicos.push(e.value)})
            formularioCompleto = true
    } catch {
        formularioCompleto = false
    }
    
    function aceitar() {
        botoes.innerHTML = '<div class="botao qst desativado"><span>Enviar Respostas</span></div><div class="botao"><span>Whatsapp</span></div>'

        resposta.innerHTML = '<p class="aceito">Olá, estou muito animado de ter você aqui, nossa parceria já está parcialmente acordada, eu liberei um botão que te levara direto para meu WhatsApp, por favor aperte nele para me enviar esses seus dados, logo logo estarei lhe respondendo para você me falar mais sobre seu projeto</p>'
        
    }
    function atencao() {
        botoes.innerHTML = '<div class="botao qst desativado"><span>Enviar Respostas</span></div><div class="botao"><span>Whatsapp</span></div>'
        resposta.innerHTML = '<p class="atencao">Seu projeto parece interessante, você está pre-qualificado, estarei liberando logo abaixo um botão para você esta me enviando essas suas informações no WhatsApp, lá poderemos falar mais sobre seu projeto e ver se conseguimos fechar um acordo</p>'        
    }
    function negar() {
        resposta.innerHTML = '<p class="negado">Infelizmente não estamos aptos a trabalhar juntos no momento, mas não desanime, acredite no seu potencial, estarei aqui lhe aguardando para futuras parcerias.</p>'
        
    }
    var resposta = document.querySelector('.resposta')

    if (formularioCompleto) {
        if (servicos.length == 2 && investimento == 'menos de 100' ){
        negar()
        } else if (servicos.length >= 3 && investimento == '100 a 400' ) {
            atencao()
        } else {
        if (totFuncionarios == "1") {
            if (investimento == 'menos de 100') {
                if (servicos.indexOf('criacao site') != -1) {
                    negar()
                } if (servicos.indexOf('criacao logo') != -1){
                    atencao()
                }  if (servicos.indexOf('SEO site') != -1){
                    negar()
                } if (servicos.indexOf('melhoria/ajustes site') != -1){
                    negar()
                }
            } else if (investimento == "100 a 400") {
                if (servicos.indexOf('criacao site') != -1) {
                    atencao()
                } if (servicos.indexOf('criacao logo') != -1){
                    aceitar()
                }  if (servicos.indexOf('SEO site') != -1){
                    aceitar()
                } if (servicos.indexOf('melhoria/ajustes site') != -1){
                    aceitar()
                }
            } else if (investimento == "500 a 1000") {
                if (servicos.indexOf('criacao site') != -1) {
                    aceitar()
                } if (servicos.indexOf('criacao logo') != -1){
                    aceitar()
                }  if (servicos.indexOf('SEO site') != -1){
                    aceitar()
                } if (servicos.indexOf('melhoria/ajustes site') != -1){
                    aceitar()
                }
                
            } else if (investimento == "1000 a 3000") {
                if (servicos.indexOf('criacao site') != -1) {
                    aceitar()
                } if (servicos.indexOf('criacao logo') != -1){
                    aceitar()
                }  if (servicos.indexOf('SEO site') != -1){
                    aceitar()
                } if (servicos.indexOf('melhoria/ajustes site') != -1){
                    aceitar()
                }
            } else if (investimento == "mais de 3000") {
                if (servicos.indexOf('criacao site') != -1) {
                    aceitar()
                } if (servicos.indexOf('criacao logo') != -1){
                    aceitar()
                }  if (servicos.indexOf('SEO site') != -1){
                    aceitar()
                } if (servicos.indexOf('melhoria/ajustes site') != -1){
                    aceitar()
                }
            }
            
        } else if (totFuncionarios == "2 a 4") {
            if (investimento == 'menos de 100') {
                if (servicos.indexOf('criacao site') != -1) {
                    negar()
                } if (servicos.indexOf('criacao logo') != -1){
                    atencao()
                }  if (servicos.indexOf('SEO site') != -1){
                    negar()
                } if (servicos.indexOf('melhoria/ajustes site') != -1){
                    negar()
                }
            } else if (investimento == "100 a 400") {
                if (servicos.indexOf('criacao site') != -1) {
                    atencao()
                } if (servicos.indexOf('criacao logo') != -1){
                    aceitar()
                }  if (servicos.indexOf('SEO site') != -1){
                    aceitar()
                } if (servicos.indexOf('melhoria/ajustes site') != -1){
                    aceitar()
                }
            } else if (investimento == "500 a 1000") {
                if (servicos.indexOf('criacao site') != -1) {
                    aceitar()
                } if (servicos.indexOf('criacao logo') != -1){
                    aceitar()
                }  if (servicos.indexOf('SEO site') != -1){
                    aceitar()
                } if (servicos.indexOf('melhoria/ajustes site') != -1){
                    aceitar()
                }
                
            } else if (investimento == "1000 a 3000") {
                if (servicos.indexOf('criacao site') != -1) {
                    aceitar()
                } if (servicos.indexOf('criacao logo') != -1){
                    aceitar()
                }  if (servicos.indexOf('SEO site') != -1){
                    aceitar()
                } if (servicos.indexOf('melhoria/ajustes site') != -1){
                    aceitar()
                }
            } else if (investimento == "mais de 3000") {
                if (servicos.indexOf('criacao site') != -1) {
                    aceitar()
                } if (servicos.indexOf('criacao logo') != -1){
                    aceitar()
                }  if (servicos.indexOf('SEO site') != -1){
                    aceitar()
                } if (servicos.indexOf('melhoria/ajustes site') != -1){
                    aceitar()
                }
            }
        } else if (totFuncionarios == "5 a 10") {
            if (investimento == 'menos de 100') {
                if (servicos.indexOf('criacao site') != -1) {
                    negar()
                } if (servicos.indexOf('criacao logo') != -1){
                    negar()
                }  if (servicos.indexOf('SEO site') != -1){
                    negar()
                } if (servicos.indexOf('melhoria/ajustes site') != -1){
                    negar()
                }
            } else if (investimento == "100 a 400") {
                if (servicos.indexOf('criacao site') != -1) {
                    atencao()
                } if (servicos.indexOf('criacao logo') != -1){
                    aceitar()
                }  if (servicos.indexOf('SEO site') != -1){
                    atencao()
                } if (servicos.indexOf('melhoria/ajustes site') != -1){
                    atencao()
                }
            } else if (investimento == "500 a 1000") {
                if (servicos.indexOf('criacao site') != -1) {
                    aceitar()
                } if (servicos.indexOf('criacao logo') != -1){
                    aceitar()
                }  if (servicos.indexOf('SEO site') != -1){
                    aceitar()
                } if (servicos.indexOf('melhoria/ajustes site') != -1){
                    aceitar()
                }
                
            } else if (investimento == "1000 a 3000") {
                if (servicos.indexOf('criacao site') != -1) {
                    aceitar()
                } if (servicos.indexOf('criacao logo') != -1){
                    aceitar()
                }  if (servicos.indexOf('SEO site') != -1){
                    aceitar()
                } if (servicos.indexOf('melhoria/ajustes site') != -1){
                    aceitar()
                }
            } else if (investimento == "mais de 3000") {
                if (servicos.indexOf('criacao site') != -1) {
                    aceitar()
                } if (servicos.indexOf('criacao logo') != -1){
                    aceitar()
                }  if (servicos.indexOf('SEO site') != -1){
                    aceitar()
                } if (servicos.indexOf('melhoria/ajustes site') != -1){
                    aceitar()
                }
            }
            
        } else if (totFuncionarios == "mais de 11") {
            if (investimento == 'menos de 100') {
                if (servicos.indexOf('criacao site') != -1) {
                    negar()
                } if (servicos.indexOf('criacao logo') != -1){
                    negar()
                }  if (servicos.indexOf('SEO site') != -1){
                    negar()
                } if (servicos.indexOf('melhoria/ajustes site') != -1){
                    negar()
                }
            } else if (investimento == "100 a 400") {
                if (servicos.indexOf('criacao site') != -1) {
                    atencao()
                } if (servicos.indexOf('criacao logo') != -1){
                    aceitar()
                }  if (servicos.indexOf('SEO site') != -1){
                    atencao()
                } if (servicos.indexOf('melhoria/ajustes site') != -1){
                    atencao()
                }
            } else if (investimento == "500 a 1000") {
                if (servicos.indexOf('criacao site') != -1) {
                    aceitar()
                } if (servicos.indexOf('criacao logo') != -1){
                    aceitar()
                }  if (servicos.indexOf('SEO site') != -1){
                    aceitar()
                } if (servicos.indexOf('melhoria/ajustes site') != -1){
                    aceitar()
                }
                
            } else if (investimento == "1000 a 3000") {
                if (servicos.indexOf('criacao site') != -1) {
                    aceitar()
                } if (servicos.indexOf('criacao logo') != -1){
                    aceitar()
                }  if (servicos.indexOf('SEO site') != -1){
                    aceitar()
                } if (servicos.indexOf('melhoria/ajustes site') != -1){
                    aceitar()
                }
            } else if (investimento == "mais de 3000") {
                if (servicos.indexOf('criacao site') != -1) {
                    aceitar()
                } if (servicos.indexOf('criacao logo') != -1){
                    aceitar()
                }  if (servicos.indexOf('SEO site') != -1){
                    aceitar()
                } if (servicos.indexOf('melhoria/ajustes site') != -1){
                    aceitar()
                }
            }
        }
        }
    } else {
        resposta.innerHTML = '<p class="negado">Por favor complete todo o formulario</p>'
        
    }


    
}

try {document.querySelector('.qst').addEventListener('click', EnviarDados)} catch {
    
}