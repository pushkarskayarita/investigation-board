import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

function renderWithRedux(
    component,
    {
        preloadedState,
        // store = createStore(reducers, preloadedState),
        store = createStore(reducers, preloadedState, applyMiddleware(thunk)),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return <Provider store={store}>{children}</Provider>;
    }

    return {
        ...render(component, { wrapper: Wrapper, ...renderOptions }),
        store,
    };
}

export * from '@testing-library/react';
export { renderWithRedux as render };
