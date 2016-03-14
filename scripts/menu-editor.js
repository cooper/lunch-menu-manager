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
        if (!td.data('year'))
            return;

        // add click listener
        var menuDay = td.retrieve('menuDay');
        td.addEvent('click', function (e) {
            e.preventDefault();
            showMenuEditor(menuDay);
        });
    });

    // // done button click
    // var doneBut = $('menu-editor-done');
    // doneBut.addEvent('click', function (e) {
    //     e.preventDefault();
    //     hideMenuEditor();
    // });
    //
    //
    // // left arrow click
    // $('menu-left-arrow').addEvent('click', function (e) {
    //     e.preventDefault();
    //     var menuDay = doneBut.retrieve('menuDay');
    //     updateMenuEditor();
    //     if (menuDay && menuDay.previousDay)
    //         showMenuEditor(menuDay.previousDay);
    // });
    //
    // // right arrow click
    // $('menu-right-arrow').addEvent('click', function (e) {
    //     e.preventDefault();
    //     updateMenuEditor();
    //     var menuDay = doneBut.retrieve('menuDay');
    //     if (menuDay && menuDay.nextDay)
    //         showMenuEditor(menuDay.nextDay);
    // });

}

// function showMenuEditor(menuDay) {
//     presentEditor(menuDay);
//     return;
//
//     var overlay   = $('menu-editor-overlay'),
//         titleBar  = $('menu-editor-title').getElementsByTagName('span')[0],
//         doneBut   = $('menu-editor-done'),
//         breakfast = $('breakfast-textarea'),
//         lunch     = $('lunch-textarea'),
//         salad     = $('salad-input'),
//         leftArr   = $('menu-left-arrow'),
//         rightArr  = $('menu-right-arrow');
//
//
//     // back arrow
//     if (menuDay.previousDay) {
//         leftArr.innerHTML = '&larr; ' + menuDay.previousDay.shortName();
//         leftArr.setStyle('display', 'block');
//     }
//     else {
//         leftArr.setStyle('display', 'none');
//     }
//
//     // forward arrow
//     if (menuDay.nextDay) {
//         rightArr.innerHTML = menuDay.nextDay.shortName() + ' &rarr;';
//         rightArr.setStyle('display', 'block');
//     }
//     else {
//         rightArr.setStyle('display', 'none');
//     }
//
//     // show
//     overlay.setStyle('display', 'block');
//
//     // if breakfast is empty, probably adding a new day; focus it.
//     if (!breakfast.value.length)
//         breakfast.focus();
//
// }

function showMenuEditor (menuDay) {
    // TODO: save the other info first
    var win = document.getElement('.admin-window.editor');
    if (!win) win = createEditorWindow();

    // find inputs
    var saladInput = win.getElement('input');
    var textareas  = win.getElements('textarea');
    var breakArea  = textareas[0], lunchArea = textareas[1];

    // set title and store day
    win.getElement('h2').setProperty('text', menuDay.prettyName());
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

    // if breakfast is empty, probably adding a new day; focus it
    if (!breakArea.value.length)
        breakArea.focus();

    presentAnyWindow(win);
}

function updateMenuEditor() {
    var menuDay   = $('menu-editor-done').retrieve('menuDay'),
        breakfast = $('breakfast-textarea'),
        lunch     = $('lunch-textarea'),
        salad     = $('salad-input');
    if (!menuDay) return;

    // update the menu day object
    menuDay.breakfast = breakfast.value.trim();
    menuDay.lunch = lunch.value.trim();
    menuDay.salad = salad.value.trim();

    // update in database
    if (menuDay)
        menuDay.update();

    // update calendar
    menuDay.menuItems.setProperty('html', replaceNewlines(menuDay.displayText()));

}

function hideMenuEditor() {
    updateMenuEditor();
    $('menu-editor-overlay').setStyle('display', 'none');
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
