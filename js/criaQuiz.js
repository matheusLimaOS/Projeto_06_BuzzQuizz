let quiz = {
    title:"",
    image:"",
    questions: [],
    levels: []
}
let messages = [
    'É necessário que o titulo tenha entre 20 e 65 caracteres',
    'É necessário informar uma URL de imagem válida!',
    'É necessário que a quantidade de perguntas sejá valida e maior que 3!',
    'É necessário que a quantidade de perguntas sejá valida e maior que 2!'
]
let quantNiveis;
let quantPerg;

function limparBody(){
    let body = document.querySelector('body');
    body.innerHTML = "";
}

function telaInfoBasicaQuiz(){
    checaURL()
    let body = document.querySelector('body');
    let container = document.createElement('div');

    limparBody();
    criaHeader(body);

    container.classList.add('containerCriaQuiz');
    container.innerHTML += '<h1> Comece pelo começo</h1>';
    container.innerHTML += `
        <form onSubmit='onSubmit();return false'>
            <div class='caixa'>
                <input type='text' placeholder = "Título do seu quizz" maxlength='65' minlength='20' oninvalid="mensagemErro(this,'${messages[0]}')" required/>
                <input type='url' placeholder = "URL da imagem do seu quizz" oninvalid="mensagemErro(this,'${messages[0]}')" required/>
                <input type='number' placeholder = "Quantidade de perguntas do quizz" oninvalid="mensagemErro(this,'${messages[2]}')" required/>
                <input type='number' placeholder = "Quantidade de níveis do quizz" oninvalid="mensagemErro(this,'${messages[3]}')" required/>
            </div>
            <button type='submit' class='submit'> Prosseguir pra criar perguntas </button>
        </form>
    `;

    body.appendChild(container);
    eventoErro();
}

function mensagemErro(irmão,texto){
    limpaErro();
    let divMsg = document.createElement('div');

    divMsg.innerHTML = texto;
    divMsg.classList.add('erro');

    irmão.after(divMsg);
}

function limpaErro(){
    let erros = document.querySelectorAll('.erro');

    if(erros !== undefined){
        for(let i=0;i<erros.length;i++){
            erros[i].remove();
        }
    }
}

function eventoErro(){
    let inputs = document.querySelectorAll("input");
    for(let i=0;i<inputs.length;i++){
        inputs[0].addEventListener("change", limpaErro);
    }
}

function onSubmit() {
    quiz.title = document.querySelector(".containerCriaQuiz form input:nth-child(1)").value;
    quiz.image = document.querySelector(".containerCriaQuiz form input:nth-child(2)").value;
    quantPerg = document.querySelector(".containerCriaQuiz form input:nth-child(3)").value;
    quantNiveis = document.querySelector(".containerCriaQuiz form input:nth-child(4)").value;

    criaPerguntas();
}

function criaHeader(body){
    let header = document.createElement('div');
    header.classList.add('navbar');
    header.innerHTML = `<img src="./img/BuzzQuizz.png"/>`
    body.appendChild(header);
}

function criaPerguntas(){
    limparBody();
    eventoErro();
    let body = document.querySelector('body');
    let container = document.createElement('div');
    criaHeader(body);

    container.classList.add('containerCriaQuiz')
    container.innerHTML += '<h1> Crie suas perguntas </h1>';
        container.innerHTML += `
        <div class='pergunta'>
            <div class="titulo">
                <p>Pergunta 1</p>
                <button class="ion-icon displayNone" onClick="expandir(2)" data-identifier="expand">
                    <ion-icon name="create-outline"></ion-icon>
                </button>
            </div>
            <form class="formulario" data-identifier="question-form">
                <input type='text' placeholder = "Texto da pergunta" minlength='20' required/>
                <input placeholder = "Cor de fundo da pergunta"/>
                <div class='respostaCorreta'>
                    <div class="titulo">
                        <p>Resposta Correta</p>
                    </div>
                    <input type='text' placeholder = "Resposta correta" />
                    <input type='url' placeholder = "URL da imagem" />
                </div>
                <div class='respostaErrada'>
                    <div class="titulo">
                        <p>Resposta incorretas</p>
                    </div>
                    <input type='text' placeholder = "Resposta incorreta 1" />
                    <input type='url' placeholder = "URL da imagem 1" />
                    <input type='text' placeholder = "Resposta incorreta 2" />
                    <input type='url' placeholder = "URL da imagem 2" />
                    <input type='text' placeholder = "Resposta incorreta 3" />   
                    <input type='url' placeholder = "URL da imagem 3" />  
                </div>
            </form>
        </div>
    `;
    for(i=2;i<=quantPerg;i++){
        container.innerHTML += `
            <div class='pergunta'>
                <div class="titulo">
                    <p>Pergunta ${i}</p>
                    <button class="ion-icon" onClick="expandir(${i+1})" data-identifier="expand">
                        <ion-icon name="create-outline"></ion-icon>
                    </button> 
                </div>
                <form class="displayNone" data-identifier="question-form">
                    <input type='text' placeholder = "Texto da pergunta" required/>
                    <input placeholder = "Cor de fundo da pergunta"/>
                    <div class='respostaCorreta'>
                        <div class="titulo">
                            <p>Resposta Correta</p>
                        </div>
                        <input type='text' placeholder = "Resposta correta" required/>
                        <input type='url' placeholder = "URL da imagem" />
                    </div>
                    <div class='respostaErrada'>
                        <div class="titulo">
                            <p>Resposta incorretas</p>
                        </div>
                        <input type='text' placeholder = "Resposta incorreta 1" />
                        <input type='url' placeholder = "URL da imagem 1" />
                        <input type='text' placeholder = "Resposta incorreta 2" />
                        <input type='url' placeholder = "URL da imagem 2" />
                        <input type='text' placeholder = "Resposta incorreta 3" />   
                        <input type='url' placeholder = "URL da imagem 3" />  
                    </div>
                </form>
            </div>
        `;
    }

    container.innerHTML += `
        <button class='submit' onClick="verificaPerguntas()"> Prosseguir para criar niveis </button>
    `
    body.appendChild(container);
    eventoErro();
}

function expandir(numPergunta){
    limpaErro();
    esconder();
    let pergunta = document.querySelector(`.containerCriaQuiz .pergunta:nth-child(${numPergunta})`);
    let buttonExpandir = pergunta.children[0].children[1];
    let form = pergunta.children[1];
    buttonExpandir.classList.add('displayNone');
    form.classList.add('formulario');
    form.classList.remove('displayNone');
}
function checaURL(url){
    var valid = /^(ftp|http|https):\/\/[^ "]+$/.test(url);  

    return valid
}
function esconder(){
    let icons = document.querySelectorAll('.ion-icon');
    let forms = document.querySelectorAll('form');
    let i=0;
    for(i=0;i<icons.length;i++){
        icons[i].classList.remove('displayNone');
        forms[i].classList.remove('formulario');
        forms[i].classList.add('displayNone');
    }
}

function verificaPerguntas(){
    limpaErro();
    let perguntas = [];
    let pergunta = {
        title: "",
        color: "",
        answers: []
    }
    let isTudoOK = true;
    let button = document.querySelector('.submit');
    button.setAttribute('disabled','');

    for(let i=1;i<=quantPerg;i++){
        
        let divPergunta = document.querySelector(`.containerCriaQuiz .pergunta:nth-child(${i+1})`);
        let divRespostaCorreta = document.querySelector(`.containerCriaQuiz .pergunta:nth-child(${i+1}) .respostaCorreta`);
        let divRespostaErradas = document.querySelector(`.containerCriaQuiz .pergunta:nth-child(${i+1}) .respostaErrada`);

        pergunta = {
            title: "",
            color: "",
            answers: []
        }

        resposta = {
            text: "",
            image: "",
            isCorrectAnswer: false
        }

        pergunta.title = divPergunta.children[1].children[0].value;
        pergunta.color = divPergunta.children[1].children[1].value;

        verificaPerguntaColor(divPergunta.children[1].children[1]);
        verificaPerguntaTitle(divPergunta.children[1].children[0]);
        let respostas = verificaRespostas(divPergunta,divRespostaCorreta,divRespostaErradas);

        if(respostas!==false){
            pergunta.answers = respostas;
            perguntas.push(pergunta);
        }
        else{
            isTudoOK = false;
        }
    }
    if(isTudoOK){
        quiz.questions = perguntas;
        criaNiveis();
    }
    setTimeout(()=>{
        button.removeAttribute('disabled')
    },3000)
}
function verificaPerguntaTitle(irmão){
    if(irmão.value === 0 || irmão.value.length<20){
        mensagemErro(irmão,"É necessário que a pergunta tenha no minimo 20 caracteres");
    }
}
function verificaPerguntaColor(irmão){
    
    let color = irmão.value.toLowerCase();
    let hexaDecimal = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];

    if(color.length !=7 || color[0]!='#'){
        mensagemErro(irmão,"É necessário que a cor esteja num formato hexadecimal válido (#FFFFFF)");
        return;
    }

    for(let i=1;i<color.length;i++){
        if(!hexaDecimal.includes(color[i])){
            mensagemErro(irmão,"É necessário que a cor esteja num formato hexadecimal válido (#FFFFFF)");
            return;
        }
    }

}
function verificaRespostas(divPergunta,divRespostaCorreta,divRespostaErradas){
    limpaErro();
    let resposta;
    let respostas = [];
    let existeRespostaCerta = false;
    let existeRespostaErrada = false;

    if(divRespostaCorreta.children[1].value.length > 0 && checaURL(divRespostaErradas.children[2].value)){
        resposta = {
            text: divRespostaCorreta.children[1].value,
            image: divRespostaCorreta.children[2].value,
            isCorrectAnswer: true
        }
        respostas.push(resposta);
        existeRespostaCerta = true;
    }

    if(divRespostaErradas.children[5].value.length > 0 && checaURL(divRespostaErradas.children[6].value)){
        resposta = {
            text: divRespostaErradas.children[5].value,
            image: divRespostaErradas.children[6].value,
            isCorrectAnswer: false
        }
        respostas.push(resposta);
        existeRespostaErrada = true;
    }

    if(divRespostaErradas.children[3].value.length > 0 && checaURL(divRespostaErradas.children[4].value)){
        resposta = {
            text: divRespostaErradas.children[3].value,
            image: divRespostaErradas.children[4].value,
            isCorrectAnswer: false
        }
        respostas.push(resposta);
        existeRespostaErrada = true;
    }

    if(divRespostaErradas.children[1].value.length > 0 && checaURL(divRespostaErradas.children[2].value)){
        resposta = {
            text: divRespostaErradas.children[1].value,
            image: divRespostaErradas.children[2].value,
            isCorrectAnswer: false
        }
        respostas.push(resposta);
        existeRespostaErrada = true;
    }

    if(existeRespostaCerta && existeRespostaErrada){
        return respostas
    }
    else{
        mensagemErro(divPergunta.children[0],"A pergunta deve ter uma resposta Correta e pelo menos uma resposta errada válida");
        return false;
    }

}
function criaNiveis(){
    limparBody();
    let body = document.querySelector('body');
    let container = document.createElement('div');
    criaHeader(body);

    container.classList.add('containerCriaQuiz')
    container.innerHTML += '<h1> Crie suas perguntas </h1>';
        container.innerHTML += `
        <div class='pergunta'>
            <div class="titulo">
                <p>Nivel 1</p>
                <button class="ion-icon displayNone" onClick="expandir(2)" data-identifier="expand">
                    <ion-icon name="create-outline"></ion-icon>
                </button>
            </div>
            <form class="formulario" data-identifier="level">
                <input type='text' placeholder = "Título do nível" minlength='20' required/>
                <input placeholder = "% de acerto mínima" required/>
                <input type='url' placeholder = "URL da imagem do nível" required/>
                <input type='text' placeholder = "Descrição do nível" required/>
            </form>
        </div>
    `;
    for(i=2;i<=quantNiveis;i++){
        container.innerHTML += `
            <div class='pergunta'>
                <div class="titulo">
                    <p>Nivel ${i}</p>
                    <button class="ion-icon" onClick="expandir(${i+1})" data-identifier="expand">
                        <ion-icon name="create-outline"></ion-icon>
                    </button>
                </div>
                <form class="displayNone" data-identifier="level">
                    <input type='text' placeholder = "Título do nível" minlength='20' required/>
                    <input placeholder = "% de acerto mínima" required/>
                    <input type='url' placeholder = "URL da imagem do nível" required/>
                    <input type='text' placeholder = "Descrição do nível" required/>
                </form>
            </div>
        `;
    }

    container.innerHTML += `
        <button class='submit' onClick="finalizaQuiz()"> Finalizar Quizz </button>
    `
    body.appendChild(container);
    eventoErro();
}
function finalizaQuiz(){
    let button = document.querySelector('.submit');
    button.setAttribute('disabled','');
    let niveis = verificaNiveis()
    if(niveis!==false){
        quiz.levels=niveis;
        console.log(quiz);
        let promise = axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes',quiz);

        promise.then((res)=>{
            let quizzes = localStorage.getItem("lista-quizzes");
            if(quizzes === undefined || quizzes === null){
                localStorage.setItem('lista-quizzes',JSON.stringify([res.data.id]));
            }
            else{

                let quiz = JSON.parse(quizzes);
                quiz.push(res.data.id);
                quizzes = JSON.stringify(quiz);
                localStorage.setItem('lista-quizzes',quizzes);
            }

            visualizarQuizFeito()
        })
    }
    else{

    }
    setTimeout(()=>{
        button.removeAttribute('disabled')
    },3000)
    
}
function verificaNiveis(){
    limpaErro();
    let levels = [];

    let isTudoOK = true;
    let is0 = false;
    let button = document.querySelector('.submit');
    button.setAttribute('disabled','');

    for(let i=1;i<=quantNiveis;i++){
        let level = {
            title: "",
            image: "",
            text: "",
            minValue: 0
        }

        let divPergunta = document.querySelector(`.containerCriaQuiz .pergunta:nth-child(${i+1})`); 

        if(divPergunta.children[1].children[3].value.length < 30){
            isTudoOK=false
            mensagemErro(divPergunta.children[1].children[3],'Precisa ter no minimo 30 caracteres');
        }
        else{
            level.text = divPergunta.children[1].children[3].value;
        }

        if(checaURL(divPergunta.children[1].children[2])){
            isTudoOK=false
            mensagemErro(divPergunta.children[1].children[2],'É necesário que seja uma URL válida');
        }
        else{
            level.image = divPergunta.children[1].children[2].value;
        }

        if(divPergunta.children[1].children[1].value < 0 || divPergunta.children[1].children[1].value > 100 || divPergunta.children[1].children[1].value ==='' ){
            isTudoOK=false
            mensagemErro(divPergunta.children[1].children[1],'Deve ser um valor entre 0 e 100');
        }
        else{
            if(parseInt(divPergunta.children[1].children[1].value) === 0){
                is0 = true;
            }
            level.minValue = divPergunta.children[1].children[1].value;
        }

        if(divPergunta.children[1].children[0].value.length < 10){
            isTudoOK=false
            mensagemErro(divPergunta.children[1].children[0],'Precisa ter no minimo 10 caracteres');
        }
        else{
            level.title = divPergunta.children[1].children[0].value;
        }

        levels.push(level);
    }

    setTimeout(()=>{
        button.removeAttribute('disabled')
    },3000)
    if(!is0){
        alert("é necessário que um campo % de acerto mínima tenha valor 0");
    }
    if(isTudoOK===true && is0){
        return levels;
    }
    else{
        return false;
    }
}
function retornar (){
    limparBody();
    paginaPrincipal();
}

function visualizarQuizFeito(){
    limparBody();

    let body = document.querySelector('body');
    let container = document.createElement('div');

    criaHeader(body);

    container.classList.add('containerCriaQuiz');

    container.innerHTML += '<h1> Seu quizz está pronto! </h1>';
    container.innerHTML += `
        <div class='viewQuiz'>
            <img src="${quiz.image}"/>
            <p>${quiz.title}</p>
        </div>
    `
    container.innerHTML += `
        <button class='submit' onclick="quizCriadoSelecionado(${quiz.title})"> Acessar Quizz </button>
        <button class='retornar' onclick="retornar()"> Voltar pra home </button>
    `

    body.appendChild(container)
}