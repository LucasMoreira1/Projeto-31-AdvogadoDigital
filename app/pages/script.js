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
// Formatacao dos campos
//

document.addEventListener('DOMContentLoaded', (event) => {
    const cpfInput = document.getElementById('cpf');
    const updateCpfInput = document.getElementById('update-cpf');
    const rgInput = document.getElementById('rg');
    const updateRgInput = docuemnt.getElementById('update-rg');
    const telefoneInput = document.getElementById('telefone');
    const updateTelefoneInput = document.getElementById('update-telefone')

    cpfInput.addEventListener('input', formatCPF);
    updateCpfInput.addEventListener('input', formatCPF);
    rgInput.addEventListener('input', formatRG);
    updateRgInput.addEventListener('input', formatRG);
    telefoneInput.addEventListener('input', formatTelefone);
    updateTelefoneInput.addEventListener('input', formatTelefone);
});

function formatCPF(event) {
    const input = event.target;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    input.value = value
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function formatRG(event) {
    const input = event.target;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 9) value = value.slice(0, 9);
    input.value = value
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1})$/, '$1-$2');
}

function formatTelefone(event) {
    const input = event.target;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    input.value = value
        .replace(/(\d{2})(\d)/, '($1)$2')
        .replace(/(\d{5})(\d)/, '$1-$2');
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
    fetch('http://mysql-agility.advogadodigital.click:3333/login', {
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
  const response = await fetch('http://mysql-agility.advogadodigital.click:3333/login/validacao', {
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
    const response = await fetch(`http://mysql-agility.advogadodigital.click:3333/clientes/${CPF}`);
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
    const profissao = document.getElementById('profissao').value;
    const rg = document.getElementById('rg').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const endereco_completo_com_cep = document.getElementById('endereco_completo_com_cep').value;

    // Criar objeto JSON com os dados do formulário
    const data = {
        tenant: tenant,
        nome: nome,
        cpf: cpf,
        estadocivil: estadocivil,
        profissao: profissao,
        rg: rg,
        telefone: telefone,
        email: email,
        endereco_completo_com_cep: endereco_completo_com_cep
    };

    console.log(data);

    // Enviar dados para o backend usando fetch
    fetch('http://mysql-agility.advogadodigital.click:3333/clientes', {
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
        const resposta = await fetch(`http://mysql-agility.advogadodigital.click:3333/clientes/${tenant}`);
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
            const tdAcao = document.createElement('td');
            const containerBotoes = document.createElement('div');
            const linkEditar = document.createElement('button');

            containerBotoes.classList.add('flex')

            // Adicionar os atributos data-modal-target e data-modal-toggle
            linkEditar.setAttribute('data-modal-target', 'update-modal');
            linkEditar.setAttribute('data-modal-toggle', 'update-modal');
            linkEditar.setAttribute('onclick', 'preencherFormularioAtualizacao(parentNode.parentNode.parentNode)');
            linkEditar.type = 'button';

            // Adicionar classes ao botão
            linkEditar.classList.add(
            'ml-3',
            'block',
            'text-black',
            'bg-gray-600',
            'hover:bg-gray-800',
            'focus:ring-4',
            'focus:outline-none',
            'focus:ring-gray-900',
            'font-medium',
            'rounded-lg',
            'text-sm',
            'px-5',
            'py-2.5',
            'text-center',
            'dark:bg-gray-400',
            'dark:hover:bg-gray-500',
            'dark:focus:ring-gray-600'
            );

            // Criar o elemento SVG
            const svgEditar = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svgEditar.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            svgEditar.setAttribute('fill', 'none');
            svgEditar.setAttribute('viewBox', '0 0 24 24');
            svgEditar.setAttribute('stroke-width', '1.5');
            svgEditar.setAttribute('stroke', 'currentColor');
            svgEditar.classList.add('w-6', 'h-6');

            // Criar o caminho do ícone
            const pathEditar = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            pathEditar.setAttribute('stroke-linecap', 'round');
            pathEditar.setAttribute('stroke-linejoin', 'round');
            pathEditar.setAttribute('d', 'm16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10');

            // Adicionar o caminho ao SVG
            svgEditar.appendChild(pathEditar);

            // Adicionar o SVG ao botão
            linkEditar.appendChild(svgEditar);

            // // Adicionar o botão ao TD
            // tdEditar.appendChild(linkEditar);

            // // Adicionar o TD à TR
            // tr.appendChild(tdEditar);


            // Adicionar ação (Remover)
            // const tdRemover = document.createElement('td');
            const linkRemover = document.createElement('button');

            // Adicionar os atributos data-modal-target e data-modal-toggle
            // linkRemover.setAttribute('data-modal-target', 'update-modal');
            // linkRemover.setAttribute('data-modal-toggle', 'update-modal');
            linkRemover.setAttribute('onclick', 'removerCliente(parentNode.parentNode)');
            linkRemover.type = 'button';

            // Adicionar classes ao botão
            linkRemover.classList.add(
            'ml-3', 
            'block',
            'text-white',
            'bg-red-700',
            'hover:bg-red-800',
            'focus:ring-4',
            'focus:outline-none',
            'focus:ring-red-300',
            'font-medium',
            'rounded-lg',
            'text-sm',
            'px-5',
            'py-2.5',
            'text-center',
            'dark:bg-red-900',
            'dark:hover:bg-red-700',
            'dark:focus:ring-red-800'
            );

            // Criar o elemento SVG
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            svg.setAttribute('fill', 'none');
            svg.setAttribute('viewBox', '0 0 24 24');
            svg.setAttribute('stroke-width', '1.5');
            svg.setAttribute('stroke', 'currentColor');
            svg.classList.add('w-6', 'h-6');

            // Criar o caminho do ícone
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('stroke-linecap', 'round');
            path.setAttribute('stroke-linejoin', 'round');
            path.setAttribute('d', 'M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766');

            // Adicionar o caminho ao SVG
            svg.appendChild(path);

            // Adicionar o SVG ao botão
            linkRemover.appendChild(svg);

            // // Adicionar o botão ao TD
            // tdRemover.appendChild(linkRemover);

            // // Adicionar o TD à TR
            // tr.appendChild(tdRemover);
            containerBotoes.appendChild(linkEditar);
            containerBotoes.appendChild(linkRemover);

            tdAcao.appendChild(containerBotoes);
            tr.appendChild(tdAcao);

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
    const nome = tr.children[1].innerText; 
    const cpf = tr.children[2].innerText; 
    const estadocivil = tr.children[3].innerText; 
    const profissao = tr.children[4].innerText; 
    const rg = tr.children[5].innerText; 
    const telefone = tr.children[6].innerText; 
    const email = tr.children[7].innerText; 
    const endereco_completo_com_cep = tr.children[8].innerText;

    document.getElementById('update-id-cliente').value = id_cliente;
    document.getElementById('update-nome').value = nome;
    document.getElementById('update-cpf').value = cpf;
    document.getElementById('update-estadocivil').value = estadocivil;
    document.getElementById('update-profissao').value = profissao;
    document.getElementById('update-rg').value = rg;
    document.getElementById('update-telefone').value = telefone;
    document.getElementById('update-email').value = email;
    document.getElementById('update-endereco_completo_com_cep').value = endereco_completo_com_cep;

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
    const profissao = document.getElementById('update-profissao').value;
    const rg = document.getElementById('update-rg').value;
    const telefone = document.getElementById('update-telefone').value;
    const email = document.getElementById('update-email').value;
    const endereco_completo_com_cep = document.getElementById('update-endereco_completo_com_cep').value;
    
    // Criar objeto JSON com os dados do formulário
    const data = {
        tenant: tenant,
        nome: nome,
        cpf: cpf,
        estadocivil: estadocivil,
        profissao: profissao,
        rg: rg,
        telefone: telefone,
        email: email,
        endereco_completo_com_cep: endereco_completo_com_cep
    };

    console.log(data);

    // Enviar dados para o backend usando fetch
    fetch(`http://mysql-agility.advogadodigital.click:3333/clientes/${id_cliente}`, {
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
    const id_cliente = tr.children[0].innerText;

    console.log(id_cliente)
    
    // Criar objeto JSON com os dados do formulário
    const data = {
        tenant: tenant
    };

    console.log(data);

    // Enviar dados para o backend usando fetch
    fetch(`http://mysql-agility.advogadodigital.click:3333/clientes/${id_cliente}`, {
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
        renderizarTabela()
    })
    .catch((error) => {
        console.log('Error:', error);
        alert('Erro ao deletar, contate o suporte.');
        // Lógica de tratamento de erro, se necessário
    });
}

// FIM CLIENTES

// PROCESSOS

// DOCUMENTOS

async function gerarDocumento() {
    event.preventDefault();

    const clienteNome = document.getElementById('nome-cliente').value;
    const clienteCPF = document.getElementById('cpf-cliente').value;

    console.log(clienteNome, clienteCPF)
  
    const response = await fetch('http://mysql-agility.advogadodigital.click:3333/gerar-docx', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clienteNome, clienteCPF }),
    });
  
    if (response.ok) {
      const blob = await response.blob();
  
      // Crie um objeto de URL do Blob
      const url = window.URL.createObjectURL(blob);
  
      // Crie um link temporário
      const a = document.createElement('a');
      a.href = url;
  
      // Defina o nome do arquivo para download
      a.download = `${clienteNome}_Declaracao_Hipossuficiencia.docx`;
  
      // Anexe o link ao corpo do documento
      document.body.appendChild(a);
  
      // Clique automaticamente no link
      a.click();
  
      // Remova o link do corpo do documento
      document.body.removeChild(a);
  
      // Revogue a URL do objeto Blob para liberar recursos
      window.URL.revokeObjectURL(url);
    } else {
      console.error('Erro ao gerar o documento:', response.statusText);
    }
}

// CLIENTES

async function renderizarTabelaClientesDocumentos() {
    event.preventDefault();
    const tbody = document.querySelector('tbody');

    try {
        // Buscar clientes no backend
        const clientes = await buscarClientesDocumentos();
        // Limpar o conteúdo atual da tabela
        tbody.innerHTML = '';

        // Renderizar os novos dados na tabela
        clientes.forEach((cliente) => {
            const tr = document.createElement('tr');
            tr.classList.add('bg-white', 'border-b', 'dark:bg-gray-800', 'dark:border-gray-700', 'hover:bg-gray-50', 'dark:hover:bg-gray-600');

            // Adicionar as células da linha
            Object.values(cliente).forEach((value) => {
                const td = document.createElement('td');
                td.classList.add('px-6', 'py-3');
            
                // Verificar se o valor é uma string antes de aplicar a formatação
                const textoFormatado = typeof value === 'string' ? value.replace(/\b\w+/g, substr => substr.charAt(0).toUpperCase() + substr.slice(1).toLowerCase()).replace(/\b\w+(?=\))/g, substr => substr.toLowerCase()) : value;
                td.textContent = textoFormatado;
                td.setAttribute('onclick', 'preencherNomeClienteDocumentos(parentNode)');
                tr.appendChild(td);

            });
        
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao renderizar tabela:', error);
    }
    initFlowbite();
}

async function buscarClientesDocumentos() { 
    try {
        const tenant = userInfo.id_tenant;
        const resposta = await fetch(`http://mysql-agility.advogadodigital.click:3333/clientes/${tenant}`);
        const clientes = await resposta.json();
        return clientes;
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        throw error;
    }
}

function preencherNomeClienteDocumentos(tr) {
    // Preencher os campos do formulário no modal com os dados do cliente
    
    const nome = tr.children[1].innerText; 
    const cpf = tr.children[2].innerText;
    document.getElementById('nome-cliente').value = nome;
    document.getElementById('cpf-cliente').value = cpf
    
    const closeModalCliente = document.getElementById('closeModalCliente');
    closeModalCliente.click();
}

// REU

async function renderizarTabelaReuDocumentos() {
    const tbody = document.getElementById('tbody-reu');

    try {
        // Buscar reu no backend
        const clientes = await buscarReuDocumentos();
        // Limpar o conteúdo atual da tabela
        tbody.innerHTML = '';

        // Renderizar os novos dados na tabela
        clientes.forEach((cliente) => {
            const tr = document.createElement('tr');
            tr.classList.add('bg-white', 'border-b', 'dark:bg-gray-800', 'dark:border-gray-700', 'hover:bg-gray-50', 'dark:hover:bg-gray-600');

            // Adicionar as células da linha
            Object.values(cliente).forEach((value) => {
                const td = document.createElement('td');
                td.classList.add('px-6', 'py-3');
            
                // Verificar se o valor é uma string antes de aplicar a formatação
                const textoFormatado = typeof value === 'string' ? value.replace(/\b\w+/g, substr => substr.charAt(0).toUpperCase() + substr.slice(1).toLowerCase()).replace(/\b\w+(?=\))/g, substr => substr.toLowerCase()) : value;
                td.textContent = textoFormatado;
                td.setAttribute('onclick', 'preencherNomeReuDocumentos(parentNode)');
                tr.appendChild(td);

            });
        
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao renderizar tabela:', error);
    }
    initFlowbite();
}

async function buscarReuDocumentos() { 
    try {
        const tenant = userInfo.id_tenant;
        const resposta = await fetch(`http://mysql-agility.advogadodigital.click:3333/clientes/${tenant}`);
        const clientes = await resposta.json();
        return clientes;
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        throw error;
    }
}

function preencherNomeReuDocumentos(tr) {
    // Preencher os campos do formulário no modal com os dados do cliente
    
    const nome = tr.children[1].innerText; // Índice 2 para a coluna de nome
    
    document.getElementById('nome-reu').value = nome;
    const closeModalReu = document.getElementById('closeModalReu');
    closeModalReu.click();
}