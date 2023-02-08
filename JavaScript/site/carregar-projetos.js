var popUpAtivado = false

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

