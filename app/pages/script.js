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
loginForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Impedir o envio padrão do formulário

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  // Verificar as credenciais do usuário (substitua isso com sua própria lógica)
  if (email === 'admin@admin.com' && password === 'admin1') {
    // Credenciais válidas, redirecionar para a página de home.html
    window.location.href = 'home.html';
  } else {
    // Credenciais inválidas, exibir o modal
    const modal = document.getElementById('botao-senha-invalida');
    modal.click();
  }
});
