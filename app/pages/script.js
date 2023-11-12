//
// DarkMode
//
const darkMode = document.getElementById('initial')
const logoDark = document.getElementById('logo-dark')


if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  darkMode.classList.add('dark')
  logoDark.classList.remove('hidden')
  // document.documentElement.classList.add('dark')
}

function darkModeToggle(){
    const darkMode = document.getElementById('initial')
    const logoLight = document.getElementById('logo-light')
    const logoDark = document.getElementById('logo-dark')
    const iconSun = document.getElementById('icon-sun')
    const iconMoon = document.getElementById('icon-moon')


    if (darkMode.classList.contains('dark')){
        darkMode.classList.remove('dark')
        logoDark.classList.add('hidden')
        logoLight.classList.remove('hidden')
        logoLight.classList.remove('dark:hidden')
        iconSun.classList.add('hidden')
        iconMoon.classList.remove('hidden')

    } else {
        darkMode.classList.add('dark')
        logoDark.classList.remove('hidden')
        logoLight.classList.add('hidden')
        logoLight.classList.remove('dark:hidden')
        iconSun.classList.remove('hidden')
        iconMoon.classList.add('hidden')
    }
}

//
// ShowPassword Icon
//

function showPassword(){
    var password = document.getElementById("password");
    var passwordIcon = document.getElementById("PasswordIconHide")

    if (password.type === "password") {
        password.type = "text";
        passwordIcon.classList.add('hidden');
        } else {
            password.type = "password";
            passwordIcon.classList.remove('hidden');
            }
            return false;

}

//
// Login
//

// Selecionar o formulário
const loginForm = document.querySelector('form');

// Adicionar um ouvinte de evento para a submissão do formulário
async function realizarLogin(event) {
  console.log('Início da função realizarLogin');

  event.preventDefault(); // Impedir o envio padrão do formulário

  const email = document.getElementById('email').value;
  const senha = document.getElementById('password').value;

  console.log('Email:', email);
  console.log('Password:', senha);

  // Enviar uma solicitação para verificar as credenciais
  const response = await fetch('https://advogadodigital.onrender.com/login/validacao', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
  });

  try {
      const data = await response.json();

      // Verificar a resposta do backend
    if (response.ok) {
        // Credenciais válidas, armazenar informações do usuário no Local Storage
        const userInfo = data.userInfo;
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    
        // Redirecionar para a página de home.html
        window.location.href = 'home.html';
        console.log("ok");
    } else {
        // Credenciais inválidas, exibir o modal ou mensagem de erro
        const modal = document.getElementById('botao-senha-invalida');
        console.log("not-ok", data.message);
        modal.click();
    }
  } catch (error) {
      console.error('Erro ao processar a resposta JSON:', error);
      // Tratar o erro, exibir uma mensagem ou fazer algo apropriado
  }

  console.log('Fim da função realizarLogin');
}


document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.querySelector('form');

  loginForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Impedir o envio padrão do formulário
      realizarLogin(event);
  });
});

