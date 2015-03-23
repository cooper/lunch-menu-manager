document.addEvent('domready', initializeMenuEditor);

function initializeMenuEditor() {
    
    // listen for clicks on the calendar days
    var previousDay;
    $$('table.lunch-calendar tbody td').each(function (td) {
        var notADay = typeof td.data('year') == 'undefined';
        
        var menuDay;
        if (!notADay) menuDay = new MenuDay(
            td.data('year'),
            td.data('month') - 1,
            td.data('day')
        );
        
        td.addEvent('click', function (e) {
            e.preventDefault();
            
            // ignore blank days
            if (notADay)
                return;

            showMenuEditor(menuDay);
        });
        
        // relative days
        if (menuDay && previousDay) {
            menuDay.previousDay = previousDay;
            previousDay.nextDay = menuDay;
        }
        previousDay = menuDay;
        
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
        salad     = $('salad-input'),
        leftArr   = $('menu-left-arrow'),
        rightArr  = $('menu-right-arrow');
    
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
    if (!breakfast.innerText.length)
        breakfast.focus();
    
}

function hideMenuEditor() {
    $('menu-editor-overlay').setStyle('display', 'none');
}