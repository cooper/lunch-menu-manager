document.addEvent('domready', initializeAdministatorTools);

function initializeAdministatorTools() {
    var calendar = $$('.lunch-calendar')[0];
    $('mode-trigger').addEvent('click', function () {
        var oldMode = getCurrentMode();
        var newMode = oldMode == 'lunch' ? 'breakfast' : 'lunch';
        calendar.removeClass('mode-' + oldMode);
        calendar.addClass('mode-' + newMode);
        refreshCalendar();
        
        var ucfirst = oldMode.charAt(0).toUpperCase() + oldMode.substr(1);
        $('mode-trigger').innerText = ucfirst;
        
    });
}