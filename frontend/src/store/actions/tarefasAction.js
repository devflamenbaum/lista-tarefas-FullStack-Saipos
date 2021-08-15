import axios from '../../services/axios';

export const carregarTarefas = () => async (dispatch) => {
  const pendentes = await axios.get('/api/tarefas/');
  const concluidas = await axios.get('/api/tarefas/', {
    params: {
      concluida: true,
    },
  });

  dispatch({
    type: 'FETCH_TAREFAS',
    payload: {
      pendentes: pendentes.data,
      concluidas: concluidas.data,
    },
  });
};
