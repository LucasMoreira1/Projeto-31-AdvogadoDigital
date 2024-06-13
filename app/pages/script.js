//
// Constantes / Variáveis Globais
//
let sortDirection = 1;
const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
let currentDate = new Date();

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

function mapearCampos(){
    const cpfInput = document.getElementById('cpf');
    const updateCpfInput = document.getElementById('update-cpf');
    const rgInput = document.getElementById('rg');
    const orgemissorInput = document.getElementById('orgemissor');
    const updateRgInput = document.getElementById('update-rg');
    const updateOrgemissorInput = document.getElementById('update-orgemissor');
    const telefoneInput = document.getElementById('telefone');
    const updateTelefoneInput = document.getElementById('update-telefone')

    cpfInput.addEventListener('input', formatCPF);
    updateCpfInput.addEventListener('input', formatCPF);
    rgInput.addEventListener('input', formatRG);
    updateRgInput.addEventListener('input', formatRG);
    orgemissorInput.addEventListener('input', formatOrgemissor);
    updateOrgemissorInput.addEventListener('input', formatOrgemissor);
    telefoneInput.addEventListener('input', formatTelefone);
    updateTelefoneInput.addEventListener('input', formatTelefone);
}

function formatCPF(event) {
    const input = event.target;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    input.value = value
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function formatOrgemissor(event) {
    const input = event.target;
    let value = input.value.replace(/\W/g, '');
    // Mantém apenas os 9 primeiros dígitos
    if (value.length > 9) value = value.slice(0, 9);
    // Aplica a formatação
    input.value = value
        .replace(/(\d{3})(\d)/, '$1/$2')
}

function formatRG(event) {
    const input = event.target;
    let value = input.value.replace(/\W/g, '');
    // Mantém apenas os 9 primeiros dígitos
    if (value.length > 9) value = value.slice(0, 9);
    // Aplica a formatação
    input.value = value
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(.)$/, '$1-$2');
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
// Função Busca CEP
//

async function buscarCEP() {
    const cep = document.getElementById('cep').value;

    if (cep.length !== 8 || isNaN(cep)) {
        alert('CEP inválido. Por favor, insira um CEP válido.');
        return;
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.ok) {
            throw new Error('Erro ao buscar o CEP.');
        }
        const data = await response.json();

        if (data.erro) {
            alert('CEP não encontrado.');
            return;
        }

        document.getElementById('rua').value = data.logradouro;
        document.getElementById('bairro').value = data.bairro;
        document.getElementById('cidade').value = data.localidade;
        document.getElementById('estado').value = data.uf;
    } catch (error) {
        alert('Erro ao buscar o CEP. Por favor, tente novamente.');
        console.error(error);
    }
}

async function buscarCEPupdate() {
    const cep = document.getElementById('update-cep').value;

    if (cep.length !== 8 || isNaN(cep)) {
        alert('CEP inválido. Por favor, insira um CEP válido.');
        return;
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.ok) {
            throw new Error('Erro ao buscar o CEP.');
        }
        const data = await response.json();

        if (data.erro) {
            alert('CEP não encontrado.');
            return;
        }

        document.getElementById('update-rua').value = data.logradouro;
        document.getElementById('update-bairro').value = data.bairro;
        document.getElementById('update-cidade').value = data.localidade;
        document.getElementById('update-estado').value = data.uf;
    } catch (error) {
        alert('Erro ao buscar o CEP. Por favor, tente novamente.');
        console.error(error);
    }
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

    try {
        const response = await fetch('http://mysql-agility.advogadodigital.click:3333/login/validacao', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        });

        const data = await response.json();

        // Verificar a resposta do backend
        if (response.ok) {
            // Credenciais válidas, armazenar informações do usuário e do Tenant no Local Storage
            const { userInfo, tenantInfo } = data;
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            localStorage.setItem('tenantInfo', JSON.stringify(tenantInfo));
        
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

async function limparCamposCreate(){
    document.getElementById('nome').value = '';
    document.getElementById('cpf').value = '';
    document.getElementById('estadocivil').value = '';
    document.getElementById('profissao').value = '';
    document.getElementById('rg').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('criar-email').value = '';
    document.getElementById('cep').value = '';
    document.getElementById('rua').value = '';
    document.getElementById('numero').value = '';
    document.getElementById('complemento').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

async function limparCamposUpdate(){
    document.getElementById('update-nome').value = '';
    document.getElementById('update-cpf').value = '';
    document.getElementById('update-estadocivil').value = '';
    document.getElementById('update-profissao').value = '';
    document.getElementById('update-rg').value = '';
    document.getElementById('update-telefone').value = '';
    document.getElementById('update-email').value = '';
    document.getElementById('update-cep').value = '';
    document.getElementById('update-rua').value = '';
    document.getElementById('update-numero').value = '';
    document.getElementById('update-complemento').value = '';
    document.getElementById('update-bairro').value = '';
    document.getElementById('update-cidade').value = '';
    document.getElementById('update-estado').value = '';
}

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
    const orgemissor = document.getElementById('orgemissor').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('criar-email').value;
    const cep = document.getElementById('cep').value;
    const rua = document.getElementById('rua').value;
    const numero = document.getElementById('numero').value;
    const complemento = document.getElementById('complemento').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;
    
    // Criar objeto JSON com os dados do formulário
    const data = {
        tenant: tenant,
        nome: nome,
        cpf: cpf,
        estadocivil: estadocivil,
        profissao: profissao,
        rg: rg,
        orgemissor: orgemissor,
        telefone: telefone,
        email: email,
        cep: cep,
        rua: rua,
        numero: numero,
        complemento: complemento,
        bairro: bairro,
        cidade: cidade,
        estado: estado
    };

    console.log(data);

    fetch(`http://mysql-agility.advogadodigital.click:3333/clientes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            // Se a resposta não for bem-sucedida, lança um erro com a mensagem apropriada
            return response.json().then(err => {
                throw new Error(err.error || 'Erro desconhecido');
            });
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert('Cliente registrado com sucesso.');
        // Lógica adicional após o sucesso, se necessário
        renderizarTabela()
    })
    .catch((response) => {
        console.log(response);
        alert(response);
        // Lógica de tratamento de erro, se necessário
    });

    limparCamposCreate()
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

            const tdAcao = document.createElement('td');
            const containerBotoes = document.createElement('div');

            const linkEditar = document.createElement('button');
            linkEditar.setAttribute('id', 'linkEditar');
            linkEditar.setAttribute('data-modal-target', 'update-modal');
            linkEditar.setAttribute('data-modal-toggle', 'update-modal');
            linkEditar.setAttribute('onclick', 'preencherFormularioAtualizacao(parentNode.parentNode.parentNode)');
            linkEditar.type = 'button';
            
            // Adicionar as células da linha
            Object.entries(cliente).forEach(([key, value]) => {
                const td = document.createElement('td');
                td.classList.add('px-6', 'py-3');
            
                if (['cep', 'rua',  'numero', 'complemento', 'bairro', 'orgemissor', 'estado'].includes(key)) {
                    td.classList.add('hidden');
                }

                // Verificar se o valor é uma string antes de aplicar a formatação
                // const textoFormatado = typeof value === 'string' ? value.replace(/\b\w+/g, substr => substr.charAt(0).toUpperCase() + substr.slice(1).toLowerCase()).replace(/\b\w+(?=\))/g, substr => substr.toLowerCase()) : value;
            
                td.textContent = value;
                td.addEventListener('dblclick', () => {
                    preencherFormularioAtualizacao(tr);
    
                    // Simular clique no botão linkEditar
                    linkEditar.click();
                });
                tr.appendChild(td); 
            });

            containerBotoes.classList.add('flex')

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
            linkRemover.setAttribute('data-modal-target', 'delete-modal');
            linkRemover.setAttribute('data-modal-toggle', 'delete-modal');
            linkRemover.setAttribute('onclick', 'preencherFormularioDelete(parentNode.parentNode.parentNode)');
            // linkRemover.setAttribute('onclick', 'removerCliente(parentNode.parentNode)');
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

// Organizar dados da tabela
function sortTable(columnIndex) {
    const tableBody = document.querySelector("table tbody");
    const tableRows = Array.from(tableBody.querySelectorAll("tr"));
  
    // Toggle sort direction on each click
    sortDirection *= -1; // Invert sort direction
  
    // Sort the rows based on the selected column and sort direction
    tableRows.sort((rowA, rowB) => {
      const cellA = rowA.querySelectorAll("td")[columnIndex].textContent;
      const cellB = rowB.querySelectorAll("td")[columnIndex].textContent;
  
      if (isNaN(cellA) && isNaN(cellB)) {
        return cellA.localeCompare(cellB) * sortDirection; // Sort strings alphabetically
      } else {
        return (cellA - cellB) * sortDirection; // Sort numbers numerically
      }
    });
  
    // Update the table body with sorted rows
    tableBody.innerHTML = "";
    tableRows.forEach(row => tableBody.appendChild(row));
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
    const profissao = tr.children[2].innerText;
    const estadocivil = tr.children[3].innerText; 
    const telefone = tr.children[4].innerText; 
    const rg = tr.children[5].innerText; 
    const orgemissor = tr.children[6].innerText; 
    const cpf = tr.children[7].innerText; 
    const email = tr.children[8].innerText; 
    const cep = tr.children[9].innerText; 
    const rua = tr.children[10].innerText; 
    const numero = tr.children[11].innerText; 
    const complemento = tr.children[12].innerText; 
    const bairro = tr.children[13].innerText; 
    const cidade = tr.children[14].innerText; 
    const estado = tr.children[15].innerText; 

    document.getElementById('update-id-cliente').value = id_cliente;
    document.getElementById('update-nome').value = nome;
    document.getElementById('update-cpf').value = cpf;
    document.getElementById('update-estadocivil').value = estadocivil;
    document.getElementById('update-profissao').value = profissao;
    document.getElementById('update-rg').value = rg;
    document.getElementById('update-orgemissor').value = orgemissor;
    document.getElementById('update-telefone').value = telefone;
    document.getElementById('update-email').value = email;
    document.getElementById('update-cep').value = cep;
    document.getElementById('update-rua').value = rua;
    document.getElementById('update-numero').value = numero;
    document.getElementById('update-complemento').value = complemento;
    document.getElementById('update-bairro').value = bairro;
    document.getElementById('update-cidade').value = cidade;
    document.getElementById('update-estado').value = estado;

    // Abrir o modal de atualização
    
    const updateModal = document.getElementById('update-modal');
    // updateModal.setAttribute('data-modal-target', 'update-modal');
    // updateModal.setAttribute('data-modal-toggle', 'update-modal');
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
    const orgemissor = document.getElementById('update-orgemissor').value;
    const telefone = document.getElementById('update-telefone').value;
    const email = document.getElementById('update-email').value;
    const cep = document.getElementById('update-cep').value;
    const rua = document.getElementById('update-rua').value;
    const numero = document.getElementById('update-numero').value;
    const complemento = document.getElementById('update-complemento').value;
    const bairro = document.getElementById('update-bairro').value;
    const cidade = document.getElementById('update-cidade').value;
    const estado = document.getElementById('update-estado').value;
    
    // Criar objeto JSON com os dados do formulário
    const data = {
        tenant: tenant,
        nome: nome,
        cpf: cpf,
        estadocivil: estadocivil,
        profissao: profissao,
        rg: rg,
        orgemissor: orgemissor,
        telefone: telefone,
        email: email,
        cep: cep,
        rua: rua,
        numero: numero,
        complemento: complemento,
        bairro: bairro,
        cidade: cidade,
        estado: estado
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
        renderizarTabela()
    })
    .catch((error) => {
        console.log('Error:', error);
        alert('Erro no atualizar, contate o suporte.');
        // Lógica de tratamento de erro, se necessário
    });
}

// DELETE

function preencherFormularioDelete(tr) {
    // Preencher os campos do formulário no modal com os dados do cliente
    
    const id_cliente = tr.children[0].innerText;

    document.getElementById('delete-id-cliente').value = id_cliente;

    // Abrir o modal de delete
    const deleteModal = document.getElementById('delete-modal');
    deleteModal.classList.remove('hidden');
}

async function removerCliente() {
    // Evitar o comportamento padrão do formulário
    event.preventDefault();

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
    // Obter valores dos campos do formulário
    const tenant = userInfo.id_tenant;
    const id_cliente = document.getElementById('delete-id-cliente').value;

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

// REU

// CREATE
async function verificarCPFCNPJExistente(CPFCNPJ) {
    const response = await fetch(`http://mysql-agility.advogadodigital.click:3333/reus/${CPFCNPJ}`);
    const data = await response.json();
    return data.existe;
}

async function enviarCadastroReu() {
    // Evitar o comportamento padrão do formulário
    event.preventDefault();

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
    // Obter valores dos campos do formulário
    const tenant = userInfo.id_tenant;
    const nome = document.getElementById('nome').value;
    const cpfcnpj = document.getElementById('cpfcnpj').value;
    const estadocivil = document.getElementById('estadocivil').value;
    const profissao = document.getElementById('profissao').value;
    const rg = document.getElementById('rg').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('criar-email').value;
    const endereco_completo_com_cep = document.getElementById('endereco_completo_com_cep').value;

    // Criar objeto JSON com os dados do formulário
    const data = {
        tenant: tenant,
        nome: nome,
        cpfcnpj: cpfcnpj,
        estadocivil: estadocivil,
        profissao: profissao,
        rg: rg,
        telefone: telefone,
        email: email,
        endereco_completo_com_cep: endereco_completo_com_cep
    };

    console.log(data);

    fetch(`http://mysql-agility.advogadodigital.click:3333/reus`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            // Se a resposta não for bem-sucedida, lança um erro com a mensagem apropriada
            return response.json().then(err => {
                throw new Error(err.error || 'Erro desconhecido');
            });
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert('Reu registrado com sucesso.');
        // Lógica adicional após o sucesso, se necessário
        renderizarTabelaReu()
    })
    .catch((response) => {
        console.log(response);
        alert(response);
        // Lógica de tratamento de erro, se necessário
    });

    document.getElementById('nome').value = '';
    document.getElementById('cpfcnpj').value = '';
    document.getElementById('estadocivil').value = '';
    document.getElementById('profissao').value = '';
    document.getElementById('rg').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('criar-email').value = '';
    document.getElementById('endereco_completo_com_cep').value = '';
}

// READ 

// Função para buscar reus no backend
async function buscarReu() { 
    try {
        const tenant = userInfo.id_tenant;
        const resposta = await fetch(`http://mysql-agility.advogadodigital.click:3333/reus/${tenant}`);
        const reus = await resposta.json();
        return reus;
    } catch (error) {
        console.error('Erro ao buscar reus:', error);
        throw error;
    }
}

// Função para renderizar os dados na tabela
async function renderizarTabelaReu() {
    const tbody = document.querySelector('tbody');

    try {
        // Buscar reus no backend
        const reus = await buscarReu();
        // Limpar o conteúdo atual da tabela
        tbody.innerHTML = '';

        // Renderizar os novos dados na tabela
        reus.forEach((reu) => {
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
            Object.values(reu).forEach((value) => {
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
            linkEditar.setAttribute('onclick', 'preencherFormularioAtualizacaoReu(parentNode.parentNode.parentNode)');
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
            linkRemover.setAttribute('data-modal-target', 'delete-modal');
            linkRemover.setAttribute('data-modal-toggle', 'delete-modal');
            linkRemover.setAttribute('onclick', 'preencherFormularioDeleteReu(parentNode.parentNode.parentNode)');
            // linkRemover.setAttribute('onclick', 'removerCliente(parentNode.parentNode)');
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

async function pesquisaReu(){

    // Seletor do input de pesquisa
    const inputPesquisa = document.getElementById('pesquisaReu');

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
function preencherFormularioAtualizacaoReu(tr) {
    // Preencher os campos do formulário no modal com os dados do reu
    
    const id_reu = tr.children[0].innerText;
    const nome = tr.children[1].innerText; 
    const cpfcnpj = tr.children[2].innerText; 
    const estadocivil = tr.children[3].innerText; 
    const profissao = tr.children[4].innerText; 
    const rg = tr.children[5].innerText; 
    const telefone = tr.children[6].innerText; 
    const email = tr.children[7].innerText; 
    const endereco_completo_com_cep = tr.children[8].innerText;

    document.getElementById('update-id-reu').value = id_reu;
    document.getElementById('update-nome').value = nome;
    document.getElementById('update-cpfcnpj').value = cpfcnpj;
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

async function updateCadastroReu() {
    // Evitar o comportamento padrão do formulário
    event.preventDefault();

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
    // Obter valores dos campos do formulário
    const tenant = userInfo.id_tenant;
    const id_reu = document.getElementById('update-id-reu').value;
    const nome = document.getElementById('update-nome').value;
    const cpfcnpj = document.getElementById('update-cpfcnpj').value;
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
        cpfcnpj: cpfcnpj,
        estadocivil: estadocivil,
        profissao: profissao,
        rg: rg,
        telefone: telefone,
        email: email,
        endereco_completo_com_cep: endereco_completo_com_cep
    };

    console.log(data);

    // Enviar dados para o backend usando fetch
    fetch(`http://mysql-agility.advogadodigital.click:3333/reus/${id_reu}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    // .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Dados do reu atualizados com sucesso.');
        // Lógica adicional após o sucesso, se necessário
        renderizarTabelaReu()
    })
    .catch((error) => {
        console.log('Error:', error);
        alert('Erro no atualizar, contate o suporte.');
        // Lógica de tratamento de erro, se necessário
    });
}

// DELETE

function preencherFormularioDeleteReu(tr) {
    // Preencher os campos do formulário no modal com os dados do reu
    
    const id_reu = tr.children[0].innerText;
    // const nome = tr.children[1].innerText; 
    // const cpf = tr.children[2].innerText; 

    document.getElementById('delete-id-reu').value = id_reu;
    // document.getElementById('delete-nome').value = nome;
    // document.getElementById('delete-cpf').value = cpf;

    // Abrir o modal de delete
    const deleteModal = document.getElementById('delete-modal');
    deleteModal.classList.remove('hidden');
}

async function removerReu() {
    // Evitar o comportamento padrão do formulário
    event.preventDefault();

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
    // Obter valores dos campos do formulário
    const tenant = userInfo.id_tenant;
    const id_reu = document.getElementById('delete-id-reu').value;

    console.log(id_reu)
    
    // Criar objeto JSON com os dados do formulário
    const data = {
        tenant: tenant
    };

    console.log(data);

    // Enviar dados para o backend usando fetch
    fetch(`http://mysql-agility.advogadodigital.click:3333/reus/${id_reu}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    // .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Dados do reu deletados com sucesso.');
        // Lógica adicional após o sucesso, se necessário
        renderizarTabela()
    })
    .catch((error) => {
        console.log('Error:', error);
        alert('Erro ao deletar, contate o suporte.');
        // Lógica de tratamento de erro, se necessário
    });
}

// FIM REU

// PROCESSOS

// DOCUMENTOS

async function gerarDocumento() {
    event.preventDefault();

    const clienteID = document.getElementById('id-cliente').value;
    const clienteNome = document.getElementById('nome-cliente').value;
    const clienteCPF = document.getElementById('cpf-cliente').value;
    const clienteEstadoCivil = document.getElementById('estadocivil-cliente').value;
    const clienteProfissao = document.getElementById('profissao-cliente').value;
    const clienteRG = document.getElementById('rg-cliente').value;
    const clienteOrgEmissor = document.getElementById('orgemissor-cliente').value;
    const clienteTelefone = document.getElementById('telefone-cliente').value;
    const clienteEmail = document.getElementById('email-cliente').value;
    const clienteCEP = document.getElementById('cep-cliente').value;
    const clienteRua = document.getElementById('rua-cliente').value;
    const clienteNumero = document.getElementById('numero-cliente').value;
    const clienteComplemento = document.getElementById('complemento-cliente').value;
    const clienteBairro = document.getElementById('bairro-cliente').value;
    const clienteCidade = document.getElementById('cidade-cliente').value;
    const clienteEstado = document.getElementById('estado-cliente').value;
    
    const tenantCidade = document.getElementById('cidade-tenant').value;
    const tenantEstado = document.getElementById('estado-tenant').value;
    const tenantResponsavel = document.getElementById('responsavel-tenant').value;
    const tenantEmail = document.getElementById('email-tenant').value;

    const tipoDocumento = document.getElementById('document-type').value;

    const data = {
        clienteID,
        clienteNome,
        clienteCPF,
        clienteEstadoCivil,
        clienteProfissao,
        clienteRG,
        clienteOrgEmissor,
        clienteTelefone,
        clienteEmail,
        clienteCEP,
        clienteRua,
        clienteNumero,
        clienteComplemento,
        clienteBairro,
        clienteCidade,
        clienteEstado,
        tenantCidade,
        tenantEstado,
        tenantResponsavel,
        tenantEmail,
        tipoDocumento
    };

    const response = await fetch('http://mysql-agility.advogadodigital.click:3333/gerar-docx', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (response.ok) {
      const blob = await response.blob();
  
      // Crie um objeto de URL do Blob
      const url = window.URL.createObjectURL(blob);
  
      // Crie um link temporário
      const a = document.createElement('a');
      a.href = url;
  
      // Defina o nome do arquivo para download  
      switch (tipoDocumento) {
        case '1':
            a.download = `${clienteID}_${clienteNome}_Contrato_Honorarios_Advocaticios.docx`;
            break;
        case '2':
            a.download = `${clienteID}_${clienteNome}_Declaracao_Hipossuficiencia.docx`;
            break;
        case '3':
            a.download = `${clienteID}_${clienteNome}_Manifesto.docx`;
            break;
        case '4':
            a.download = `${clienteID}_${clienteNome}_Procuracao.docx`;
            break;
        default:
            throw new Error('Tipo de documento inválido');
      }

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

async function renderizarTabelaClientesDocumentos(event) {
    event.preventDefault();
    const tbody = document.querySelector('tbody');
    const searchTerm = document.getElementById('nome').value.trim(); // Capturar o valor do campo de entrada

    try {
        // Buscar clientes no backend com o termo de pesquisa
        const clientes = await buscarClientesDocumentos(searchTerm);
        // Limpar o conteúdo atual da tabela
        tbody.innerHTML = '';

        // Renderizar os novos dados na tabela
        clientes.forEach((cliente) => {
            const tr = document.createElement('tr');
            tr.classList.add('bg-white', 'border-b', 'dark:bg-gray-800', 'dark:border-gray-700', 'hover:bg-gray-50', 'dark:hover:bg-gray-600');

            // Adicionar as células da linha
            Object.entries(cliente).forEach(([key, value]) => {
                const td = document.createElement('td');
                td.classList.add('px-6', 'py-3');
            
                if (['cidade', 'estadocivil', 'telefone', 'email', 'rg', 'cep', 'rua',  'numero', 'complemento', 'bairro', 'orgemissor', 'estado'].includes(key)) {
                    td.classList.add('hidden');}
            
                td.textContent = value;
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


async function buscarClientesDocumentos(searchTerm = '') { 
    try {
        const tenant = userInfo.id_tenant;
        const resposta = await fetch(`http://mysql-agility.advogadodigital.click:3333/clientes/${tenant}?search=${searchTerm}`);
        const clientes = await resposta.json();
        return clientes;
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        throw error;
    }
}


function preencherNomeClienteDocumentos(tr) {
    // Preencher os campos do formulário no modal com os dados do cliente

    const id_cliente = tr.children[0].innerText;
    const nome = tr.children[1].innerText; 
    const profissao = tr.children[2].innerText;
    const estadocivil = tr.children[3].innerText; 
    const telefone = tr.children[4].innerText; 
    const rg = tr.children[5].innerText; 
    const orgemissor = tr.children[6].innerText; 
    const cpf = tr.children[7].innerText; 
    const email = tr.children[8].innerText; 
    const cep = tr.children[9].innerText; 
    const rua = tr.children[10].innerText; 
    const numero = tr.children[11].innerText; 
    const complemento = tr.children[12].innerText; 
    const bairro = tr.children[13].innerText; 
    const cidade = tr.children[14].innerText; 
    const estado = tr.children[15].innerText; 

    document.getElementById('id-cliente').value = id_cliente;
    document.getElementById('nome-cliente').value = nome;
    document.getElementById('cpf-cliente').value = cpf;
    document.getElementById('estadocivil-cliente').value = estadocivil;
    document.getElementById('profissao-cliente').value = profissao;
    document.getElementById('rg-cliente').value = rg;
    document.getElementById('orgemissor-cliente').value = orgemissor;
    document.getElementById('telefone-cliente').value = telefone;
    document.getElementById('email-cliente').value = email;
    document.getElementById('cep-cliente').value = cep;
    document.getElementById('rua-cliente').value = rua;
    document.getElementById('numero-cliente').value = numero;
    document.getElementById('complemento-cliente').value = complemento;
    document.getElementById('bairro-cliente').value = bairro;
    document.getElementById('cidade-cliente').value = cidade;
    document.getElementById('estado-cliente').value = estado;

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

// FIM DOCUMENTOS

//
// AGENDA
//

function renderCalendar(date) {
    const month = date.getMonth();
    const year = date.getFullYear();

    // Define o primeiro dia do mês
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    // Atualiza o cabeçalho com o mês e o ano atual
    document.getElementById('monthYear').textContent = `${monthNames[month]} ${year}`;

    // Gera o corpo do calendário
    const calendarBody = document.getElementById('calendarBody');
    calendarBody.innerHTML = '';

    let row = document.createElement('tr');
    // Preencher os dias vazios antes do primeiro dia do mês
    for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
        const cell = document.createElement('td');
        cell.classList.add('empty');
        row.appendChild(cell);
    }

    // Preencher os dias do mês
    for (let day = 1; day <= lastDate; day++) {
        if (row.children.length === 7) {
            calendarBody.appendChild(row);
            row = document.createElement('tr');
        }

        const cell = document.createElement('td');
        cell.textContent = day;
        cell.classList.add('active');
        row.appendChild(cell);
    }

    // Preencher os dias vazios após o último dia do mês
    while (row.children.length < 7) {
        const cell = document.createElement('td');
        cell.classList.add('empty');
        row.appendChild(cell);
    }
    calendarBody.appendChild(row);
}

document.getElementById('prevMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
});

document.getElementById('nextMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
});