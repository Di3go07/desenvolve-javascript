//PÁGINA DE LOGIN 

( () => {
    
    const inputUser = document.getElementById('inputUser');
    const inputSenha = document.getElementById('inputSenha');
    const inputAvatar = document.getElementById('inputImagem');
    const botaoLogIn = document.getElementById('botaoLogIn');

    botaoLogIn.addEventListener('click', () => {
        sessionStorage.setItem('User_logado', [inputUser.value, inputSenha.value, inputAvatar.value]); 
        window.location.assign("http://127.0.0.1:5500/home.html");
    })

} ) ();
