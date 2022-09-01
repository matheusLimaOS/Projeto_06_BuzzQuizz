let quizzes = [];
let quizzesUsuario = '';
let urlAPI = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes';

function getQuizzesUsuario() {

}

function renderizarQuizzesUsuario() {
    let quizzesUsuarioSerializados = JSON.stringify(quizzesUsuario);
    let listaQuizzesUsuario = document.querySelector('.quizzes-usuario');
    if (quizzesUsuario === '') {
        listaQuizzesUsuario.innerHTML = `
            <div class="quizz-usuario-vazio">
                <h1>Você não criou nenhum quizz ainda :(</h1>
                <button onclick="criarQuizz()">Criar Quizz</button> 
            </div>
            ` /* adicionar onclick criar quizz e definir filtro(quizz-usuário)*/
    } else {
        const tituloUsuario = document.querySelector('.titulo-quizzes-usuario');
        tituloUsuario.classList.remove('hide');
        listaQuizzesUsuario.innerHTML += ``; /* adicionar onclick criar quizz*/
        for (let i = 0; i < quizzesUsuario.length; i++) {
            listaQuizzesUsuario.innerHTML += `
            <li class="quizz">
                <div class="degrade">
                    <img src="${quizzesUsuarioSerializados[i].image}" onclick="quizzSelecionado()" onerror="this. style. display = 'none'">
                </div>
                <div class="titulo-quizz">
                <h2 onclick="quizzSelecionado()">${quizzesUsuarioSerializados[i].title}</h2>
                </div>
            </li> 
            `
        }
    }
}

renderizarQuizzesUsuario();

function getQuizzes() {
    const promise = axios.get(`${urlAPI}`);
    promise.then(renderizarQuizzes);
}

getQuizzes();

function renderizarQuizzes(resposta) {
    quizzes = resposta.data;
    console.log(quizzes);

    let listaQuizzes = document.querySelector('.quizzes-todos');
    listaQuizzes.innerHTML = ``;

    for (let i = 0; i < quizzes.length; i++) {
        listaQuizzes.innerHTML += `
        <li class="quizz" id="${quizzes[i].id}">
            <div class="degrade" onclick="quizzSelecionado(${quizzes[i].id})">
            </div>
            <img src="${quizzes[i].image}" onerror="this. style. display = 'none'">
            <div class="titulo-quizz">
            <h2 onclick="quizzSelecionado(${quizzes[i].id})">${quizzes[i].title}</h2>
            </div>
        </li> 
        `
    }
}

function criarQuizz() {
    const paginaInicial = document.querySelector('.pagina-inicial');
    paginaInicial.classList.add('hide');
}

function quizzSelecionado(idSelecionado) {
    const paginaInicial = document.querySelector('.pagina-inicial');
    paginaInicial.classList.add('hide'); 
}