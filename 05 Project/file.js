

var h = 0;
var m = 0;
var s = 0;

var tempo = 1000;//Quantos milésimos valem 1 segundo?
var cron;

//Inicia o temporizador
function start() {
    cron = setInterval(() => { timer(); }, tempo);
}

//Para o temporizador mas não limpa as variáveis
function pause() {
    clearInterval(cron);
}

//Para o temporizador e limpa as variáveis
function reset() {
    clearInterval(cron);
    h = 0;
    m = 0;
    s = 0;

    document.getElementById('number').innerText = '00:00:00';
}

//Faz a contagem do tempo e exibição
function timer() {
    s++; //Incrementa +1 na variável ss

    if (s == 60) { //Verifica se deu 59 segundos
        s = 0; //Volta os segundos para 0
        m++; //Adiciona +1 na variável mm

        if (m == 60) { //Verifica se deu 59 minutos
            m = 0;//Volta os minutos para 0
            h++;//Adiciona +1 na variável hora
        }
    }

    //Cria uma variável com o valor tratado HH:MM:SS
    var format = (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
    
    //Insere o valor tratado no elemento counter
    document.getElementById('number').innerText = format;

    //Retorna o valor tratado
    return format;
}