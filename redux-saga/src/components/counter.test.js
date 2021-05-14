import React from 'react';
import TestRenderer from 'react-test-renderer';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Counter from './Counter';
import { Provider } from "react-redux";
import store from '../store';
import { reducer, types, sagas, services, selectors } from '../ducks/counter';
import { getTodos } from '../ducks/counter/sagas';
import actions from '../ducks/counter/actions';
import { testSaga, expectSaga } from 'redux-saga-test-plan';
import { call } from "redux-saga/effects";
const { act } = TestRenderer;

beforeEach(() => {
    act(() => {
        store.dispatch(actions.reset());
    });
});

test('Default Snap', () => {
    const component = TestRenderer.create(
        <Provider store={store}>
            <Counter />
        </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});


test('Default Increase', () => {
    const { rerender, baseElement } = render(
        <Provider store={store}>
            <Counter />
        </Provider>
    );
    expect(screen.queryByText('0')).toBeInTheDocument()
    const { act } = TestRenderer;
    act(() => {
        fireEvent.click(screen.getByText('Increase'));
    });
    expect(screen.queryByText('0')).toBe(null)
    expect(screen.queryByText('1')).toBeInTheDocument();
    act(() => {
        fireEvent.click(screen.getByText('Increase'));
    });
    expect(screen.queryByText('1')).toBe(null)
    expect(screen.queryByText('2')).toBeInTheDocument();
    act(() => {
        fireEvent.click(screen.getByText('Decrease'));
    });
    expect(screen.queryByText('2')).toBe(null)
    expect(screen.queryByText('1')).toBeInTheDocument();
});

test('Default reduce Initial', () => {
    const INITIAL_STATE = {
        count: 0,
        data: [],
        history: [],
    }
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
});

test('Default reduce', () => {
    const STATE = {
        count: 1,
        data: [],
        history: [1],
    }
    expect(reducer(undefined, { type: types.INCREMENT })).toEqual(STATE);

    const STATE2 = {
        count: 2,
        data: [],
        history: [2, 1],
    }
    expect(reducer(STATE, { type: types.INCREMENT })).toEqual(STATE2);

});

test('Unit test saga', () => {
    const rootSaga = function* root() {
        yield sagas[0];
    };
    testSaga(rootSaga)
        .next()
        .takeLatest(types.GET_TODOS_REQUESTED, getTodos, services)
        .finish()
        .isDone();

    const fakeData = { data: [1, 2, 3, 4, 5] };
    const api = {
        getAllTodos: () => ({ data: fakeData.data }),
    };
    //simple
    expectSaga(getTodos, api)
        .put({
            type: types.GET_TODOS,
            payload: { data: fakeData.data },
        })
        .dispatch({ type: types.GET_TODOS })
        .run();

    // Mocking with Providers
    expectSaga(getTodos, api)
        .provide([[call(api.getAllTodos), fakeData.data]])
        .put({ type: types.GET_TODOS, payload: fakeData.data })
        .dispatch({ type: types.GET_TODOS_REQUESTED })
        .silentRun();
});



const originalError = console.error;
var axios = require("axios");
jest.mock('axios');
test('Integration test saga', async () => {
    const data = {
        data: [1, 2, 3, 4, 5]
    };
    act( () => {
        axios.get.mockResolvedValue({ data: data.data });

        const { getByText } = render(
            <Provider store={store}>
                <Counter />
            </Provider>
        );

        const a = getByText('Size list', {
            exact: false,
        });
        expect(a.textContent.trim()).toEqual('Size list: 0');
        fireEvent.click(getByText('Get'));

    });
    // silent act() useDispatch warning
    console.error = jest.fn();
    await waitFor(() => screen.getByText('Size list', {
        exact: false,
    }))
    console.error = originalError;
    const c = screen.getByText('Size list', {
        exact: false,
    });

    expect(c.textContent.trim()).toEqual(`Size list: ${data.data.length}`);
});

/*
var axios = require("axios");
jest.mock('axios');
test('Integration test saga 2', () => {
    var reactRedux = require("react-redux");
    const data = {
        data: [1, 2, 3, 4, 5]
    };
    let useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
    let useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
    let dummyDispatch = jest.fn();
    act( () => {
        axios.get.mockResolvedValue({ data: data.data });

        useSelectorMock.mockReturnValue(0);
        useDispatchMock.mockReturnValue(dummyDispatch);
        expect(dummyDispatch).not.toHaveBeenCalled();
        expect(useSelectorMock).not.toHaveBeenCalled();

        const { getByText } = render(
            <Provider store={store}>
                <Counter />
            </Provider>
        );
        expect(useSelectorMock).toBeCalledTimes(2);
        const a = getByText('Size list', {
            exact: false,
        });

        expect(a.textContent.trim()).toEqual('Size list: 0');
        fireEvent.click(getByText('Get'));
        expect(dummyDispatch).toBeCalledTimes(1);
        
    });
});
*/
var reactRedux = require("react-redux");
const originalDispatch = reactRedux.useDispatch;
test('Integration test saga 3', async() => {
    const data = {
        data: [1, 2, 3, 4, 5]
    };
    await act( async() => {
        const original = reactRedux.useDispatch;
        let useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
        let useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
        axios.get.mockResolvedValue({ data: data.data });
        const fun = (f) => {
            return f(store.getState());
        } 
        const fun2 = () => {
            return original(actions.getData());;
        } 
        useSelectorMock.mockImplementation(fun);
        useDispatchMock.mockImplementation(fun2);
        const { getByText, rerender } = render(
            <Provider store={store}>
                <Counter />
            </Provider>
        );
        const a = getByText('Size list', {
            exact: false,
        });

        // expect(a.textContent.trim()).toEqual('Size list: 0');
        expect(store.getState().counterGroup.data.length).toEqual(0);
        fireEvent.click(getByText('Get'));
        
        
        await waitFor(() => screen.getByText('Size list', {
            exact: false,
        }))
        expect(store.getState().counterGroup.data.length).toEqual(data.data.length);

        rerender(
            <Provider store={store}>
                <Counter />
            </Provider>
        );

        const c = screen.getByText('Size list', {
            exact: false,
        });
        expect(c.textContent.trim()).toEqual(`Size list: ${data.data.length}`);

    });
    
});
