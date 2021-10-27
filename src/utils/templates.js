import Note from '../components/content_templates/Note';
import PhotoCard from '../components/content_templates/PhotoCard';
import NewsPaper from '../components/content_templates/NewsPaper';
import Poster from '../components/content_templates/Poster';

export const templates = [
    {
        note: Note,
        scaleFactor: 0.8,
        id: 'note',
        wide: false,
    },
    {
        photoCard: PhotoCard,
        scaleFactor: null,
        id: 'photoCard',
        wide: false,
    },
    {
        newsPaper: NewsPaper,
        scaleFactor: 0.3,
        id: 'newsPaper',
        wide: true,
    },
    {
        poster: Poster,
        scaleFactor: null,
        id: 'poster',
        wide: false,
    },
];

export const componentsNames = ['note', 'photoCard', 'newsPaper', 'poster'];
