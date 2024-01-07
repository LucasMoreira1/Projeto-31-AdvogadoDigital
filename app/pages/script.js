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
    var ConfirmPassword = document.getElementById("confirmaSenha");
    var ConfirmPasswordIcon = document.getElementById("ConfirmPasswordIconHide")

    if (password.type === "password") {
        password.type = "text";
        passwordIcon.classList.add('hidden');
        ConfirmPassword.type = "text";
        ConfirmPasswordIcon.classList.add('hidden');
        } else {
            password.type = "password";
            passwordIcon.classList.remove('hidden');
            ConfirmPassword.type = "password";
            ConfirmPasswordIcon.classList.remove('hidden');
            }
            return false;
}

//
// Login
//

async function cadastroLogin() {
    // Evitar o comportamento padrão do formulário
    event.preventDefault();

    const tenantInfoString = localStorage.getItem("tenantInfo");

    const tenantInfo = JSON.parse(tenantInfoString);
    // Obter valores dos campos do formulário
    const id_tenant = tenantInfo.id.id_tenant
    // const escritorio = document.getElementById('escritorio').value;
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    // Verificar se o e-mail já existe
    // const emailExistente = await verificarEmailLogin(email);

    // if (emailExistente) {
    //     alert('Já existe um cadastro para este e-mail. Por favor, use um e-mail diferente ou entre em contato (12)99732-9778');
    //     return;
    // }

    // Criar objeto JSON com os dados do formulário
    const data = {
        id_tenant,
        nome,
        email,
        senha
    };

    console.log(data);

    // Enviar dados para o backend usando fetch
    fetch('https://advogadodigital.onrender.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    // .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Cadastro realizado com sucesso.');
        window.location.href = 'login.html'
        // Lógica adicional após o sucesso, se necessário
    })
    .catch((error) => {
        console.log('Error:', error);
        alert('Erro no cadastro, contate o suporte. (12)99732-9778');
        // Lógica de tratamento de erro, se necessário
    });
}

// Adicionar um ouvinte de evento para a submissão do formulário
async function realizarLogin(event) {
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

// FIM LOGIN

// CLIENTES

// CREATE
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
    const tenant = userInfo.id_tenant;
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const estadocivil = document.getElementById('estadocivil').value;

    // Criar objeto JSON com os dados do formulário
    const data = {
        tenant: tenant,
        nome: nome,
        cpf: cpf,
        estadocivil: estadocivil
    };

    console.log(data);

    // Enviar dados para o backend usando fetch
    fetch('https://advogadodigital.onrender.com/clientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    console.log(response)
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

// READ 

// Função para buscar clientes no backend
async function buscarClientes() { 
    try {
        const tenant = userInfo.id_tenant;
        const resposta = await fetch(`https://advogadodigital.onrender.com/clientes/${tenant}`);
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

            //// Adicionar checkbox
            // const tdCheckbox = document.createElement('td');
            // const checkbox = document.createElement('input');
            // checkbox.type = 'checkbox';
            // checkbox.classList.add('ml-3.5', 'w-4', 'h-4', 'text-blue-600', 'bg-gray-100', 'border-gray-300', 'rounded', 'focus:ring-blue-500', 'dark:focus:ring-blue-600', 'dark:ring-offset-gray-800', 'dark:focus:ring-offset-gray-800', 'focus:ring-2', 'dark:bg-gray-700', 'dark:border-gray-600');
            // tdCheckbox.appendChild(checkbox);
            // tr.appendChild(tdCheckbox);

            // Adicionar as células da linha
            Object.values(cliente).forEach((value) => {
                const td = document.createElement('td');
                td.classList.add('px-6', 'py-3');
            
                // Verificar se o valor é uma string antes de aplicar a formatação
                const textoFormatado = typeof value === 'string' ? value.replace(/\b\w+/g, substr => substr.charAt(0).toUpperCase() + substr.slice(1).toLowerCase()).replace(/\b\w+(?=\))/g, substr => substr.toLowerCase()) : value;
            
                td.textContent = textoFormatado;
                tr.appendChild(td);
            });

            // Adicionar ação (Editar)
            const tdEditar = document.createElement('td');
            const linkEditar = document.createElement('button');
            // Adicionar os atributos data-modal-target e data-modal-toggle
            linkEditar.setAttribute('data-modal-target', 'update-modal');
            linkEditar.setAttribute('data-modal-toggle', 'update-modal');
            linkEditar.setAttribute('onclick', 'preencherFormularioAtualizacao(parentNode.parentNode)');
            linkEditar.type = 'button'
            // linkEditar.href = '#';
            linkEditar.classList.add('ml-4', 'font-medium', 'text-blue-600', 'dark:text-blue-500', 'hover:underline');
            linkEditar.textContent = 'Editar';

            tdEditar.appendChild(linkEditar);
            tr.appendChild(tdEditar);

            // Adicionar ação (Remover)
            const tdRemover = document.createElement('td');
            const linkRemover = document.createElement('button');
            // Adicionar os atributos data-modal-target e data-modal-toggle
            linkRemover.setAttribute('data-modal-target', 'update-modal');
            linkRemover.setAttribute('data-modal-toggle', 'update-modal');
            linkRemover.setAttribute('onclick', 'removerCliente(parentNode.parentNode)');
            linkRemover.type = 'button'
            // linkEditar.href = '#';
            linkRemover.classList.add('ml-4', 'font-medium', 'text-blue-600', 'dark:text-blue-500', 'hover:underline');
            linkRemover.textContent = 'Remover';

            tdRemover.appendChild(linkRemover);
            tr.appendChild(tdRemover);

            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao renderizar tabela:', error);
    }
    initFlowbite();
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

// UPDATE
function preencherFormularioAtualizacao(tr) {
    // Preencher os campos do formulário no modal com os dados do cliente
    
    const id_cliente = tr.children[0].innerText;
    const nome = tr.children[1].innerText; // Índice 2 para a coluna de nome
    const cpf = tr.children[2].innerText; // Índice 3 para a coluna de CPF
    const estadocivil = tr.children[3].innerText; // Índice 4 para a coluna de Estado Civil
    
    document.getElementById('update-id-cliente').value = id_cliente;
    document.getElementById('update-nome').value = nome;
    document.getElementById('update-cpf').value = cpf;
    document.getElementById('update-estadocivil').value = estadocivil;

    // Abrir o modal de atualização
    const updateModal = document.getElementById('update-modal');
    updateModal.classList.remove('hidden');
}

async function updateCadastroCliente() {
    // Evitar o comportamento padrão do formulário
    event.preventDefault();

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
    // Obter valores dos campos do formulário
    const tenant = userInfo.id_tenant;
    const id_cliente = document.getElementById('update-id-cliente').value;
    const nome = document.getElementById('update-nome').value;
    const cpf = document.getElementById('update-cpf').value;
    const estadocivil = document.getElementById('update-estadocivil').value;

    // Criar objeto JSON com os dados do formulário
    const data = {
        tenant: tenant,
        nome: nome,
        cpf: cpf,
        estadocivil: estadocivil
    };

    console.log(data);

    // Enviar dados para o backend usando fetch
    fetch(`https://advogadodigital.onrender.com/clientes/${id_cliente}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    // .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Dados do cliente atualizados com sucesso.');
        // Lógica adicional após o sucesso, se necessário
    })
    .catch((error) => {
        console.log('Error:', error);
        alert('Erro no atualizar, contate o suporte.');
        // Lógica de tratamento de erro, se necessário
    });
}

// DELETE

async function removerCliente(tr) {
    // Evitar o comportamento padrão do formulário
    event.preventDefault();

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
    // Obter valores dos campos do formulário
    const tenant = userInfo.id_tenant;
    const id_cliente = tr.children[1].innerText;

    // Criar objeto JSON com os dados do formulário
    const data = {
        tenant: tenant
    };

    console.log(data);

    // Enviar dados para o backend usando fetch
    fetch(`https://advogadodigital.onrender.com/clientes/${id_cliente}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    // .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Dados do cliente deletados com sucesso.');
        // Lógica adicional após o sucesso, se necessário
    })
    .catch((error) => {
        console.log('Error:', error);
        alert('Erro ao deletar, contate o suporte.');
        // Lógica de tratamento de erro, se necessário
    });
}