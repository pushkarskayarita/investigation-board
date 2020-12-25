import 'core-js/stable';
import 'regenerator-runtime/runtime';
import express from 'express';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';
import { loadData } from './components/FilesList';

const test = [
    {
        id: 1,
        name: 'file1.jpeg',
    },
    {
        id: 2,
        name: 'file2.jpeg',
    },
    {
        id: 3,
        name: 'file3.jpeg',
    },
];
const server = express();
server.use(express.static('dist'));

server.get('/', (req, res) => {
    const store = createStore();
    loadData(store).then(() => {
        res.send(renderer(store));
    });
});

server.get('/api/files', (req, res) => {
    res.send(test);
});

server.listen(8080, () => console.log('Server is running...'));
