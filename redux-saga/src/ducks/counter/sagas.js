import { takeLatest } from 'redux-saga/effects';
import services from './services';
import types from './types';
import { call, put } from 'redux-saga/effects';

// Get Todos
export function* getTodos(api) {
    const todos = yield call(api.getAllTodos);
    yield put({ type: types.GET_TODOS, payload: todos })
}

// Export the saga (todo-saga)
const sagas = [
    takeLatest(types.GET_TODOS_REQUESTED, getTodos, services)
];
  
export default sagas;