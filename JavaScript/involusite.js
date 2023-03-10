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
            var nome = document.querySelector('#nome').value
            var sobreNome = document.querySelector('#sobrenome').value
            var totFuncionarios = selecionado["funcionarios"].value
            var investimento = selecionado["investimento"].value
            var botoes = document.querySelector('#questionario .centralizar')
            var servicos = []
            selecionado["servicos"].forEach((e) => {
                servicos.push(e.value)})
            if (nome.length != 0 && sobrenome.length != 0){formularioCompleto = true}

            if (totFuncionarios == '1') {
                var msmfuncio = "1 funcionario"
            } else {
                var msmfuncio = `de ${totFuncionarios} funcionario`
            }
            var msmservico = ''
            if (servicos.length >= 2){ 
                if (servicos.indexOf('criacao site') != -1) {
                    msmservico += 'Criar um site, '
                } if (servicos.indexOf('criacao logo, ') != -1){
                    msmservico += 'Criar uma logo'
                }  if (servicos.indexOf('SEO site') != -1){
                    msmservico += 'Melhorar o SEO, '
                } if (servicos.indexOf('melhoria/ajustes site') != -1){
                    msmservico += 'Melhorar o designer ou ajeitar uma coisa no site, '
                }
            } else {
                if (servicos.indexOf('criacao site') != -1) {
                    msmservico = 'Criar um site,'
                } else if (servicos.indexOf('criacao logo, ') != -1){
                    msmservico = 'Criar uma logo,'
                } else if (servicos.indexOf('SEO site') != -1){
                    msmservico = 'Melhorar o SEO, '
                } else if (servicos.indexOf('melhoria/ajustes site') != -1){
                    msmservico = 'Melhorar o designer ou ajeitar uma coisa no site, '
                }
            }
                            
            var linkWpp = `https://api.whatsapp.com/send?phone=5581986437864&text=ol%C3%A1,%20eu%20me%20chamo%20${nome}%20${sobreNome},%20minha%20empresa%20tem%20${msmfuncio}%20,%20e%20eu%20gostaria%20de%20${msmservico}%20e%20tenho%20${investimento}%20Reais%20para%20investir.`
    } catch {
        formularioCompleto = false
    }
    
    function aceitar() {
        botoes.innerHTML = `<div class="botao qst desativado"><span>Enviar Respostas</span></div><a href="${linkWpp}" rel="nofollow" target="blank_"><div class="botao"><span>Whatsapp</span></div></a>`
        resposta.innerHTML = '<p class="aceito">Ol??, estou muito animado de ter voc?? aqui, nossa parceria j?? est?? parcialmente acordada, eu liberei um bot??o que te levara direto para meu WhatsApp, por favor aperte nele para me enviar esses seus dados, logo logo estarei lhe respondendo para voc?? me falar mais sobre seu projeto</p>'
    }
    function atencao() {
        botoes.innerHTML = `<div class="botao qst desativado"><span>Enviar Respostas</span></div><a href="${linkWpp}" rel="nofollow" target="blank_"><div class="botao"><span>Whatsapp</span></div></a>`
        resposta.innerHTML = '<p class="atencao">Seu projeto parece interessante, voc?? est?? pre-qualificado, estarei liberando logo abaixo um bot??o para voc?? esta me enviando essas suas informa????es no WhatsApp, l?? poderemos falar mais sobre seu projeto e ver se conseguimos fechar um acordo</p>'        
    }
    function negar() {
        resposta.innerHTML = '<p class="negado">Infelizmente n??o estamos aptos a trabalhar juntos no momento, mas n??o desanime, acredite no seu potencial, estarei aqui lhe aguardando para futuras parcerias.</p>'
        
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