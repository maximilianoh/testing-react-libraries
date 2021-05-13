import React from 'react';
import TestRenderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';
import { Provider } from 'react-redux'
import store from '../store';
import { reducer, types } from '../ducks/counter';

test('Default Snap', () => {
    const component = TestRenderer.create(
        <Provider store={store}>
            <Counter/>
        </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});


test('Default Increase', () => {
    const { rerender, baseElement } = render(
        <Provider store={store}>
            <Counter/>
        </Provider>
    );
    expect(screen.queryByText('0')).toBeInTheDocument()
    const {act} = TestRenderer;
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
    expect(reducer(undefined, {type:types.INCREMENT})).toEqual(STATE);

    const STATE2 = {
        count: 2,
        data: [],
        history: [2,1],
    }
    expect(reducer(STATE, {type:types.INCREMENT})).toEqual(STATE2);

});

test('Default saga', () => {


});

