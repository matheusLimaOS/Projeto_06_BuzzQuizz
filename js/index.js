function telaInfoBasicaQuiz(){
    let body = document.querySelector('body');
    let container = document.createElement('div');
    criaHeader(body);
    container.classList.add('containerCriaQuiz')
    container.innerHTML += '<h1> Comece pelo começo</h1>';
    container.innerHTML += `
        <form>
            <input placeholder = "Título do seu quizz"/>
            <input placeholder = "URL da imagem do seu quizz"/>
            <input placeholder = "Quantidade de perguntas do quizz"/>
            <input placeholder = "Quantidade de níveis do quizz"/>
        </form>
        <button onClick="onSubmit()"> Prosseguir pra criar perguntas </button>
    `;
    body.appendChild(container);
}

function mensagemErro(irmão,texto){
    let divMsg = document.createElement('div');

    divMsg.innerHTML = texto;
    divMsg.classList.add('erro');

    irmão.after(divMsg);
    setTimeout(()=>{
        let erro = document.querySelector('.containerCriaQuiz form .erro');
        if(erro!== undefined && erro !== null){
            erro.remove();
        }
    },3000)
}

function onSubmit() {
    let button = document.querySelector(".containerCriaQuiz button");
    let titulo = document.querySelector(".containerCriaQuiz form input:nth-child(1)");
    let URLQuizz = document.querySelector(".containerCriaQuiz form input:nth-child(2)");
    let quantPerg = document.querySelector(".containerCriaQuiz form input:nth-child(3)");
    let quantNiveis = document.querySelector(".containerCriaQuiz form input:nth-child(4)");
    let checaURL = (URLQuizz.value.includes("https://") || URLQuizz.value.includes("http://")) && URLQuizz.value.includes(".");

    button.setAttribute('disabled','true');
    if(titulo.value.length===0 || titulo.value.length<20 || titulo.value.length>65){
        mensagemErro(titulo,'É necessário que o titulo tenha entre 20 e 65 caracteres');
    }
    if(URLQuizz.value.length===0 && checaURL){
        mensagemErro(URLQuizz,'É necessário informar uma URL de imagem válida!');
    }

    if(quantPerg.value.length===0 || isNaN(quantPerg.value) || quantPerg.value < 3){
        quantPerg.value = "";
        mensagemErro(quantPerg,'É necessário que a quantidade de perguntas sejá valida e maior que 3!');
    }

    if(quantNiveis.value.length===0 || isNaN(quantNiveis.value)){
        quantNiveis.value = "";
        mensagemErro(quantNiveis,'É necessário informar uma quantidade válida de niveis!');
    }

    setTimeout(() => {
        button.removeAttribute('disabled');
    }, 3000);
}

function criaHeader(body){
    let header = document.createElement('div');
    header.classList.add('navbar');
    header.innerHTML = `<p>BuzzQuizz</p>`
    body.appendChild(header);
}