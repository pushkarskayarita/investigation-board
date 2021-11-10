import React from 'react';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/dom';
import { getPicturesDB, addPictureDB } from '../../helpers/indexedDB';
import App from '../App';
import { render, screen } from '../../utils/test-utils';

global.URL.createObjectURL = jest.fn();

jest.mock('../../helpers/indexedDB', () => {
    return {
        getPicturesDB: jest.fn(),
        initiateDB: jest.fn(),
        addPictureDB: jest.fn(),
        deletePictureDB: jest.fn(),
    };
});

describe('add image to uploadedList and delete image from uploadedList', () => {
    let mockPictures;
    beforeEach(() => {
        mockPictures = [];
        return jest.resetModules();
    });

    describe('upload image when 2 images are in uploaded pictures list', () => {
        beforeEach(() => {
            mockPictures = [
                {
                    id: 'EbV9r3KC',
                    title: 'DSC_8890.JPG',
                    file: {},
                },
                {
                    id: 'MZbm4a0Y',
                    title: 'DSC_8813.JPG',
                    file: {},
                },
            ];
            getPicturesDB.mockImplementation(() =>
                Promise.resolve(mockPictures)
            );
        });

        test('click on button "Choose image"- uploads image', async () => {
            addPictureDB.mockImplementation(() => Promise.resolve());
            render(<App />);
            const file = new File(['hello'], 'hello.jpg', {
                type: 'image/jpg',
            });
            const span = screen.getByTestId('uploadForm');
            const input = screen.getByLabelText(/uploads/i);
            const labelText = new RegExp(`Image selected: ${file.name}`);
            const uploadImgBtn = screen.getByRole('button', {
                name: 'Upload image',
            });
            expect(span).toHaveTextContent(/^Select image to upload$/);

            userEvent.upload(input, file);

            expect(input.files[0]).toStrictEqual(file);
            expect(input.files).toHaveLength(1);
            expect(span).toHaveTextContent(labelText);

            const listItems = await screen.findAllByRole('listitem', {
                name: 'uploaded image',
            });
            expect(listItems).toHaveLength(2);

            userEvent.click(uploadImgBtn);

            await waitFor(async () => {
                const updatedListItems = await screen.findAllByRole(
                    'listitem',
                    {
                        name: 'uploaded image',
                    }
                );
                expect(updatedListItems).toHaveLength(3);
                expect(span).toHaveTextContent(/^Select image to upload$/);
            });
        });

        test('delete button  appears on hover', () => {
            render(<App />);
            const deleteBtn = screen.queryByRole('button', { name: 'Delete' });
            expect(deleteBtn).not.toBeInTheDocument();
        });

        test('delete button removes uploaded image from uploadedList', async () => {
            await render(<App />);
            const listItems = await screen.findAllByRole('listitem', {
                name: 'uploaded image',
            });

            userEvent.hover(listItems[0]);

            const deleteBtns = screen.getAllByRole('button', {
                name: 'Delete',
            });

            userEvent.click(deleteBtns[0]);

            await waitFor(async () => {
                const updatedListItems = await screen.findAllByRole(
                    'listitem',
                    {
                        name: 'uploaded image',
                    }
                );
                expect(updatedListItems).toHaveLength(1);
            });
        });
    });

    describe('not renders uploaded pictures list when there are no images uploaded ', () => {
        test('should render div with text "No loaded images"', async () => {
            getPicturesDB.mockImplementation(() =>
                Promise.resolve(mockPictures)
            );
            render(<App />);
            const divPlaceHolder = await screen.getByText('No loaded images');
            expect(divPlaceHolder).toBeInTheDocument();
            expect(divPlaceHolder).toHaveTextContent('No loaded images');
        });
    });
});
