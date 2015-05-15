document.addEvent('domready', initializeAdministatorTools);

// escape from print
document.addEvent('keydown', function (e) {
    if (e.event) e = e.event;
    if (e.keyCode == 27) {
        hideShareWindow();
        hideNotesWindow();
    }
});

var printingInstructions = '                            \
<div style="margin-top: 100px;">                        \
    Your PDF menu was generated.<br />                  \
    You can now print it by opening it in PDF software  \
    such as Adobe Reader or Foxit Reader. From there,   \
    choose Print from the File menu.                    \
</div>                                                  \
';

var sharingInstructions = '                         \
<div style="margin-top: 100px;">                    \
    Your PDF menu was generated.<br />              \
    You can now share it by attaching the PDF file  \
    to an e-mail.                                   \
</div>                                              \
';

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
    
    var overlay      = $('share-overlay'),
        adminWindow  = $('share-window'),
        printLoading = $('share-window-padding');
    adminWindow.store('printLoading', printLoading);
    
    // notes button click
    $('notes-button').addEvent('click', function (e) {
        e.preventDefault();
        showNotesEditor();
    });
    
    // print button click
    $('print-button').addEvent('click', function (e) {
        e.preventDefault();
        printOrShare(printingInstructions);
    });
    $('email-button').addEvent('click', function (e) {
        e.preventDefault();
        printOrShare(sharingInstructions);
    });
    
    // done button click
    $('share-window-done').addEvent('click', function (e) {
        e.preventDefault();
        hideShareWindow();
    });
    
    // done button click
    $('notes-window-done').addEvent('click', function (e) {
        e.preventDefault();
        hideNotesWindow();
    });
    
}

function printOrShare(innerHTML) {
    var overlay      = $('share-overlay'),
        adminWindow  = $('share-window'),
        printLoading = $('share-window-padding');
    
    overlay.setStyle('display', 'block');
    var request = new Request.JSON({
        url: 'functions/generate-pdf.php',
        onSuccess: function (data) {
            console.log(data);
            adminWindow.removeChild(printLoading);
            var padded = new Element('div', { 'class': 'admin-window-padding' });
            padded.innerHTML = innerHTML;
            adminWindow.appendChild(padded);
            console.log('Generator: ' + data.generator);
            window.location = data.generator;
        },
        onFailure: function (error) {
            alert('Please reload the page. Error: ' + error);
        }
    }).get({
        year:   getCurrentYear(),
        month:  getCurrentMonth(),
        mode:   getCurrentMode()
    });
}

function showNotesEditor() {
    var overlay  = $('notes-overlay'),
    adminWindow  = $('notes-window');
    overlay.setStyle('display', 'block');
    
}

function hideShareWindow() {
    var adminWindow  = $('share-window'),
        printLoading = adminWindow.retrieve('printLoading'),
        overlay      = $('share-overlay');

    // replace the content with the loading view
    overlay.setStyle('display', 'none');
    adminWindow.removeChild($('share-window-padding'));
    adminWindow.appendChild(printLoading);
}

function hideNotesWindow() {
    var adminWindow  = $('notes-window'),
        overlay      = $('notes-overlay');

    // replace the content with the loading view
    overlay.setStyle('display', 'none');

    // save it
}