'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
        queryInterface.addColumn(
            'tarefas', 
            'concluida', 
            {
                type: Sequelize.BOOLEAN,
                allowNull: true
            }
        ),
        queryInterface.addColumn(
            'tarefas', 
            'tentativas', 
            {
                type: Sequelize.INTEGER,
                allowNull: true,
                
            }
        ),

    ])
  },

  down: async (queryInterface, Sequelize) => {
      
  }
};
