document.addEvent('domready', initializeMenuEditor);

function initializeMenuEditor() {
    
    // listen for clicks on the calendar days
    $$('table.lunch-calendar tbody td').each(function (td) {
        td.addEvent('click', function (e) {
            e.preventDefault();
            var menuDay = new MenuDay(2015, 2, 22);
            showMenuEditor(menuDay);
        });
    });
    
    // done button click
    var doneBut = $('menu-editor-done');
    doneBut.addEvent('click', function (e) {
        e.preventDefault();
        doneBut.retrieve('menuDay').update();
        hideMenuEditor();
    });
    
}

function showMenuEditor(menuDay) {
    var overlay   = $('menu-editor-overlay'),
        titleBar  = $('menu-editor-title').getElementsByTagName('span')[0],
        doneBut   = $('menu-editor-done'),
        breakfast = $('breakfast-textarea'),
        lunch     = $('lunch-textarea'),
        salad     = $('salad-input');
    
    // set title and store day for done button
    titleBar.innerText = menuDay.prettyName();
    doneBut.store('menuDay', menuDay);
    
    // add the data
    if (menuDay.breakfast.length)
        breakfast.innerText = menuDay.breakfast;
    if (menuDay.lunch.length)
        lunch.innerText = menuDay.lunch;
    if (menuDay.salad.length)
        salad.setAttribute('value', menuDay.salad);
    
    // show
    overlay.setStyle('display', 'block');
    
    // if breakfast is empty, probably adding a new day; focus it.
    if (!breakfast.innerText.length)
        breakfast.focus();
    
}

function hideMenuEditor() {
    $('menu-editor-overlay').setStyle('display', 'none');
}