//HOME
( () => {

    //FUNÇÕES ACIONADAS AO CARREGAR A PÁGINA
    window.addEventListener('load', function() {
        resgataElemento();
        verificaUser();
    });


    //Verifica se tem algum usuario logado 
    function verificaUser() {
        const verficador = sessionStorage.getItem('User_logado')
        if (verficador == null) {
            window.location.assign("http://127.0.0.1:5500/login.html");
            alert('Você precisa estar logado para acessar a página')
        }
    }

    //Resgata os posts anteriores
    const indexes = [0];
    if (localStorage.length > 0) {
        for (let i = 0; i < localStorage.length; i++ ) {
            indexes.push(1)
        }
    }
        

    //Texto dinâmico
    const textoPensando = document.getElementById('Textopensando');
    const infos = (sessionStorage.getItem('User_logado'));
    const dados = infos.split(',');
    
    const user = dados[0]
    const imagem = dados[2]

    textoPensando.innerText = (`O que você está pensando, ${user}`);


    //Configurando botão de post
    const botaoPostagem = document.getElementById('botaoPostagem');

    botaoPostagem.addEventListener('click', () => {     //salva postagem no localStorage
        const textoPostagem = document.getElementById('areaPostagem');
        const postagem = {
            'nome': user,
            'avatar': imagem,
            'post': textoPostagem.value,
            'likes': 0,
        }
        const infos = JSON.stringify(postagem);
        localStorage.setItem(`post ${indexes.length}`, infos);
        criaElemento();
        textoPostagem.value = "";
        indexes.push(1);

    })

    //Função que cria um novo post na DOM
    function criaElemento() { 
        const mainArticle = document.getElementById("postagens");
        const data = JSON.parse(localStorage.getItem(`post ${indexes.length}`));
        const nome = data.nome;
        const avatar = data.avatar;
        const post = data.post;
        const likes = data.likes;

        //criando na DOM
        const newDiv = document.createElement("div");
        newDiv.id = `post ${indexes.length}`;
        newDiv.style.marginBottom = '30px';
        newDiv.style.marginLeft = '25px';
        newDiv.style.marginRight = '25px';
        newDiv.style.paddingTop = '20px';
        newDiv.style.paddingBottom = '20px';
        newDiv.style.paddingLeft = '20px';
        newDiv.style.backgroundColor = '#A9D9D0';
        newDiv.style.border = '1px solid #027373';
        newDiv.style.borderRadius = "10px";

        const area_user = document.createElement('section');
        area_user.id = 'area_user';
        area_user.style.display = 'flex';
        area_user.style.flexDirection = 'row';
        area_user.style.paddingBottom = '20px';


        const post_imagem = document.createElement('img');
        post_imagem.src = avatar;
        post_imagem.style.width = '60px';
        post_imagem.style.height = '60px';
        post_imagem.style.borderRadius = "50px";


        const post_user = document.createElement("h3");
        post_user.appendChild(document.createTextNode(nome));
        post_user.style.paddingLeft = "20px";
        post_user.style.paddingTop = "20px";

        const post_text = document.createElement("p");
        post_text.appendChild(document.createTextNode(post));
        post_text.style.paddingBottom = '25px';
        post_text.style.textAlign = 'justify'
        post_text.style.paddingLeft = "20px";
        post_text.style.paddingRight = "30px"


        const button_like = document.createElement("button")
        button_like.appendChild(document.createTextNode(`Likes ${data.likes}`))
        button_like.style.cursor = 'pointer';
        button_like.style.fontSize = '14px';
        button_like.style.fontFamily = 'Arial';
        button_like.style.width = '80px';
        button_like.style.height = '30px';
        button_like.style.alignItems = 'center';
        button_like.style.padding = '5px';
        button_like.style.marginLeft = "20px";
        button_like.style.color = "white";
        button_like.style.backgroundColor = "#027373";
        button_like.style.border = "1px solid black";
        button_like.style.borderRadius = "10px";
        button_like.addEventListener ('click', function() {
            data.likes = data.likes + 1
            const postagem = {
                'nome': nome,
                'avatar': avatar,
                'post': post,
                'likes': data.likes,
            }
            const infos = JSON.stringify(postagem);
            localStorage.setItem(`${ultimos_posts[indexes.length]}`, infos);
            button_like.innerText = `Likes ${data.likes}`; 
        })

        area_user.appendChild(post_imagem)
        area_user.appendChild(post_user);
        newDiv.appendChild(area_user)
        newDiv.appendChild(post_text);
        newDiv.appendChild(button_like)

        mainArticle.insertAdjacentElement('afterbegin', newDiv);

        alert('POST SALVO COM SUCESSO');
    }

    //Função que cria os posts já armazenados na DOM
    function resgataElemento() { 
        //resgatando post e elementos
        const minhasKeys = Object.keys(localStorage).sort();
        const ultimos_posts = [];
        const inverterKeys = (lista) => { 
            for (let i = lista.length - 1; i >= 0; i--)
                ultimos_posts.push(lista[i]);
        }
        inverterKeys(minhasKeys) //inverte a ordem das keys para os posts mais recentes aparecerem primeiro
        const mainArticle = document.getElementById("postagens");

        //iterando cada post
        for (let i = 0; i < ultimos_posts.length; i++ ) {
            //separando elementos
            const data = JSON.parse(localStorage.getItem(`${ultimos_posts[i]}`));
            const nome = data.nome;
            const avatar = data.avatar;
            const post = data.post;
            const likes = data.likes;

            //criando na DOM
            const newDiv = document.createElement("div");
            newDiv.id = ultimos_posts[i];
            newDiv.style.marginBottom = '30px';
            newDiv.style.marginLeft = '25px';
            newDiv.style.marginRight = '25px';
            newDiv.style.paddingTop = '20px';
            newDiv.style.paddingBottom = '20px';
            newDiv.style.paddingLeft = '20px';
            newDiv.style.backgroundColor = '#A9D9D0';
            newDiv.style.border = '1px solid #027373';
            newDiv.style.borderRadius = "10px";

            const area_user = document.createElement('section');
            area_user.id = 'area_user';
            area_user.style.display = 'flex';
            area_user.style.flexDirection = 'row';
            area_user.style.paddingBottom = '20px';


            const post_imagem = document.createElement('img');
            post_imagem.src = avatar;
            post_imagem.style.width = '60px';
            post_imagem.style.height = '60px';
            post_imagem.style.borderRadius = "50px";


            const post_user = document.createElement("h3");
            post_user.appendChild(document.createTextNode(nome));
            post_user.style.paddingLeft = "20px";
            post_user.style.paddingTop = "20px";

            const post_text = document.createElement("p");
            post_text.appendChild(document.createTextNode(post));
            post_text.style.paddingBottom = '25px';
            post_text.style.textAlign = 'justify';
            post_text.style.paddingLeft = "20px";
            post_text.style.paddingRight = "30px"


            const button_like = document.createElement("button")
            button_like.appendChild(document.createTextNode(`Likes ${data.likes}`))
            button_like.style.cursor = 'pointer';
            button_like.style.fontSize = '14px';
            button_like.style.fontFamily = 'Arial';
            button_like.style.width = '80px';
            button_like.style.height = '30px';
            button_like.style.alignItems = 'center';
            button_like.style.padding = '5px';
            button_like.style.marginLeft = "20px";
            button_like.style.color = "white";
            button_like.style.backgroundColor = "#027373";
            button_like.style.border = "1px solid black";
            button_like.style.borderRadius = "10px";
            button_like.addEventListener ('click', function() {
                data.likes = data.likes + 1
                const postagem = {
                    'nome': nome,
                    'avatar': avatar,
                    'post': post,
                    'likes': data.likes,
                }
                const infos = JSON.stringify(postagem);
                localStorage.setItem(`${ultimos_posts[i]}`, infos);
                button_like.innerText = `Likes ${data.likes}`; 
            })

            area_user.appendChild(post_imagem)
            area_user.appendChild(post_user);
            newDiv.appendChild(area_user)
            newDiv.appendChild(post_text);
            newDiv.appendChild(button_like)

            mainArticle.appendChild(newDiv);
        }
    }


} ) ();