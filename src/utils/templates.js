import Note from '../components/content_templates/Note';
import PhotoCard from '../components/content_templates/PhotoCard';
import NewsPaper from '../components/content_templates/NewsPaper';
import Poster from '../components/content_templates/Poster';
import photo from '../images/photo.jpg';
import poster from '../images/poster.jpg';
import imagePlantPipe from '../images/plantPipe.jpg';

export const templates = [
    {
        note: Note,
        scaleFactor: 0.8,
        id: 'note',
        wide: false,
        imageSrc: '',
    },
    {
        photoCard: PhotoCard,
        scaleFactor: null,
        id: 'photoCard',
        wide: false,
        imageSrc: photo,
    },
    {
        newsPaper: NewsPaper,
        scaleFactor: 0.3,
        id: 'newsPaper',
        wide: true,
        imageSrc: imagePlantPipe,
    },
    {
        poster: Poster,
        scaleFactor: null,
        id: 'poster',
        wide: false,
        imageSrc: poster,
    },
];

export const componentsNames = ['note', 'photoCard', 'newsPaper', 'poster'];
