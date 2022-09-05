let quiz = {
    title:"",
    image:"",
    questions: [{}]
}

let messages = [
    'É necessário que o titulo tenha entre 20 e 65 caracteres',
    'É necessário informar uma URL de imagem válida!',
    'É necessário que a quantidade de perguntas sejá valida e maior que 3!'
]
let quantNiveis = 0;
let quantPerg = 0;

function limparBody(){
    let body = document.querySelector('body');
    body.innerHTML = "";
}

function telaInfoBasicaQuiz(){
    let body = document.querySelector('body');
    let container = document.createElement('div');

    eventoErro();

    limparBody();
    criaHeader(body);

    container.classList.add('containerCriaQuiz');
    container.innerHTML += '<h1> Comece pelo começo</h1>';
    container.innerHTML += `
        <form onSubmit='onSubmit();return false'>
            <input type='text' placeholder = "Título do seu quizz" maxlength='65' minlength='20' oninvalid="mensagemErro(this,'${messages[0]}')" required/>
            <input type='url' placeholder = "URL da imagem do seu quizz" oninvalid="mensagemErro(this,'${messages[0]}')" required/>
            <input type='number' placeholder = "Quantidade de perguntas do quizz" oninvalid="mensagemErro(this,'${messages[2]}')" required/>
            <input type='number' placeholder = "Quantidade de níveis do quizz" required/>
            <button type='submit' class='submit'> Prosseguir pra criar perguntas </button>
        </form>
    `;

    body.appendChild(container);
}

function mensagemErro(irmão,texto){
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

function valida(irmão,num){
    mensagemErro(irmão,messages[num]);
}

function eventoErro(){
    let input = document.querySelectorAll('input');

    for(let i=0; i<input.length;i++){
        input.setCustomValidity('');
    }

    document.querySelector("body").addEventListener("click", limpaErro);
}

function onSubmit() {
    quantPerg = document.querySelector(".containerCriaQuiz form input:nth-child(3)");
    quantNiveis = document.querySelector(".containerCriaQuiz form input:nth-child(4)");

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

    let body = document.querySelector('body');
    let container = document.createElement('div');
    quantPerg = 4;
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
                <input type='text' placeholder = "Texto da pergunta" minlength='20' oninvalid="mensagemErro(this,'${messages[0]}')" required/>
                <input placeholder = "Cor de fundo da pergunta"/>
                <div class='respostaCorreta'>
                    <div class="titulo">
                        <p>Resposta Correta</p>
                    </div>
                    <input type='text' placeholder = "Resposta correta" oninvalid="mensagemErro(this,'${messages[0]}')"/>
                    <input type='url' placeholder = "URL da imagem" oninvalid="mensagemErro(this,'${messages[0]}')"/>
                </div>
                <div class='respostaErrada'>
                    <div class="titulo">
                        <p>Resposta incorretas</p>
                    </div>
                    <input type='text' placeholder = "Resposta incorreta 1" oninvalid="mensagemErro(this,'${messages[0]}')"/>
                    <input type='url' placeholder = "URL da imagem 1" oninvalid="mensagemErro(this,'${messages[0]}')"/>
                    <input type='text' placeholder = "Resposta incorreta 2" oninvalid="mensagemErro(this,'${messages[0]}')"/>
                    <input type='url' placeholder = "URL da imagem 2" oninvalid="mensagemErro(this,'${messages[0]}')"/>
                    <input type='text' placeholder = "Resposta incorreta 3" oninvalid="mensagemErro(this,'${messages[0]}')"/>   
                    <input type='url' placeholder = "URL da imagem 3" oninvalid="mensagemErro(this,'${messages[0]}')"/>  
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
                    <input type='text' placeholder = "Texto da pergunta" maxlength='65' minlength='20' oninvalid="mensagemErro(this,'${messages[0]}')" required/>
                    <input placeholder = "Cor de fundo da pergunta"/>
                    <div class='respostaCorreta'>
                        <div class="titulo">
                            <p>Resposta Correta</p>
                        </div>
                        <input type='text' placeholder = "Resposta correta" oninvalid="mensagemErro(this,'${messages[0]}')" required/>
                        <input type='url' placeholder = "URL da imagem" oninvalid="mensagemErro(this,'${messages[0]}')"/>
                    </div>
                    <div class='respostaErrada'>
                        <div class="titulo">
                            <p>Resposta incorretas</p>
                        </div>
                        <input type='text' placeholder = "Resposta incorreta 1" oninvalid="mensagemErro(this,'${messages[0]}')"/>
                        <input type='url' placeholder = "URL da imagem 1" oninvalid="mensagemErro(this,'${messages[0]}')"/>
                        <input type='text' placeholder = "Resposta incorreta 2" oninvalid="mensagemErro(this,'${messages[0]}')"/>
                        <input type='url' placeholder = "URL da imagem 2" oninvalid="mensagemErro(this,'${messages[0]}')"/>
                        <input type='text' placeholder = "Resposta incorreta 3" oninvalid="mensagemErro(this,'${messages[0]}')"/>   
                        <input type='url' placeholder = "URL da imagem 3" oninvalid="mensagemErro(this,'${messages[0]}')"/>  
                    </div>
                </form>
            </div>
        `;
    }

    container.innerHTML += `
        <button class='submit' onClick="verificaPerguntas()"> Prosseguir para criar niveis </button>
    `
    body.appendChild(container);
}

function expandir(numPergunta){
    esconder();
    let pergunta = document.querySelector(`.containerCriaQuiz .pergunta:nth-child(${numPergunta})`);
    let buttonExpandir = pergunta.children[0].children[1];
    let form = pergunta.children[1];
    buttonExpandir.classList.add('displayNone');
    form.classList.add('formulario');
    form.classList.remove('displayNone');
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

        console.log(respostas);

        if(respostas!==false){
            pergunta.answers = respostas;
        }
        else{
            isTudoOK = false;
        }
    }
    if(isTudoOK){
        limparBody();
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
            console.log(color[i]);
            mensagemErro(irmão,"É necessário que a cor esteja num formato hexadecimal válido (#FFFFFF)");
            return;
        }
    }

}
function verificaRespostas(divPergunta,divRespostaCorreta,divRespostaErradas){
    let resposta;
    let respostas = [];
    let existeRespostaCerta = false;
    let existeRespostaErrada = false;

    if(divRespostaCorreta.children[1].value.length > 0){
        resposta = {
            text: divRespostaCorreta.children[1].value,
            image: divRespostaCorreta.children[2].value,
            isCorrectAnswer: true
        }
        respostas.push(resposta);
        existeRespostaCerta = true;
    }

    if(divRespostaErradas.children[5].value.length > 0){
        resposta = {
            text: divRespostaErradas.children[5].value,
            image: divRespostaErradas.children[6].value,
            isCorrectAnswer: false
        }
        respostas.push(resposta);
        existeRespostaErrada = true;
    }

    if(divRespostaErradas.children[3].value.length > 0){
        resposta = {
            text: divRespostaErradas.children[3].value,
            image: divRespostaErradas.children[4].value,
            isCorrectAnswer: false
        }
        respostas.push(resposta);
        existeRespostaErrada = true;
    }

    if(divRespostaErradas.children[1].value.length > 0){
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
function telaNiveis(){
    limparBody();

    
}