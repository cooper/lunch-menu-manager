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
    $('caption-mode').addEvent('click', function (e) {
        e.preventDefault();
        var oldMode = getCurrentMode();
        var newMode = oldMode == 'lunch' ? 'breakfast' : 'lunch';
        calendar.removeClass('mode-' + oldMode);
        calendar.addClass('mode-' + newMode);
        refreshCalendar();

        // update displayed mode
        var ucfirst1 = oldMode.charAt(0).toUpperCase() + oldMode.substr(1),
            ucfirst2 = newMode.charAt(0).toUpperCase() + newMode.substr(1);
        if ($('caption-mode'))
            $('caption-mode').setProperty('text', ucfirst2 + ' menu');

    });

    var overlay      = $('share-overlay'),
        adminWindow  = $('share-window'),
        printLoading = $('share-window-padding');
    adminWindow.store('printLoading', printLoading);

    // notes button click
    // $('notes-button').addEvent('click', function (e) {
    //     e.preventDefault();
    //     showNotesEditor();
    // });

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

function saveNotes() {
    var overlay  = $('notes-overlay'),
    adminWindow  = $('notes-window');

    var notes = $('notes-window-textarea').getProperty('value');
    window.currentNotes = notes;
    console.log('Saving notes: ' + notes);

    var topLeft = $('notes-window-input').getProperty('value');
    window.currentTopLeft = topLeft;
    console.log('Saving top left: ' + topLeft);

    overlay.setStyle('display', 'block');
    statusLoading();
    var request = new Request.JSON({
        url: 'functions/update-notes.php',
        onSuccess: function (data) {
            statusSuccess();
            console.log(data);
        },
        onFailure: function (error) {
            statusError(error);
            alert('Please reload the page. Error: ' + error);
        }
    }).post({
        year:   getCurrentYear(),
        month:  getCurrentMonth(),
        notes:  notes
    });

    statusLoading();
    var request2 = new Request.JSON({
        url: 'functions/update-top.php',
        onSuccess: function (data) {
            statusSuccess();
            console.log(data);
        },
        onFailure: function (error) {
            statusError(error);
            alert('Please reload the page. Error: ' + error);
        }
    }).post({
        notes: topLeft
    });

    refreshCalendar();
}

function showNotesEditor() {
    var overlay  = $('notes-overlay'),
    adminWindow  = $('notes-window');
    overlay.setStyle('display', 'block');
    $('notes-window-textarea').focus();
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
    saveNotes();
    var adminWindow  = $('notes-window'),
        overlay      = $('notes-overlay');

    // replace the content with the loading view
    overlay.setStyle('display', 'none');
}

/* STATUS */

var permanentFailure = false;
var inProgress = 0;

// increments the activity indicator
function statusLoading() {
    if (permanentFailure) return;

    // already in loading status
    if (inProgress++) return;

    // switch to default style
    $('status-li').setProperty('class', 'logo');

    // hide the span
    $('status-text').setStyle('display', 'none');

    // update the icon
    $('status-icon').setProperty('class', 'fa fa-spin fa-circle-o-notch');
}

// a process succeeded
function statusSuccess() {
    if (permanentFailure) return;

    // still more in progress
    if (--inProgress) return;

    // switch to success style
    $('status-li').setProperty('class', 'saved');

    // update the span
    $('status-text').setStyle('display', 'inline');
    $('status-text').setProperty('html',
        '&nbsp;nbsp;saved at <span style="font-size: small">' +
        formatAMPM(new Date()) +
        '</span>'
    );

    // update the icon
    $('status-icon').setProperty('class', 'fa fa-check-circle');

}

// a process failed
function statusError(error) {
    if (permanentFailure) return;
    permanentFailure = true;

    // switch to failed style
    $('status-li').setProperty('class', 'failed');

    // update the span
    $('status-text').setStyle('display', 'inline');
    $('status-text').setProperty('text', ' ERROR');

    // update the icon
    $('status-icon').setProperty('class', 'fa fa-exclamation-triangle');

}

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
