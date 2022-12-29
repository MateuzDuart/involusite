document.querySelector('li .menu').onclick = function () {
    this.classList.toggle('ativado')
    document.querySelectorAll('header li').forEach((e) => e.classList.toggle('ativado'))
}
