let quizzes = [];
let quizzesUsuario = '';
let quizz = [];
let urlAPI = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes';

function getQuizzesUsuario() {

}

function paginaPrincipal(body) {
    body = document.querySelector('body');
    const main = document.createElement('main');
    main.classList.add('pagina-inicial');
    body.appendChild(main);
    const header = document.createElement('header');
    header.innerHTML = `<img src="./img/BuzzQuizz.png">`
    main.appendChild(header);
    const sectionUsuario = document.createElement('section');
    sectionUsuario.classList.add('usuario');
    const divTituloUsuario = document.createElement('div');
    divTituloUsuario.classList.add('titulo-quizzes-usuario', 'hide');
    divTituloUsuario.innerHTML = `
                                <h1>Seus Quizzes</h1>
                                <ion-icon name="add-circle" onclick="criarQuizz()"></ion-icon>`;
    sectionUsuario.appendChild(divTituloUsuario);
    const ulUsuario = document.createElement('ul');
    ulUsuario.classList.add('quizzes-usuario');
    sectionUsuario.appendChild(ulUsuario);
    main.appendChild(sectionUsuario);
    const sectionTodos = document.createElement('section');
    sectionTodos.classList.add('todos');
    main.appendChild(sectionTodos);
    const divTituloTodos = document.createElement('div');
    divTituloTodos.classList.add('titulo-quizzes-todos');
    divTituloTodos.innerHTML = `<h1>Todos os Quizzes</h1>`;
    sectionTodos.appendChild(divTituloTodos);
    const ulTodos = document.createElement('ul');
    ulTodos.classList.add('quizzes-todos');
    sectionTodos.appendChild(ulTodos);

    renderizarQuizzesUsuario();
    getQuizzes();
}

paginaPrincipal();

function renderizarQuizzesUsuario() {
    let quizzesUsuarioSerializados = JSON.stringify(quizzesUsuario);
    let listaQuizzesUsuario = document.querySelector('.quizzes-usuario');
    if (quizzesUsuario === '') {
        listaQuizzesUsuario.innerHTML = `
            <div class="quizz-usuario-vazio">
                <h1>Você não criou nenhum quizz ainda :(</h1>
                <button onclick="telaInfoBasicaQuiz()">Criar Quizz</button> 
            </div>
            `
    } else {
        const tituloUsuario = document.querySelector('.titulo-quizzes-usuario');
        console.log(tituloUsuario)
        tituloUsuario.classList.remove('hide');
        listaQuizzesUsuario.innerHTML += ``;
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



function getQuizzes() {
    const promise = axios.get(`${urlAPI}`);
    promise.then(renderizarQuizzes);
}

function renderizarQuizzes(resposta) {
    quizzes = resposta.data;

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
    paginaInicial.classList.remove('pagina-inicial');
    paginaInicial.innerHTML = ``;
    telaInfoBasicaQuiz();
}

function quizzSelecionado(idSelecionado) {
    const paginaInicial = document.querySelector('.pagina-inicial');
    paginaInicial.innerHTML = ``;
    const promise = axios.get(`${urlAPI}/${idSelecionado}`);
    promise.then(renderizarPaginaQuizz);
}

function renderizarPaginaQuizz(resposta) {
    quizz = resposta.data;

    const main = document.querySelector('main');
    main.classList.remove('pagina-inicial');
    main.classList.add('pagina-quizz');
    const header = document.createElement('header');
    header.innerHTML = `<p>BuzzQuizz</p>`
    main.appendChild(header);
    const banner = document.createElement('div');
    banner.classList.add('banner');
    banner.innerHTML = `
                        <div class="opacidade"></div>
                        <img src="${quizz.image}" onerror="this. style. display = 'none'">
                        <div class="titulo-banner">
                        <p>${quizz.title}</p>
                        </div>
    `
    main.appendChild(banner);
    const perguntas = document.createElement('div');
    perguntas.classList.add('perguntas-pagina-quizz');
    main.appendChild(perguntas);

    renderizarQuizz();
}

function renderizarQuizz() {
    let perguntas = document.querySelector('.perguntas-pagina-quizz');
    perguntas.innerHTML = ``;
    for (let i = 0; i < quizz.questions.length; i++) {
        let respostas = quizz.questions[i].answers;
        console.log(respostas);
        respostas = respostas.sort(comparador);
    
        let respostasMisturadas = ``;

        for (let i = 0; i < respostas.length; i++) {
            respostasMisturadas += `
                <div class="resposta">
                    <img src="${respostas[i].image}" onerror="this. style. display = 'none'">
                    <p>${respostas[i].text}</p>
                </div>`
        }
        perguntas.innerHTML += `
            <div class="pergunta-pagina-quizz">
                <div class="titulo-pergunta">
                   <p>${quizz.questions[i].title}</p>
                 </div>` + respostasMisturadas + 
            `</div>`
    }
}

function comparador() {
    return Math.random() - 0.5;
}