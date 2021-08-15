const initialState = {
  pendentes: [],
  concluidas: [],
};

const tarefasReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_TAREFAS':
      return {
        ...state,
        pendentes: action.payload.pendentes,
        concluidas: action.payload.concluidas,
      };
    default:
      return { ...state };
  }
};

export default tarefasReducer;
