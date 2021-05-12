import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('Default Chip', () => {
    let counter = 0;
    let setCounter = () => {

    };
    let setHistory = () => {
        
    };
    const component = renderer.create(
        <Counter
        counter={counter}
        setCounter={setCounter}
        setHistory={setHistory}
        />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});


test('Default Chip', () => {
    let counter = 0;
    let setCounter = (a) => {
        counter = a;
    };
    let setHistory = () => {
        
    };
    const { rerender, baseElement } = render(<Counter
        counter={counter}
        setCounter={setCounter}
        setHistory={setHistory}
        />
    );
    expect(counter).toBe(0);
    fireEvent.click(screen.getByText('Increase'));
    expect(baseElement).toMatchSnapshot();
    expect(counter).toBe(1);
    rerender(<Counter
        counter={counter}
        setCounter={setCounter}
        setHistory={setHistory}
        />
    );
    expect(baseElement).toMatchSnapshot();
    expect(counter).toBe(1);
    fireEvent.click(screen.getByText('Increase'));
    expect(counter).toBe(2);
});