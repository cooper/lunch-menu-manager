document.addEvent('domready', initializeAdministatorTools);

function initializeAdministatorTools() {
    var calendar = $$('.lunch-calendar')[0];
    
    // trigger between breakfast and lunch
    $('mode-trigger').addEvent('click', function (e) {
        e.preventDefault();
        var oldMode = getCurrentMode();
        var newMode = oldMode == 'lunch' ? 'breakfast' : 'lunch';
        calendar.removeClass('mode-' + oldMode);
        calendar.addClass('mode-' + newMode);
        refreshCalendar();
        
        // update displayed mode
        var ucfirst1 = oldMode.charAt(0).toUpperCase() + oldMode.substr(1),
            ucfirst2 = newMode.charAt(0).toUpperCase() + newMode.substr(1);
        $('mode-trigger').innerText = ucfirst1;
        $('caption-mode').innerText = ucfirst2;
        
    });
    
    // print button click
    var overlay = $('admin-overlay');
    $('print-button').addEvent('click', function (e) {
        e.preventDefault();
        overlay.setStyle('display', 'block');
    });
    
    
    // done button click
    $('admin-window-done').addEvent('click', function (e) {
        e.preventDefault();
        overlay.setStyle('display', 'none');
    });
    
}