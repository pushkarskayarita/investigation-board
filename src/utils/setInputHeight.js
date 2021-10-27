export default (element, defaultHeight) => {
    if (element) {
        const target = element.target ? element.target : element;
        target.style.height = defaultHeight;
        target.style.height = `${target.scrollHeight}px`;
        target.scrollTop = 0;
    }
};
