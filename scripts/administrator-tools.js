document.addEvent('domready', initializeAdministatorTools);

// escape from print
document.addEvent('keydown', function (e) {
    if (e.event) e = e.event;
    if (e.keyCode == 27) hideAdminWindow();
});

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
    
    var overlay      = $('admin-overlay'),
        adminWindow  = $('admin-window'),
        printLoading = $('admin-window-padding');
    adminWindow.store('printLoading', printLoading);
    
    // print button click
    $('print-button').addEvent('click', function (e) {
        e.preventDefault();
        overlay.setStyle('display', 'block');
        var request = new Request.JSON({
            url: 'functions/generate-pdf.php',
            onSuccess: function (data) {
                adminWindow.removeChild(printLoading);
                var padded = new Element('div', { id: 'admin-window-padding' });
                padded.innerHTML = '                                \
                <div style="margin-top: 100px;">                    \
                    Your menu was generated.<br />                  \
                    If it was not downloaded automatically,         \
                    click <a href="'+ data.generator +'">here</a>.  \
                </div>                                              \
                ';
                adminWindow.appendChild(padded);
                window.location = data.generator;
            }
        }).get({
            year:   getCurrentYear(),
            month:  getCurrentMonth(),
            mode:   getCurrentMode()
        });
        
    });
    
    
    // done button click
    $('admin-window-done').addEvent('click', function (e) {
        e.preventDefault();
        hideAdminWindow();
    });
    
}

function hideAdminWindow() {
    var printLoading = adminWindow.retrieve('printLoading'),
        adminWindow  = $('admin-window');

    // replace the content with the loading view
    overlay.setStyle('display', 'none');
    adminWindow.removeChild($('admin-window-padding'));
    adminWindow.appendChild(printLoading);
}