export const newEl = (type, text = null, id = null, classes = []) => {
    const e = document.createElement(type);
    if (text !== null){ e.textContent = text; }
    if (id !== null){ e.id = id; }
    if (classes.length > 0) { classes.forEach(cl => e.classList.add(cl)); }
    return e;
}

