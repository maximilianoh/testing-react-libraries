import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('Default Snap', () => {
    const component = renderer.create(
        <Counter />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});


test('Default Increase', () => {
    const { rerender, baseElement } = render(
        <Counter/>
    );
    screen.queryByDisplayValue("0");
    fireEvent.click(screen.getByText('Increase'));
    console.log(screen.queryByDisplayValue("0"));
});