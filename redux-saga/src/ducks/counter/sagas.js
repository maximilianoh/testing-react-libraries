import { call, takeLatest, put } from 'redux-saga/effects';
import {getAllTodos} from './services';
import types from './types';


// Get Todos
function* getTodos() {
    const todos = yield call(getAllTodos);
    yield put({ type: types.GET_TODOS, payload: todos })
}

// Export the saga (todo-saga)
function* mySaga() {
    yield takeLatest(types.GET_TODOS_REQUESTED, getTodos);
  }
export default mySaga;
