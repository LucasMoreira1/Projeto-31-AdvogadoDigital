document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('formularioLead');

    formulario.addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Obtenha os valores do formulário
        const nome = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        // Crie um objeto com os dados a serem enviados
        const data = {
            nome: nome,
            email: email
        };

        // Envie a requisição POST para o backend
        fetch('https://node-do-zero-cw7v.onrender.com/cliente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                // A requisição foi bem-sucedida
                // Você pode fazer algo aqui, como redirecionar o usuário ou exibir uma mensagem de sucesso
                console.log('Requisição POST bem-sucedida');
            } else {
                // A requisição falhou, trate o erro aqui
                console.error('Erro na requisição POST');
            }
        })
        .catch(error => {
            console.error('Erro na requisição POST:', error);
        });
    });
});