import { combineReducers } from 'redux';
import tarefasReducer from './reducers/tarefasReducer';

const rootReducers = combineReducers({
  tarefas: tarefasReducer,
});

export default rootReducers;
