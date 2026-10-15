// ========================================
// CONFIGURAÇÃO DA API
// ========================================

const API_URL = 'http://localhost:3000/alunos';


// ========================================
// VARIÁVEIS
// ========================================

let alunos = [];

let novosCadastros = 0;


// ========================================
// ELEMENTOS HTML
// ========================================

const tabelaAlunos =
    document.getElementById('tabelaAlunos');

const estadoTabela =
    document.getElementById('estadoTabela');

const totalAlunos =
    document.getElementById('totalAlunos');

const novosCadastrosElement =
    document.getElementById('novosCadastros');

const apiStatus =
    document.getElementById('apiStatus');

const modal =
    document.getElementById('modalAluno');

const formAluno =
    document.getElementById('formAluno');

const btnNovoAluno =
    document.getElementById('btnNovoAluno');

const btnFecharModal =
    document.getElementById('btnFecharModal');

const btnCancelar =
    document.getElementById('btnCancelar');

const campoBusca =
    document.getElementById('campoBusca');

const message =
    document.getElementById('message');


// ========================================
// INICIALIZAÇÃO
// ========================================

document.addEventListener(
    'DOMContentLoaded',
    carregarAlunos
);


// ========================================
// GET - BUSCAR ALUNOS
// ========================================

async function carregarAlunos() {

    estadoTabela.textContent =
        'Carregando alunos...';

    estadoTabela.classList.remove('hidden');


    try {

        const response =
            await fetch(API_URL);

            console.log(response);


        if (!response.ok) {

            throw new Error(
                'Não foi possível consultar a API.'
            );

        }


        alunos =
            await response.json();


        // API funcionando

        apiStatus.textContent =
            'Online';

        apiStatus.style.color =
            '#16a34a';


        atualizarDashboard();

        renderizarTabela(alunos);


    } catch (error) {

        console.error(error);


        // API indisponível

        apiStatus.textContent =
            'Offline';

        apiStatus.style.color =
            '#dc2626';


        tabelaAlunos.innerHTML =
            '';


        estadoTabela.textContent =
            'Não foi possível conectar ao servidor.';


        mostrarMensagem(
            'Não foi possível conectar à API. Verifique se o servidor Node.js está executando.',
            'error'
        );

    }

}


// ========================================
// ATUALIZAR DASHBOARD
// ========================================

function atualizarDashboard() {

    totalAlunos.textContent =
        alunos.length;


    novosCadastrosElement.textContent =
        novosCadastros;

}


// ========================================
// RENDERIZAR TABELA
// ========================================

function renderizarTabela(lista) {

    tabelaAlunos.innerHTML =
        '';


    if (lista.length === 0) {

        estadoTabela.textContent =
            'Nenhum aluno encontrado.';

        estadoTabela.classList.remove(
            'hidden'
        );

        return;

    }


    estadoTabela.classList.add(
        'hidden'
    );


    lista.forEach(aluno => {

        const linha =
            document.createElement('tr');


        linha.innerHTML = `

            <td>
                ${aluno.id}
            </td>

            <td>
                ${escapeHtml(aluno.nome)}
            </td>

            <td>
                ${escapeHtml(aluno.email)}
            </td>

        `;


        tabelaAlunos.appendChild(
            linha
        );

    });

}


// ========================================
// POST - CADASTRAR ALUNO
// ========================================

formAluno.addEventListener(
    'submit',
    async function(event) {

        event.preventDefault();


        const nome =
            document
                .getElementById('nome')
                .value
                .trim();


        const email =
            document
                .getElementById('email')
                .value
                .trim();


        // Validação

        if (!nome || !email) {

            mostrarMensagem(
                'Nome e e-mail são obrigatórios.',
                'error'
            );

            return;

        }


        const btnSalvar =
            document.getElementById(
                'btnSalvar'
            );


        btnSalvar.disabled =
            true;


        btnSalvar.textContent =
            'Salvando...';


        try {

            const response =
                await fetch(
                    API_URL,
                    {

                        method:
                            'POST',

                        headers:
                            {
                                'Content-Type':
                                    'application/json'
                            },

                        body:
                            JSON.stringify(
                                {
                                    nome:
                                        nome,

                                    email:
                                        email
                                }
                            )

                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    data.error ||
                    'Erro ao cadastrar aluno.'
                );

            }


            // Adiciona o novo aluno
            // na lista local

            alunos.push(data);


            novosCadastros++;


            // Atualiza dashboard

            atualizarDashboard();


            // Atualiza tabela

            renderizarTabela(
                alunos
            );


            // Fecha modal

            fecharModal();


            // Limpa formulário

            formAluno.reset();


            // Mensagem

            mostrarMensagem(
                'Aluno cadastrado com sucesso!',
                'success'
            );


        } catch (error) {

            console.error(error);


            mostrarMensagem(
                error.message ||
                'Erro ao cadastrar aluno.',
                'error'
            );


        } finally {

            btnSalvar.disabled =
                false;


            btnSalvar.textContent =
                'Cadastrar';

        }

    }
);


// ========================================
// ABRIR MODAL
// ========================================

function abrirModal() {

    modal.classList.remove(
        'hidden'
    );


    document
        .getElementById('nome')
        .focus();

}


// ========================================
// FECHAR MODAL
// ========================================

function fecharModal() {

    modal.classList.add(
        'hidden'
    );

}


// ========================================
// EVENTOS DOS BOTÕES
// ========================================

btnNovoAluno.addEventListener(
    'click',
    abrirModal
);


btnFecharModal.addEventListener(
    'click',
    fecharModal
);


btnCancelar.addEventListener(
    'click',
    fecharModal
);


// ========================================
// FECHAR CLICANDO FORA DO MODAL
// ========================================

modal.addEventListener(
    'click',
    function(event) {

        if (event.target === modal) {

            fecharModal();

        }

    }
);


// ========================================
// FECHAR COM ESC
// ========================================

document.addEventListener(
    'keydown',
    function(event) {

        if (event.key === 'Escape') {

            fecharModal();

        }

    }
);


// ========================================
// PESQUISA
// ========================================

campoBusca.addEventListener(
    'input',
    function() {

        const termo =
            campoBusca.value
                .toLowerCase()
                .trim();


        const resultado =
            alunos.filter(
                aluno =>

                    aluno.nome
                        .toLowerCase()
                        .includes(termo)

                    ||

                    aluno.email
                        .toLowerCase()
                        .includes(termo)
            );


        renderizarTabela(
            resultado
        );

    }
);


// ========================================
// MENSAGENS
// ========================================

function mostrarMensagem(
    texto,
    tipo
) {

    message.textContent =
        texto;


    message.className =
        `message ${tipo}`;


    setTimeout(
        () => {

            message.classList.add(
                'hidden'
            );

        },
        4000
    );

}


// ========================================
// PROTEÇÃO CONTRA HTML
// ========================================

function escapeHtml(valor) {

    const div =
        document.createElement(
            'div'
        );


    div.textContent =
        valor;


    return div.innerHTML;

}