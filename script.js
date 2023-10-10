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
        fetch('https://advogadodigital.onrender.com/cliente', {
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

const modalEl = document.getElementById('info-popup');
const privacyModal = new Modal(modalEl, {
    placement: 'center'
});

privacyModal.show();

const closeModalEl = document.getElementById('close-modal');
closeModalEl.addEventListener('click', function() {
    privacyModal.hide();
});

const acceptPrivacyEl = document.getElementById('confirm-button');
acceptPrivacyEl.addEventListener('click', function() {
    alert('privacy accepted');
    privacyModal.hide();
});