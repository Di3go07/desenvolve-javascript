//busca os elementos html
const texto = document.getElementsByTagName('p')[0]
const button = document.getElementsByTagName('button')[0]
const inputText = document.getElementById('campoTexto');

//atualiza a lista curtidas com as informações armazenadas
const curtidas = [];
const usuario = JSON.parse(localStorage.getItem('likes'));
for (i in usuario) {
    curtidas.push(usuario[i]);
}
console.log(curtidas)

//inicia o texto de likes
mostrarLikes();

//adiciona um like
function adicionarUser() {
    if (inputText.value != '') {
        if (curtidas.indexOf(inputText.value) <= -1) {
            curtidas.push(inputText.value);
            console.log(curtidas);
        } else {
            alert('Usuario ja curtiu');
        }
        salvarLista();
        mostrarLikes();
    }
}

//salva o novo like no armazenamento
function salvarLista() {
    const curtidasSalvas = JSON.stringify(curtidas);
    localStorage.setItem('likes', curtidasSalvas);
}

//inicia o texto de likes
function mostrarLikes() {
    if (curtidas.length == 0) {
        texto.innerText = 'Nenhuma curtida'
    }
    if (curtidas.length == 1) {
        texto.innerText = `${curtidas[0]} curtiu`;  
    }
    if (curtidas.length == 2) {
        texto.innerText = `${curtidas[0]} e ${curtidas[1]} curtiram`;
    }
    if (curtidas.length > 2) {
        texto.innerText = `${curtidas[0]}, ${curtidas[1]} e mais ${curtidas.length} curtiram`;
    }   
}

//limpar cache
function limparCache() {
    localStorage.clear('likes');
    location.reload();
}