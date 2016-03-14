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

function showMenuEditor(menuDay) {
    presentEditor(menuDay);
    return;

    var overlay   = $('menu-editor-overlay'),
        titleBar  = $('menu-editor-title').getElementsByTagName('span')[0],
        doneBut   = $('menu-editor-done'),
        breakfast = $('breakfast-textarea'),
        lunch     = $('lunch-textarea'),
        salad     = $('salad-input'),
        leftArr   = $('menu-left-arrow'),
        rightArr  = $('menu-right-arrow');

    // set title and store day for done button
    titleBar.innerText = menuDay.prettyName();
    doneBut.store('menuDay', menuDay);

    // add the data
    breakfast.value = menuDay.breakfast;
    lunch.value = menuDay.lunch;
    salad.value = menuDay.salad;

    // back arrow
    if (menuDay.previousDay) {
        leftArr.innerHTML = '&larr; ' + menuDay.previousDay.shortName();
        leftArr.setStyle('display', 'block');
    }
    else {
        leftArr.setStyle('display', 'none');
    }

    // forward arrow
    if (menuDay.nextDay) {
        rightArr.innerHTML = menuDay.nextDay.shortName() + ' &rarr;';
        rightArr.setStyle('display', 'block');
    }
    else {
        rightArr.setStyle('display', 'none');
    }

    // show
    overlay.setStyle('display', 'block');

    // if breakfast is empty, probably adding a new day; focus it.
    if (!breakfast.value.length)
        breakfast.focus();

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

    var left  = new Element('div', { class: 'left-side' });
    var right = new Element('div', { class: 'right-side' });
    var clear = new Element('div', { styles: { clear: 'both' } });

    // headings
    var lunchHead = new Element('h3', { text: 'Lunch' })
    var breakHead = new Element('h3', { text: 'Breakfast' });
    var prevHead1 = new Element('h3', { text: 'Preview' });
    var prevHead2 = prevHead1.clone();

    // textareas
    var lunchArea = new Element('textarea');
    var breakArea = new Element('textarea');

    // previews
    var prev1 = new Element('div', { class: 'preview' });
    var prev2 = prev1.clone();

    left.adopt(breakHead, breakArea, lunchHead, lunchArea);
    right.adopt(prevHead1, prev1, prevHead2, prev2);
    win.adopt(left, right, clear);

    return win;
}

function presentEditor (menuDay) {
    var win = createEditorWindow();
    presentAnyWindow(win);
}
