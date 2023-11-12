//
// DarkMode
//

const darkMode = document.getElementById('initial')
const logoDark = document.getElementById('logo-dark')
const logoDarkFooter = document.getElementById('logo-dark-footer')


if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  darkMode.classList.add('dark')
  logoDark.classList.remove('hidden')
  logoDarkFooter.classList.remove('hidden')
}

function darkModeToggle(){
    const darkMode = document.getElementById('initial')
    const logoLight = document.getElementById('logo-light')
    const logoLightFooter = document.getElementById('logo-light-footer')
    const logoDark = document.getElementById('logo-dark')
    const logoDarkFooter = document.getElementById('logo-dark-footer')
    const iconSun = document.getElementById('icon-sun')
    const iconMoon = document.getElementById('icon-moon')



    if (darkMode.classList.contains('dark')){
        darkMode.classList.remove('dark')
        logoDark.classList.add('hidden')
        logoDarkFooter.classList.add('hidden')
        logoLight.classList.remove('hidden')
        logoLight.classList.remove('dark:hidden')
        logoLightFooter.classList.remove('hidden')
        logoLightFooter.classList.remove('dark:hidden')
        iconSun.classList.add('hidden')
        iconMoon.classList.remove('hidden')
    } else {
        darkMode.classList.add('dark')
        logoDark.classList.remove('hidden')
        logoDarkFooter.classList.remove('hidden')
        logoLight.classList.add('hidden')
        logoLight.classList.remove('dark:hidden')
        logoLightFooter.classList.add('hidden')
        logoLightFooter.classList.remove('dark:hidden')
        iconSun.classList.remove('hidden')
        iconMoon.classList.add('hidden')
    }


}

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


async function verificarEmailExistente(email) {
    const response = await fetch(`https://advogadodigital.onrender.com/login/${email}`);
    const data = await response.json();
    return data.existe;
}

async function enviarFormulario() {
    // Evitar o comportamento padrão do formulário
    event.preventDefault();

    // Obter valores dos campos do formulário
    const escritorio = document.getElementById('escritorio').value;
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;
    const confirmSenha = document.getElementById('confirm-password').value;

    // Verificar se as senhas coincidem
    if (senha !== confirmSenha) {
        alert('As senhas não coincidem. Por favor, tente novamente.');
        return;
    }

    // Verificar se o e-mail já existe
    const emailExistente = await verificarEmailExistente(email);

    if (emailExistente) {
        alert('Já existe um cadastro para este e-mail. Por favor, use um e-mail diferente.');
        return;
    }

    // Criar objeto JSON com os dados do formulário
    const data = {
        nome: nome,
        email: email,
        tenant: escritorio,
        senha: senha
    };

    // Enviar dados para o backend usando fetch
    fetch('https://advogadodigital.onrender.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Cadastro realizado com sucesso.');
        // Lógica adicional após o sucesso, se necessário
    })
    .catch((error) => {
        console.log('Error:', error);
        alert('Erro no cadastro, contate o suporte.');
        // Lógica de tratamento de erro, se necessário
    });
}