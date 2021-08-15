const Sequelize = require('sequelize');
const { Model } = Sequelize;

class Tarefa extends Model {
    static init(sequelize){
        super.init({
            nome: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [2, 255],
                        msg: 'Campo nome deve ter entre 3 e 255 caracteres.'
                    }
                }
            },
            email: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    isEmail: {
                        msg: 'Email inválido.'
                    }
                }
            },
            descricao: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [3, 255],
                        msg: 'Campo descrição deve ter entre 3 e 255 caracteres.'
                    }
                }
            },
            concluida: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            tentativas: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                validate: {
                    max: 2
                }
            }
        }, {
            sequelize
        });
        return this;
    }
}

module.exports = Tarefa;