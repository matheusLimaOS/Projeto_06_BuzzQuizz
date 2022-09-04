let quizzes = [];
let quizzesUsuario = '';
let quizz = [];
let urlAPI = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes';
let respostasCertas = 0;
let respostasErradas = 0;
let somaRespostas = 0;
let quantidadePerguntas = 0;

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
    sectionUsuario.setAttribute('data-identifier', "user-quizzes")
    const divTituloUsuario = document.createElement('div');
    divTituloUsuario.classList.add('titulo-quizzes-usuario', 'hide');
    divTituloUsuario.innerHTML = `
                                <h1>Seus Quizzes</h1>
                                <ion-icon name="add-circle" data-identifier="create-quizz" onclick="criarQuizz()"></ion-icon>`;
    sectionUsuario.appendChild(divTituloUsuario);
    const ulUsuario = document.createElement('ul');
    ulUsuario.classList.add('quizzes-usuario');
    sectionUsuario.appendChild(ulUsuario);
    main.appendChild(sectionUsuario);
    const sectionTodos = document.createElement('section');
    sectionTodos.classList.add('todos');
    sectionTodos.setAttribute('data-identifier', 'general-quizzes')
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
                <button data-identifier="create-quizz" onclick="telaInfoBasicaQuiz()">Criar Quizz</button> 
            </div>
            `
    } else {
        const tituloUsuario = document.querySelector('.titulo-quizzes-usuario');
        tituloUsuario.classList.remove('hide');
        listaQuizzesUsuario.innerHTML += ``;
        for (let i = 0; i < quizzesUsuario.length; i++) {
            listaQuizzesUsuario.innerHTML += `
            <li class="quizz" data-identifier="quizz-card">
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
        <li class="quizz" id="${quizzes[i].id}" data-identifier="quizz-card">
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
    header.innerHTML = `<img src="./img/BuzzQuizz.png">`
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
    const resumoQuizz = document.createElement('div');
    resumoQuizz.classList.add('resumo-pagina-quizz');
    resumoQuizz.setAttribute('data-identifier', 'quizz-result')
    main.appendChild(resumoQuizz);
    const navegacaoFinalQuizz = document.createElement('div');
    navegacaoFinalQuizz.classList.add('navegacao-pagina-quizz');
    navegacaoFinalQuizz.innerHTML = `
        <button class="reiniciar-quizz" onclick="reiniciaQuizz()">Reiniciar Quizz</button>
        <div class="voltar-home"><p onclick="voltaHome()">Voltar pra home</p></div>
    `
    main.appendChild(navegacaoFinalQuizz);

    renderizarQuizz();
}

function renderizarQuizz() {
    let perguntas = document.querySelector('.perguntas-pagina-quizz');
    quantidadePerguntas = quizz.questions.length;
    perguntas.innerHTML = ``;
    for (let i = 0; i < quizz.questions.length; i++) {
        let respostas = quizz.questions[i].answers;
        respostas = respostas.sort(comparador);

        let respostasMisturadas = ``;

        for (let u = 0; u < respostas.length; u++) {
            if (respostas[u].isCorrectAnswer === true) {
                respostasMisturadas += `
                <div class="resposta ocultar" onclick="verificarResposta(this, ${respostas[u].isCorrectAnswer})">
                    <img src="${respostas[u].image}" onerror="this. style. display = 'none'">
                    <p class="certa">${respostas[u].text}</p>
                </div>`
            } else {
                respostasMisturadas += `
                <div class="resposta ocultar" data-identifier="answer" onclick="verificarResposta(this, ${respostas[u].isCorrectAnswer}, ${i})">
                    <img src="${respostas[u].image}" onerror="this. style. display = 'none'">
                    <p class="errada">${respostas[u].text}</p>
                </div>`
            }
        }
        perguntas.innerHTML += `
            <div class="pergunta-pagina-quizz" data-identifier="question">
                <div class="titulo-pergunta" style = "background-color: ${quizz.questions[i].color}">
                   <p>${quizz.questions[i].title}</p>
                 </div>` + respostasMisturadas +
            `</div>`;
    }
}

function comparador() {
    return Math.random() - 0.5;
}

function verificarResposta(elemento, valor) {
    const perguntaRespondida = elemento.parentNode;
    const perguntaComResposta = perguntaRespondida.querySelector('.selecionado');
    const respostas = perguntaRespondida.querySelectorAll('.resposta');

    if (perguntaComResposta === null) {
        elemento.classList.add('selecionado');
        for (let i = 0; i < respostas.length; i++) {
            respostas[i].classList.remove('ocultar');
            const verifica = respostas[i].classList.contains('selecionado');

            if (verifica !== true) {
                respostas[i].classList.add('naoSelecionado');
            }
        }

        if (valor === true) {
            respostasCertas++;
        } else {
            respostasErradas++
        }

    }

    somaRespostas = respostasCertas + respostasErradas;
    if (somaRespostas === quantidadePerguntas) {
        resultadoQuizz();
        const proximaPergunta = perguntaRespondida.parentNode.nextElementSibling;

        setTimeout(function () { proximaPergunta.scrollIntoView({ behaviour: "smooth", block: "center" }) }, 2000);
    } else {
        const proximaPergunta = perguntaRespondida.nextElementSibling;
        setTimeout(function () { proximaPergunta.scrollIntoView({ behaviour: "smooth", block: "center" }) }, 2000);
    }
}

function resultadoQuizz() {
    let resultado = document.querySelector('.resumo-pagina-quizz');
    resultado.innerHTML = ``;
    let porcentagemFinal = Math.round((respostasCertas / quantidadePerguntas) * 100);
    let niveis = quizz.levels;
    const levelMaximo = niveis.filter(lM => lM.minValue <= porcentagemFinal);
    const levelFinal = levelMaximo[levelMaximo.length - 1];
    resultado.innerHTML = `
        <div class="titulo-nivel-final"><p>${porcentagemFinal}% de acerto: ${levelFinal.title}</p></div>
        <div class="info-nivel-final">
        <img src="${levelFinal.image}">
        <p>${levelFinal.text}</p>
        </div>`
}

function reiniciaQuizz() {
    const resetResultado = document.querySelector('.resumo-pagina-quizz');
    resetResultado.innerHTML = ``;
    const resetRespostas = document.querySelectorAll('.resposta');
    for (let i = 0; i < resetRespostas.length; i++) {
        resetRespostas[i].classList.add('ocultar');
        const verificaSelecionado = resetRespostas[i].classList.contains('selecionado');
        const verificaNaoSelecionado = resetRespostas[i].classList.contains('naoSelecionado');
        if (verificaSelecionado === true) {
            resetRespostas[i].classList.remove('selecionado');
        } else if (verificaNaoSelecionado === true) {
            resetRespostas[i].classList.remove('naoSelecionado');
        }
    }
    respostasCertas = 0;
    respostasErradas = 0;
    somaRespostas = 0;
    const primeiraPergunta = document.querySelector('.pergunta-pagina-quizz')
    setTimeout(function () { primeiraPergunta.scrollIntoView({ behaviour: "smooth", block: "center" }) }, 2000);
}

function voltaHome() {
    window.location.reload();
}