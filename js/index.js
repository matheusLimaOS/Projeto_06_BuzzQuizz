let quizzes = [];
let quizzesUsuario = [];
let quizz = [];
let urlAPI = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes';
let respostasCertas = 0;
let respostasErradas = 0;
let somaRespostas = 0;
let quantidadePerguntas = 0;
let idsUsuarioLocal = "";
let idsUsuarioDesserializado = [];
let getQuizz = [];
let quizzesFiltrados = [];


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

    getQuizzesUsuario();
    getQuizzes();
}

paginaPrincipal();

/*  */

function getQuizzesUsuario() {
    idsUsuarioLocal = localStorage.getItem("lista-quizzes");
    console.log(idsUsuarioLocal);
    idsUsuarioDesserializado = JSON.parse(idsUsuarioLocal);
    console.log(idsUsuarioDesserializado);
    if (idsUsuarioDesserializado !== null) {

        const promise = axios.get(`${urlAPI}/${idsUsuarioDesserializado}`);
        promise.then(renderizarQuizzesUsuario);

    } else {
        renderizarQuizzesUsuario();
    }
}

/*  */

function renderizarQuizzesUsuario(resposta) {
    let listaQuizzesUsuario = document.querySelector('.quizzes-usuario');
    if (idsUsuarioLocal === null) {
        listaQuizzesUsuario.innerHTML = `
            <div class="quizz-usuario-vazio">
                <h1>Você não criou nenhum quizz ainda :(</h1>
                <button data-identifier="create-quizz" onclick="telaInfoBasicaQuiz()">Criar Quizz</button> 
            </div>
            `
    } else {
        console.log(resposta);
        quizzesUsuario = resposta.data;
        const tituloUsuario = document.querySelector('.titulo-quizzes-usuario');
        tituloUsuario.classList.remove('hide');
        listaQuizzesUsuario.innerHTML += ``;
        listaQuizzesUsuario.innerHTML += `
            <li class="quizz-usuario" data-identifier="quizz-card">
                <div class="degrade" onclick="quizzSelecionadoUsuario(${idsUsuarioDesserializado})">
                    <img src="${quizzesUsuario.image}" onerror="this. style. display = 'none'">
                </div>
                <div class="titulo-quizz">
                <p onclick="quizzSelecionadoUsuario(${idsUsuarioDesserializado})">${quizzes.title}</p>
                </div>
            </li> 
            `

    }
}

function getQuizzes() {
    const promise = axios.get(`${urlAPI}`);
    promise.then(renderizarQuizzes);
    console.log("funciona");
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
        <p onclick="quizzSelecionado(${quizzes[i].id})">${quizzes[i].title}</p>
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
    console.log(quizz)

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
    resumoQuizz.classList.add('hide');
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

/* function quizzSelecionadoUsuario(idLocal) {
    const paginaInicial = document.querySelector('.pagina-inicial');
    paginaInicial.innerHTML = ``;

    getQuizz = quizzesUsuarioDesserializado.find((q) => {
        return q.id === idLocal;
    });

    console.log(getQuizz);
    renderizarPaginaQuizzLocal();
}

function renderizarPaginaQuizzLocal() {
    quizz = getQuizz;
    console.log(quizz)

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
    resumoQuizz.classList.add('hide');
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
} */

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
    resultado.classList.remove('hide');
    resultado.innerHTML = ``;
    let porcentagemFinal = Math.round((respostasCertas / quantidadePerguntas) * 100);
    let niveis = quizz.levels;
    niveis.sort(function (a, b) {
        if (a.minValue < b.minValue) {
            return -1;
        } else {
            return true;
        }
    });
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
    resetResultado.classList.add('hide');
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