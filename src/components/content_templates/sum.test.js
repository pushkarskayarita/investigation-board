import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Note from './Note';

test('note content is right', () => {
    render(<Note />);
    const noteContent = screen.getByText('Meet me at 7pm at Malcolm square');
    expect(noteContent).toHaveTextContent('Meet me at 7pm at Malcolm square');
});

test('click on note change  note text context', () => {
    render(<Note />);
    const noteContent = screen.getByText('Meet me at 7pm at Malcolm square');
    userEvent.click(noteContent);
    expect(noteContent).toHaveTextContent('Hello detective');
});
