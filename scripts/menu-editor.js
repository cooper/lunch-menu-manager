document.addEvent('domready', initializeMenuEditor);

function initializeMenuEditor() {
    
    // listen for clicks on the calendar days
    $$('table.lunch-calendar tbody td').each(function (td) {
        td.addEvent('click', function () {
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
    var overlay  = $('menu-editor-overlay'),
        titleBar = $('menu-editor-title').getElementsByTagName('span')[0],
        doneBut  = $('menu-editor-done');
    titleBar.innerText = menuDay.prettyName();
    doneBut.store('menuDay', menuDay);
    overlay.setStyle('display', 'block');
}

function hideMenuEditor() {
    var overlay = $$('.menu-editor-overlay')[0];
    overlay.setStyle('display', 'none');
}