import React from 'react';

export const ThemeContext = React.createContext({
    selected: false,
    toggleSelected: () => {},
});
