$$('.lunch-calendar')[0]

document.addEvent('domready', initializeAdministatorTools);

function initializeAdministatorTools() {
    $('mode-trigger').addEvent('click', function () {
        var oldMode = getCurrentMode();
        var newMode = oldMode == 'lunch' ? 'breakfast' : 'lunch';
        document.body.removeClass('mode-' + oldMode);
        document.body.addClass('mode-' + newMode);
        refreshCalendar();
    });
}