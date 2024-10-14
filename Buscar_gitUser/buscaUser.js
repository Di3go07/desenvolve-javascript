( () => {
    
    //Configura botão
    const botaoBusca = document.getElementById('buscaUser')
    botaoBusca.addEventListener ('click', () => procuraUser())

    //Armazena input
    const inputUser = document.getElementById('digitaNome');
    inputUser.addEventListener ('keyup', () => {
        const usuario = inputUser.value;
        localStorage.setItem('Usuario_input', usuario);
    })
    

    //Busca usuario na API
    async function procuraUser() {
            //entrando em contato com a API
            const user = localStorage.getItem('Usuario_input');
            const devs = await fetch(`https://api.github.com/users/${user}`);
            const devData = await devs.json();
            
            //verifica se o usuario existe
            if (devData.login == undefined) {
                alert('Usuario não existe')
            } else {
                exibeInfos(devData);

            }
    }


    
    //Edita elemenos no DOM
    function exibeInfos(infos) {
        const titulo = document.getElementById('userName');
        titulo.innerText = infos.login;

        const imagem = document.querySelector('img');
        imagem.style.visibility = 'visible';
        imagem.src = `${infos.avatar_url}`;

        const dados = ['name', 'id', 'public_repos', 'followers', 'following']
        const busca = [infos.name, infos.id, infos.public_repos, infos.followers, infos.following]
        for (let i = 0; i < dados.length; i++) {    
            const texto = document.getElementById(dados[i]);
            texto.innerText = (`${dados[i]}: ${busca[i]}`);
        }

    }   

} ) ();