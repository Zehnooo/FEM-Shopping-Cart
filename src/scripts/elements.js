export const newEl = (type, text = null, id = null, classes = []) => {
    const e = document.createElement(type);
    if (text !== null){ e.textContent = text; }
    if (id !== null){ e.id = id; }
    if (classes.length > 0) { classes.forEach(cl => e.classList.add(cl)); }
    return e;
}

const contentGrid = () => {
    const g = newEl('div', null, 'home-grid', ['grid']);


}

const itemCard = (item) => {
    const card = newEl('div', null, `${item.name}`, ['item-card']);
    const con = newEl('div', null, '', []);
    const topCon = newEl('div', null, '', []);
    const fig = newEl('figure', null, '', ['img-con']);
    const img = newEl('img', null, `${item.name}-img`, ['item-img']);
    const btn = newEl('button', 'Add to Cart', 'add-to-cart', ['add', 'btn']);
    const botCon = newEl('div', null, '', []);
    const category = newEl('p', item.category);
    const name = newEl('h4', item.name);
    const price = newEl('p', item.price);
}

const itemGrid = (items) => {
    const g = newEl('div', null, 'item-grid', ['grid']);


    return g;
}