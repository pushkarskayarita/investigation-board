import Dexie from 'dexie';

const db = new Dexie('ReactDexie');

export const initiateDB = () => {
    db.version(1).stores({
        pictures: 'id,title,file',
    });
    db.open().catch((err) => {
        console.log(err.stack || err);
    });
};

export const addPictureDB = (file) => {
    return db.pictures.add(file);
};

export const getPicturesDB = () => {
    return db.pictures.toArray();
};

export const deletePictureDB = (id) => {
    return db.pictures.delete(id);
};

export const deleteDB = () => {
    return db.delete();
};
