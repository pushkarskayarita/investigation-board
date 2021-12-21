import Dexie from 'dexie';
import { loadedImagesUrls } from '../utils/loadedDB';
import { intialBoardData } from '../utils/initialBoardData';

const db = new Dexie('ReactDexie');

db.version(1).stores({
    pictures: 'id,title,file',
    templatesBoard: 'id,coords,elementName,list',
    picturesBoard: 'id,coords,elementName,list',
    linesObjState: 'id',
});

db.on('ready', () => {
    // eslint-disable-next-line consistent-return
    return db.pictures.count((count) => {
        if (count > 0) {
            console.log('Already populated');
        } else {
            console.log('Database is empty. Populating from ajax call...');

            return Promise.all(
                Array.from(loadedImagesUrls.values()).map((url) => fetch(url))
            )
                .then((responses) => {
                    return Promise.all(
                        responses.map((res) => {
                            return res.blob();
                        })
                    );
                })
                .then((data) => {
                    const loadedImagesIds = Array.from(loadedImagesUrls.keys());
                    return data.map((blob, index) => {
                        return db.pictures.bulkAdd([
                            {
                                id: loadedImagesIds[index],
                                title: 'testImage',
                                file: new File([blob], 'ooo'),
                            },
                        ]);
                    });
                });
        }
    });
});

db.on('populate', () => {
    db.templatesBoard.bulkAdd(intialBoardData.templates);
    db.linesObjState.add(intialBoardData.lines);
    db.picturesBoard.bulkAdd(intialBoardData.pictures);
});

export const getPicturesDB = () => {
    return db.pictures.toArray();
};

export const getTemplatesBoard = () => {
    return db.templatesBoard.toArray();
};

export const getPicturesBoard = () => {
    return db.picturesBoard.toArray();
};

export const mapGetDB = {
    templatesBoard: getTemplatesBoard,
    picturesBoard: getPicturesBoard,
};

export const getLinesDB = () => {
    return db.linesObjState.toArray();
};

export const addPictureDB = (file) => {
    return db.pictures.add(file);
};

export const addLinesDB = (linesObjState) => {
    return db.linesObjState.add(linesObjState);
};

export const addBoardItemsDB = (boardItems, list) => {
    return db[list].bulkAdd(boardItems[list]);
};

export const updateLinesDB = (linesObjState) => {
    return db.linesObjState.put(linesObjState);
};

export const updateBoardItemsDB = (boardItems, storage) => {
    return db[storage].bulkPut(boardItems[storage]);
};

export const modifyCollectionDB = (lines, id) => {
    return db.linesObjState
        .where('id')
        .equals(1)
        .modify((value, ref) => {
            if (id) {
                const filtered = Object.keys(value.pins).filter((pin) => {
                    return (
                        pin === value.linesKeysMap[id].start ||
                        pin === value.linesKeysMap[id].end
                    );
                });
                const {
                    [filtered[0]]: foo,
                    [filtered[1]]: bar,
                    ...updatedPins
                } = value.pins;

                const {
                    [id]: any,
                    ...updatedLinesKeysMap
                } = value.linesKeysMap;

                /* eslint-disable no-param-reassign */
                ref.value.pins = updatedPins;
                ref.value.linesKeysMap = updatedLinesKeysMap;
                ref.value.selectedLine = null;
                return;
            }
            ref.value = lines;
        });
};

export const deleteBoardItemDB = (id, list) => {
    return db[list].delete(id);
};

export const deletePictureDB = (id) => {
    return db.pictures.delete(id);
};

const clearTableDB = (table) => {
    return db[table].clear();
};

export const clearDB = () => {
    return Promise.all([
        clearTableDB('pictures'),
        clearTableDB('templatesBoard'),
        clearTableDB('picturesBoard'),
        clearTableDB('linesObjState'),
    ]);
};
