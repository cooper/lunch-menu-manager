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

    // toggle between breakfast and lunch
    var captionModeContainer = $('caption-mode-container');
    $('caption-mode-container').addEvent('click', function (e) {
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
    captionModeContainer.addEvent('mouseenter', function () {
        $('caption-mode-toggle').setStyle('display', 'block');
    });
    captionModeContainer.addEvent('mouseleave', function () {
        $('caption-mode-toggle').setStyle('display', 'none');
    });

    // institution name edit
    var captionLeftContainer = $('caption-left-container');
    captionLeftContainer.addEvent('click', showNotesEditor);
    captionLeftContainer.addEvent('mouseenter', function () {
        $('caption-name-edit').setStyle('display', 'block');
    });
    captionLeftContainer.addEvent('mouseleave', function () {
        $('caption-name-edit').setStyle('display', 'none');
    });

    // footer notes edit
    var menuNotes = $('menu-notes'), footerEdit = $('menu-notes-edit');
    menuNotes.addEvent('mouseenter', function () {
        footerEdit.setStyle('display', 'block');
    });
    menuNotes.addEvent('mouseleave', function () {
        footerEdit.setStyle('display', 'none');
    });
    menuNotes.addEvent('click', showNotesEditor);

    var overlay      = $('share-overlay'),
        adminWindow  = $('share-window'),
        printLoading = $('share-window-padding');
    adminWindow.store('printLoading', printLoading);

    // print/share button click
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
    $('notes-window-done').addEvent('click', function (e) {
        e.preventDefault();
        hideNotesWindow();
    });

}

/*##################
### PDF DOWNLOAD ###
##################*/

function printOrShare(innerHTML) {
    var overlay      = $('share-overlay'),
        adminWindow  = $('share-window'),
        printLoading = $('share-window-padding');

    overlay.setStyle('display', 'block');
    statusLoading();
    var request = new Request.JSON({
        url: 'functions/generate-pdf.php',
        onSuccess: function (data) {
            statusSuccess();
            console.log(data);
            adminWindow.removeChild(printLoading);
            var padded = new Element('div', { 'class': 'admin-window-padding' });
            padded.innerHTML = innerHTML;
            adminWindow.appendChild(padded);
            console.log('Generator: ' + data.generator);
            window.location = data.generator;
        },
        onFailure: function (error) {
            statusError(error);
            alert('Please reload the page. Error: ' + error);
        }
    }).get({
        year:   getCurrentYear(),
        month:  getCurrentMonth(),
        mode:   getCurrentMode()
    });
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

/*###########
### NOTES ###
###########*/

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

function hideNotesWindow() {
    saveNotes();
    var adminWindow  = $('notes-window'),
        overlay      = $('notes-overlay');

    // replace the content with the loading view
    overlay.setStyle('display', 'none');
}

/*############
### STATUS ###
############*/

var permanentFailure = false;
var inProgress = 0;

// increments the activity indicator
function statusLoading() {
    if (permanentFailure) return;

    // already in loading status
    if (inProgress++) return;

    // switch to default style
    $('status-li').removeProperty('class');

    // hide the span
    $('status-text').setStyle('display', 'none');

    // update the icon
    $('status-icon').setProperty('class', 'fa fa-spin fa-circle-o-notch');
}

// a process succeeded
var switchBack;
function statusSuccess() {
    if (permanentFailure) return;

    // switch back
    if (switchBack) clearTimeout(switchBack);
    switchBack = setTimeout(function () {
        if (inProgress || !$('status-li').hasClass('saved')) return;
        $('status-li').setProperty('class', 'logo');
        switchBack = null;
    }, 5000);

    // still more in progress
    if (--inProgress) return;

    // switch to success style
    $('status-li').setProperty('class', 'saved');

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
