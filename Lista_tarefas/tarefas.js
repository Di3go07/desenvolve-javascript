const indexs = []

//FUNÇÕES ACIONADAS AO CARREGAR A PÁGINA
window.addEventListener('load', function() {
    carregarTarefas();
    ativarCheckbox();
    tarefasRealizadas ();
    
});

//FUNÇÃO QUE RESGATA TAREFAS ARMAZENADAS
function carregarTarefas() {
    if (localStorage.length != 0) {
        for (let i = 0; i < localStorage.length; i++) {
            const tarefa = localStorage.getItem(`tarefa ${i}`)
            const valores = tarefa.split(',');

            const mainDiv = document.getElementById("tarefas");
            const newDiv = document.createElement("div");
            newDiv.id = i;

            const input = document.createElement("input");
            input.id = 'scales';
            input.type = 'checkbox';
            input.name =  i;

            const label = document.createElement("label");
            label.for = 'scales';
            label.appendChild(document.createTextNode(valores[0]));
            label.style.fontSize = "20px";
            label.style.fontWeight = "300";
            label.style.padding = '10px';
            label.style.paddingLeft = '8px';

            newDiv.appendChild(input);
            newDiv.appendChild(label);
            mainDiv.insertAdjacentElement("afterend", newDiv);

            indexs.push(1)
        }
    } else {
        setTimeout( () => {
            alert('Digite uma tarefa')
        }, 1500);
          
    }
}



//FUNÇÃO PARA CRIAR TAREFA
function criarTarefa () {
    const tarefa = document.getElementById('campoTexto');

    const verificacao = verificaTarefa(tarefa);

    if (verificacao != false) {
        if (tarefa.value != '') {
            const mainDiv = document.getElementById("tarefas");
            const newDiv = document.createElement("div");
            newDiv.id = indexs.length;

            const input = document.createElement("input");
            input.id = 'scales';
            input.type = 'checkbox';
            input.name =  indexs.length;

            const label = document.createElement("label");
            label.for = 'scales';
            label.appendChild(document.createTextNode(tarefa.value));
            label.style.fontSize = "20px";
            label.style.fontWeight = "300";
            label.style.padding = '10px';
            label.style.paddingLeft = '8px';

            newDiv.appendChild(input);
            newDiv.appendChild(label);
            mainDiv.insertAdjacentElement("afterend", newDiv);

            const indexElemento = indexs.length;
            indexs.push(1);
            armazenarTarefa(indexElemento, tarefa.value);
            ativarCheckbox();
        } else {
            alert('Digite uma tarefa para adicionar à lista')
        }
    }
}

//FUNÇÃO PARA VERIFICAR SE TAREFA ESTÁ NO STORAGE
function verificaTarefa(tarefa) {
    for (let i = 0; i < localStorage.length; i++) {
        const linha = localStorage.getItem(`tarefa ${i}`)
        const valores = linha.split(',');

        if (valores[0] == tarefa.value) {
            alert('Tarefa já foi armazenada')
            return false
        } else {
            continue;
        }
    }
}

//FUNÇÃO QUE ARMAZENA A TAREFA
function armazenarTarefa(index, tarefa) {
    localStorage.setItem(`tarefa ${index}`, [tarefa, false]);
}



//FUNÇÃO QUE COLOCA AÇÃO NO CHECKBOX
function ativarCheckbox () {
    const inputs = document.querySelectorAll('#scales');

    for (let i = 0; i < localStorage.length; i++) {
        const checkbox = inputs[i]
        const linha = localStorage.getItem(`tarefa ${localStorage.length - i - 1}`)
        console.log(linha)
        const texto = linha.split(',');
        

        checkbox.addEventListener('click', function() {
            if (checkbox.checked) {
                const tarefa = (`tarefa ${localStorage.length - i -1}`)
                const nome = (texto[0])
                localStorage.setItem(tarefa, [nome, true])

                const div = document.getElementById(localStorage.length - i -1);
                const label = div.getElementsByTagName('label')[0];
                label.style.textDecoration = 'line-through';
                label.style.color = 'red';

            } else {
                const tarefa = (`tarefa ${localStorage.length - i -1}`)
                const nome = (texto[0])
                localStorage.setItem(tarefa, [nome, false])

                const div = document.getElementById(localStorage.length - i -1);
                const label = div.getElementsByTagName('label')[0];
                label.style.color = 'black';
                label.style.textDecoration = 'none';
            }
        });
    }
}

//FUNÇÃO QUE RESGATA CHECKBOXS MARCADAS
function tarefasRealizadas () {
    const inputs = document.querySelectorAll('#scales');

    for (let i = 0; i < localStorage.length; i++) {
        const checkbox = inputs[i]
        const linha = localStorage.getItem(`tarefa ${localStorage.length - i - 1}`)
        console.log(linha)
        const texto = linha.split(',');

        if (texto[1] == 'true') {
            checkbox.checked = true;
            const div = document.getElementById(localStorage.length - i -1);
            const label = div.getElementsByTagName('label')[0];
            label.style.textDecoration = 'line-through';
            label.style.color = 'red';

        }
    }
}

