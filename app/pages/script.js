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

async function verificarCPFExistente(CPF) {
    const response = await fetch(`https://advogadodigital.onrender.com/clientes/${CPF}`);
    const data = await response.json();
    return data.existe;
}

async function enviarCadastroCliente() {
    // Evitar o comportamento padrão do formulário
    event.preventDefault();

    
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
    // Obter valores dos campos do formulário
    const tenant = userInfo.tenant;
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const estadocivil = document.getElementById('estadocivil').value;

    // Verificar se o e-mail já existe
    // const cpfExistente = await verificarCPFExistente(CPF);

    // if (cpfExistente) {
    //     alert('Já existe um cliente para este CPF. Por favor, verifique.');
    //     return;
    // }

    // Criar objeto JSON com os dados do formulário
    const data = {
        tenant: tenant,
        nome: nome,
        cpf: cpf,
        estadocivil: estadocivil
    };

    // Enviar dados para o backend usando fetch
    fetch('https://advogadodigital.onrender.com/clientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Cliente registrado com sucesso.');
        // Lógica adicional após o sucesso, se necessário
    })
    .catch((error) => {
        console.log('Error:', error);
        alert('Erro no registrar, contate o suporte.');
        // Lógica de tratamento de erro, se necessário
    });
}

// Função para buscar clientes no backend
async function buscarClientes() { 
    try {
        const resposta = await fetch('https://advogadodigital.onrender.com/clientes');
        const clientes = await resposta.json();
        return clientes;
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        throw error;
    }
}

// Função para renderizar os dados na tabela
async function renderizarTabela() {
    const tbody = document.querySelector('tbody');

    try {
        // Buscar clientes no backend
        const clientes = await buscarClientes();
        // Limpar o conteúdo atual da tabela
        tbody.innerHTML = '';

        // Renderizar os novos dados na tabela
        clientes.forEach((cliente) => {
            const tr = document.createElement('tr');
            tr.classList.add('bg-white', 'border-b', 'dark:bg-gray-800', 'dark:border-gray-700', 'hover:bg-gray-50', 'dark:hover:bg-gray-600');

            // Adicionar checkbox
            const tdCheckbox = document.createElement('td');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('ml-3.5', 'w-4', 'h-4', 'text-blue-600', 'bg-gray-100', 'border-gray-300', 'rounded', 'focus:ring-blue-500', 'dark:focus:ring-blue-600', 'dark:ring-offset-gray-800', 'dark:focus:ring-offset-gray-800', 'focus:ring-2', 'dark:bg-gray-700', 'dark:border-gray-600');
            tdCheckbox.appendChild(checkbox);
            tr.appendChild(tdCheckbox);

            // Adicionar as células da linha
            Object.values(cliente).forEach((value) => {
                const td = document.createElement('td');
                td.classList.add('px-6', 'py-3')
                td.textContent = value;
                tr.appendChild(td);
            });

            // Adicionar ação (Editar)
            const tdAcao = document.createElement('td');
            const linkEditar = document.createElement('a');
            linkEditar.href = '#';
            linkEditar.classList.add('ml-4', 'font-medium', 'text-blue-600', 'dark:text-blue-500', 'hover:underline');
            linkEditar.textContent = 'Editar';
            tdAcao.appendChild(linkEditar);
            tr.appendChild(tdAcao);

            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao renderizar tabela:', error);
    }
}

async function pesquisaCliente(){

    // Seletor do input de pesquisa
    const inputPesquisa = document.getElementById('pesquisaCliente');

    // Função para filtrar as linhas da tabela
    function filtrarTabela() {        
        const termoPesquisa = inputPesquisa.value.toLowerCase();
        
        const linhasTabela = document.querySelectorAll('tbody tr');

        linhasTabela.forEach((linha) => {
            const textoLinha = linha.innerText.toLowerCase();

            if (textoLinha.includes(termoPesquisa)) {
                linha.style.display = ''; // Mostrar a linha se houver uma correspondência
            } else {
                linha.style.display = 'none'; // Ocultar a linha se não houver correspondência
            }
        });
    }

    // Adicionar ouvinte de evento para o evento 'input' (disparado enquanto você digita)
    inputPesquisa.addEventListener('input', filtrarTabela);
}


