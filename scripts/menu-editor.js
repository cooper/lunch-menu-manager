document.addEvent('domready', initializeMenuEditor);

function initializeMenuEditor() {

    // listen for mouse events on the cells
    $$('table.lunch-calendar tbody td div.inner').each(function (inner) {
        var editButton = inner.getElement('.calendar-cell-edit');
        inner.addEvent('mouseenter', function () {
            editButton.setStyle('display', 'block');
        });
        inner.addEvent('mouseleave', function () {
            editButton.setStyle('display', 'none');
        });
    });

    // listen for clicks on the calendar days
    $$('table.lunch-calendar tbody td').each(function (td) {

        // fake day
        if (!td.data('year')) {
            td.addEvent('click', function (e) {
                e.preventDefault();
                showCellNotesEditor(td);
            });
            return;
        }

        // add click listener
        var menuDay = td.retrieve('menuDay');
        td.addEvent('click', function (e) {
            e.preventDefault();
            showMenuEditor(menuDay);
        });
    });

}

function showMenuEditor (menuDay) {

    // find the window
    var win = document.getElement('.admin-window.editor');
    if (win)
        saveMenu();
    else
        win = createEditorWindow();

    win.beforeClose = saveMenu;

    // find inputs
    var saladInput = win.getElement('input');
    var textareas  = win.getElements('textarea');
    var breakArea  = textareas[0], lunchArea = textareas[1];

    // set title and store day
    win.getElement('h2 span').setProperty('text', menuDay.prettyName());
    win.store('menuDay', menuDay);

    // add the data
    breakArea.value = menuDay.breakfast;
    lunchArea.value = menuDay.lunch;
    saladInput.value = menuDay.salad;

    // update the previews
    win.updatePreviews();
    win.getElements('.day-number').each(function (el) {
        el.setProperty('text', menuDay.day);
    });

    /* arrows */

    var larr, rarr;
    if (presentAnyWindow(win)) {

        larr = new Element('div', { id: 'menu-left-arrow' });
        rarr = new Element('div', { id: 'menu-right-arrow' });
        win.parentElement.adopt(larr, rarr);

        // left arrow click
        $('menu-left-arrow').addEvent('click', function (e) {
            e.preventDefault();
            var menuDay = win.retrieve('menuDay');
            if (menuDay && menuDay.previousDay)
                showMenuEditor(menuDay.previousDay);
        });

        // right arrow click
        $('menu-right-arrow').addEvent('click', function (e) {
            e.preventDefault();
            var menuDay = win.retrieve('menuDay');
            if (menuDay && menuDay.nextDay)
                showMenuEditor(menuDay.nextDay);
        });

    }

    larr = $('menu-left-arrow');
    rarr = $('menu-right-arrow');

    // back arrow
    if (menuDay.previousDay) {
        larr.innerHTML = '&larr; ' + menuDay.previousDay.shortName();
        larr.setStyle('display', 'block');
    }
    else {
        larr.setStyle('display', 'none');
    }

    // forward arrow
    if (menuDay.nextDay) {
        rarr.innerHTML = menuDay.nextDay.shortName() + ' &rarr;';
        rarr.setStyle('display', 'block');
    }
    else {
        rarr.setStyle('display', 'none');
    }

    // if breakfast is empty, probably adding a new day; focus it
    if (!breakArea.value.length)
        breakArea.focus();

    return win;
}

function saveMenu() {
    var win = document.getElement('.admin-window.editor');
    if (!win) return;

    var menuDay = win.retrieve('menuDay');
    if (!menuDay) return;

    // find inputs
    var saladInput = win.getElement('input');
    var textareas  = win.getElements('textarea');
    var breakArea  = textareas[0], lunchArea = textareas[1];

    var newBreak = breakArea.value.trim(),
        newLunch = lunchArea.value.trim(),
        newSalad = saladInput.value.trim();

    // nothing has changed
    if (newBreak == menuDay.breakfast &&
        newLunch == menuDay.lunch && newSalad == menuDay.salad)
        return false;

    // update the menu day object
    menuDay.breakfast = newBreak;
    menuDay.lunch = newLunch;
    menuDay.salad = newSalad;

    // update in database
    if (menuDay)
        menuDay.update();

    // update calendar
    menuDay.menuItems.setProperty('html', replaceNewlines(menuDay.displayText()));

    return true;
}

function createEditorWindow () {
    var win = createWindow('Menu editor');
    win.addClass('editor');

    var clear = new Element('div', { styles: { clear: 'both' } });

    // headings
    var lunchHead = new Element('h3', { text: 'Lunch' })
    var breakHead = new Element('h3', { text: 'Breakfast' });
    var prevHead1 = new Element('span', { text: 'Preview' });
    var prevHead2 = prevHead1.clone();
    lunchHead.adopt(prevHead1);
    breakHead.adopt(prevHead2);
    breakHead.setStyle('margin-top', '0');

    // input
    var inputWrap = new Element('div', { class: 'input-wrap' });
    var inputSpan = new Element('span', { text: ' salad' });
    var input = new Element('input', { type: 'text' });
    inputWrap.adopt(input, inputSpan);

    // textareas
    var lunchLeft = new Element('div', { class: 'left-side' });
    var breakLeft = new Element('div', { class: 'left-side' });
    var lunchArea = new Element('textarea');
    var breakArea = new Element('textarea');
    lunchLeft.adopt(lunchArea, inputWrap);
    breakLeft.adopt(breakArea);


    // previews
    var cell  = new Element('div',  { class: 'preview-cell' });
    var inner = new Element('div',  { class: 'inner' });
    var num   = new Element('span', { class: 'day-number', text: '1' });
    var items = new Element('span', { class: 'menu-items' });
    var prev1 = new Element('div',  { class: 'preview' });
                inner.adopt(num, items);
                cell.adopt(inner);
                prev1.adopt(cell);
    var prev2 = prev1.clone();

    // wrappers
    var lunchWrap = new Element('div', { class: 'wrap' });
    var breakWrap = new Element('div', { class: 'wrap' });
    lunchWrap.adopt(lunchLeft, prev1, clear.clone());
    breakWrap.adopt(breakLeft, prev2, clear.clone());

    win.adopt(breakHead, breakWrap, lunchHead, lunchWrap, clear);

    /* typing events */

    var updatePreviews = function () {
        prev2.getElement('.menu-items').setProperty('html', replaceNewlines(breakArea.value.trim()));
        prev1.getElement('.menu-items').setProperty('html', replaceNewlines(lunchArea.value +
            (input.value.trim().length ? "\n" + input.value.trim() + ' salad' : '')));
    };
    win.updatePreviews = updatePreviews;

    Object.each({
        lunch: lunchArea,
        breakfast: breakArea,
        salad: input
    }, function (el, name) {
        el.addEvent('input', updatePreviews);
    });

    return win;
}

/*#########################
### NON-MENU CELL NOTES ###
#########################*/

function showCellNotesEditor (td) {
    var win = createCellEditorWindow();
    win.beforeClose = saveCellNotes;
    win.td = td;

    // find inputs
    var saladInput = win.getElement('input');
    var textareas  = win.getElements('textarea');
    var breakArea  = textareas[0], lunchArea = textareas[1];

    // update the previews
    win.updatePreviews();

    presentAnyWindow(win);

    // if breakfast is empty, probably adding a new day; focus it
    if (!breakArea.value.length)
        breakArea.focus();

    return win;
}

function createCellEditorWindow () {
    var win = createWindow('Cell notes editor');
    win.addClass('editor');

    var clear = new Element('div', { styles: { clear: 'both' } });

    // headings
    var breakHead = new Element('h3', { text: 'Breakfast' });
    var prevHead1 = new Element('span', { text: 'Preview' });
    breakHead.adopt(prevHead1);
    breakHead.setStyle('margin-top', '0');


    // textareas
    var breakLeft = new Element('div', { class: 'left-side' });
    var breakArea = new Element('textarea');
    breakLeft.adopt(breakArea);

    // previews
    var cell  = new Element('div',  { class: 'preview-cell' });
    var inner = new Element('div',  { class: 'inner' });
    var items = new Element('span', { class: 'notes-items' });
    var prev1 = new Element('div',  { class: 'preview' });
        inner.adopt(items);
        cell.adopt(inner);
        prev1.adopt(cell);

    // wrappers
    var breakWrap = new Element('div', { class: 'wrap' });
    breakWrap.adopt(breakLeft, prev1, clear.clone());

    win.adopt(breakHead, breakWrap, clear);

    // typing events
    var updatePreviews = function () {
        prev1.getElement('.notes-items').setProperty('html', replaceNewlines(breakArea.value));
    };
    win.updatePreviews = updatePreviews;
    breakArea.addEvent('input', updatePreviews);

    return win;
}

function saveCellNotes () {
    var win = document.getElement('.admin-window.editor');
    if (!win || !win.td) return;

    // find inputs
    var area = win.getElement('textarea');
    var newNotes = area.value;

    // update database
    // TODO

    // update calendar
    win.td.getElement('.notes-items').setProperty('html', replaceNewlines(newNotes));

    return true;
}
