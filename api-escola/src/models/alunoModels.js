const alunos = [
    {id: 1, nome: 'Ana', email: 'ana@email.com'},
    {id: 2, nome: 'Carlos', email: 'carlos@email.com'},
    {id: 3, nome: 'Antonio', email: 'antonio@email.com'}
]

module.exports = {
    getAll: () => alunos,
    getById: (id) => alunos.find(a => a.id = Number(id)),
    save: (dados) => {
        const novoAluno = {
            id: alunos.length > 0 ? alunos[alunos.length - 1].id + 1 : 1,
            nome : dados.nome,
            email : dados.email
        };

        alunos.push(novoAluno);
        
        return novoAluno;
    }  
}