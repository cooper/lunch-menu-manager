document.addEvent('domready', initializeMenuEditor);

document.addEvent('keydown', function (e) {
    if (e.event) e = e.event;
    if (e.keyCode == 27) hideMenuEditor();
});

function initializeMenuEditor() {
    
    // listen for clicks on the calendar days
    var previousDay;
    $$('table.lunch-calendar tbody td').each(function (td) {
        if (!td.data('year'))
            return;
        
        var menuDay = new MenuDay(
            td.data('year'),
            td.data('month') - 1,
            td.data('day')
        );
        
        td.addEvent('click', function (e) {
            showMenuEditor(menuDay);
        });
        
        // relative days
        if (previousDay) {
            menuDay.previousDay = previousDay;
            previousDay.nextDay = menuDay;
        }
        previousDay = menuDay;
        
    });
    
    // done button click
    var doneBut = $('menu-editor-done');
    doneBut.addEvent('click', function (e) {
        e.preventDefault();
        hideMenuEditor();
    });
    

    // left arrow click
    $('menu-left-arrow').addEvent('click', function (e) {
        e.preventDefault();
        var menuDay = doneBut.retrieve('menuDay');
        updateMenuEditor();
        if (menuDay && menuDay.previousDay)
            showMenuEditor(menuDay.previousDay);
    });
    
    // right arrow click
    $('menu-right-arrow').addEvent('click', function (e) {
        e.preventDefault();
        updateMenuEditor();
        var menuDay = doneBut.retrieve('menuDay');
        if (menuDay && menuDay.nextDay)
            showMenuEditor(menuDay.nextDay);
    });
    
}

function showMenuEditor(menuDay) {
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
    menuDay.breakfast = breakfast.value;
    menuDay.lunch = lunch.value;
    menuDay.salad = salad.value;
    if (menuDay)
        menuDay.update();
}

function hideMenuEditor() {
    updateMenuEditor();
    $('menu-editor-overlay').setStyle('display', 'none');
}