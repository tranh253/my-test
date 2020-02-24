import React from 'react';
import renderer from 'react-test-renderer';
import { render } from "@testing-library/react";
import App from './App';

describe('App render snapshot test', () => {
  test('snapshot renders', () => {
    const component = renderer.create(<App />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});


