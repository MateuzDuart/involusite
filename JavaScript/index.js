document.querySelector('li .menu').onclick = function () {
    this.classList.toggle('ativado')
    document.querySelectorAll('header li').forEach((e) => e.classList.toggle('ativado'))
}

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
            if (projeto.descricao.length > 113) {
                var verMais = `<div class="verMais"><p>Ver Mais</p><img class="papel-baixo" src="Imagens/parte-baixo.png" alt="parte de baixo de um papiro" srcset=""></div>`
            } else {
            var verMais = `<div class="verMais"><img class="papel-baixo" src="Imagens/parte-baixo.png" alt="parte de baixo de um papiro" srcset=""></div>`
            }
            var projetoHTML = ` <div class="projeto">
                <img class="papel" src="Imagens/papel.svg" alt="Textura papel chique">
                <div class="imagem"><img src="${projeto.imagen}" alt="${projeto.alt}"></div>
                <h2>${projeto.titulo}</h2>
                <p class="desc">${projeto.descricao.substring(0, 142)}</p>
                ${verMais}
                </div>`
            
            container.innerHTML += projetoHTML
        }

      }


}
