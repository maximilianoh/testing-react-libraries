import { call, takeLatest, put } from 'redux-saga/effects';
import services from './services';
import types from './types';


// Get Todos
function* getTodos(api) {
    const todos = yield call(api);
    yield put({ type: types.GET_TODOS, payload: todos })
}

// Export the saga (todo-saga)
function* mySaga() {
    yield takeLatest(types.GET_TODOS_REQUESTED, getTodos, services.getAllTodos);
}
export default mySaga;
