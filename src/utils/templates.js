import Note from '../components/content_templates/Note';
import PhotoCard from '../components/content_templates/PhotoCard';
import NewsPaper from '../components/content_templates/NewsPaper';
import Poster from '../components/content_templates/Poster';

export const templates = [
    {
        note: Note,
        imageSrc: null,
        id: 'note',
    },
    {
        photoCard: PhotoCard,
        imageSrc: null,
        id: 'photoCard',
    },
    {
        newsPaper: NewsPaper,
        imageSrc: null,
        id: 'newsPaper',
    },
    {
        poster: Poster,
        imageSrc: null,
        id: 'poster',
    },
];

export const componentsNames = ['note', 'photoCard', 'newsPaper', 'poster'];
