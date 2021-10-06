let counter = 1;
export const generateNewID = (text) => ({
    id: counter++,
    text,
});
