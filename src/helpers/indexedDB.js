import Dexie from 'dexie';

const db = new Dexie('ReactDexie');

db.version(1).stores({
    pictures: 'id,title,file',
    templatesBoard: 'id,coords,elementName,list',
    picturesBoard: 'id,coords,elementName,list',
    linesObjState: 'id',
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

export const deleteDB = () => {
    return db.delete();
};
