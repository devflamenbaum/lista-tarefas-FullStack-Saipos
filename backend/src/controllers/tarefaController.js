const Tarefa = require('../models/Tarefa');

module.exports = {
    async index(req, res) {
        const { concluida } = req.query;
        let tarefas;
        if(!concluida){
            tarefas = await Tarefa.findAll({
                attributes: [ 'id', 'nome', 'descricao', 'email', 'concluida', 'tentativas'],
                where: { concluida: false},
                orderBy: [['id', 'DESC']]
            })
        } else {
            tarefas = await Tarefa.findAll({
                attributes: [ 'id', 'nome', 'descricao', 'email', 'concluida', 'tentativas'],
                where: { concluida: true},
                orderBy: [['id', 'DESC']]
            })
        }

        return res.json(tarefas)
    },

    async create(req, res) {
        
        try{
            console.log(req.body)
            const tarefa = await Tarefa.create(req.body)
            return res.json(tarefa)
        }catch(err){
            return res.status(400).json({ errors: err.errors.map(error => error.message)})
        }
    },

    async update(req, res) {
        try{
            const { id } = req.params;
            console.log(req.body)

            if(!id) return res.status(400).json({ errors: ['Id não enviado']})

            const tarefa = await Tarefa.findByPk(id)

            if(!tarefa) return res.status(404).json({ errors: ['Tarefa não existe']})

            return res.json( await tarefa.update(req.body))
        }catch(err){
            console.log(err)
            return res.status(404).json({ errors: err.errors.map(error => error.message) })
        }
    }
}