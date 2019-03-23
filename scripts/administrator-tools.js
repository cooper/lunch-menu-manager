document.addEvent('domready', initializeAdministatorTools);

// escape from print
document.addEvent('keydown', function (e) {
    if (e.event) e = e.event;
    if (e.keyCode == 27)
        closeWindow();
});

var printingInstructions = '                            \
    Your PDF menu was generated.                        \
    You can now print it by opening it in PDF reader    \
    software. From there,                               \
    choose Print from the File menu.                    \
';

var sharingInstructions = '                             \
    Your PDF menu was generated.                        \
    You can now share it by attaching the PDF file      \
    to an e-mail.                                       \
';

var footerNotes = '                                     \
This text will be displayed in the footer of the        \
calendar for the selected month. Printed menus may      \
span two pages if these footnotes exceed five lines.    \
';

var institutionNotes = '                                \
This text will be displayed in the upper left of the    \
calendar. It is useful for the name of the cafeteria or \
institution. Changes are applied to all months.         \
';

function initializeAdministatorTools() {
    var calendar = document.getElement('.lunch-calendar');

    // if a window is open on unload, ask to close it.
    document.body.onbeforeunload = function () {
        var win = document.getElement('.admin-window');
        if (win && !win.hasClass('download'))
            return 'Be sure to click "DONE" to save current changes!';
    };

    // toggle between breakfast and lunch
    $('calendar-mode-container').addEvents({
        mouseenter: function () {
            $('calendar-mode-toggle').setStyle('display', 'block');
        },
        mouseleave: function () {
            $('calendar-mode-toggle').setStyle('display', 'none');
        },
        click: function (e) {
            e.preventDefault();
            var oldMode = getCurrentMode();
            var newMode = oldMode == 'lunch' ? 'breakfast' : 'lunch';
            calendar.removeClass('mode-' + oldMode);
            calendar.addClass('mode-' + newMode);
            refreshCalendar();

            // update displayed mode
            var ucfirst1 = oldMode.charAt(0).toUpperCase() + oldMode.substr(1),
                ucfirst2 = newMode.charAt(0).toUpperCase() + newMode.substr(1);
            if ($('calendar-mode'))
                $('calendar-mode').setProperty('text', ucfirst2 + ' menu');

        }
    });

    // institution name edit
    $('calendar-name-container').addEvents({
        mouseenter: function () {
            $('calendar-name-edit').setStyle('display', 'block');
        },
        mouseleave: function () {
            $('calendar-name-edit').setStyle('display', 'none');
        },
        click: showInstitutionEditor
    });


    // footer notes edit
    $('menu-notes').addEvents({
        mouseenter: function () {
            $('menu-notes-edit').setStyle('display', 'block');
        },
        mouseleave: function () {
            $('menu-notes-edit').setStyle('display', 'none');
        },
        click: showNotesEditor
    });

    // print button click
    $('print-button').addEvent('click', function (e) {
        e.preventDefault();
        printOrShare(printingInstructions);
    });

    // share button click
    $('email-button').addEvent('click', function (e) {
        e.preventDefault();
        printOrShare(sharingInstructions);
    });

}

/*##################
### PDF DOWNLOAD ###
##################*/

function printOrShare(msg) {
    statusLoading();
    var request = new Request.JSON({
        url: 'functions/generate-pdf.php',
        onSuccess: function (data) {
            presentAlert('Menu generated', msg).addClass('download');
            window.location = data.generator;
            statusSuccess();
        },
        onFailure: function (error) {
            presentAlert('Error',
                'Failed to generate PDF. Please reload the page. ' +
                'Error: ' + error
            );
            statusError(error);
        }
    }).get({
        year:   getCurrentYear(),
        month:  getCurrentMonth(),
        mode:   getCurrentMode()
    });
}

/*#################
### INSTITUTION ###
#################*/

function showInstitutionEditor(e) {
    if (e) e.preventDefault();

    var win     = createWindow('Institution name');
    var padding = new Element('div', {
        class: 'admin-window-padding',
        text:  institutionNotes
    });
    var input = new Element('input', {
        type: 'text',
        value: currentTopLeft
    });

    padding.adopt(input);
    win.adopt(padding);
    win.addClass('notes-editor');
    win.beforeClose = saveTopLeft;

    presentAnyWindow(win);
}

function saveTopLeft() {
    var win = document.getElement('.admin-window.notes-editor');
    var topLeft = win.getElement('input').getProperty('value');

    // no change?
    if (window.currentTopLeft == topLeft)
        return false;
    window.currentTopLeft = topLeft;

    statusLoading();
    var request2 = new Request.JSON({
        url: 'functions/update-top.php',
        onSuccess: function (data) {
            statusSuccess();
            console.log(data);
        },
        onFailure: function (error) {
            statusError(error);
            presentAlert('Error',
                'Failed to update institution name. Please reload the page. ' +
                'Error: ' + error
            );
        }
    }).post({
        notes: topLeft
    });

    refreshCalendar();
    return true;
}

/*##################
### FOOTER NOTES ###
##################*/

function showNotesEditor(e) {
    if (e) e.preventDefault();

    var win     = createWindow('Footnotes');
    var padding = new Element('div', {
        class: 'admin-window-padding',
        text:  footerNotes
    });
    var area    = new Element('textarea', { value: currentNotes });

    padding.adopt(area);
    win.adopt(padding);
    win.addClass('notes-editor');
    win.beforeClose = saveNotes;

    presentAnyWindow(win);
}

function saveNotes() {
    var win = document.getElement('.admin-window.notes-editor');
    var notes = win.getElement('textarea').getProperty('value');

    // no change?
    if (window.currentNotes == notes)
        return;
    window.currentNotes = notes;

    statusLoading();
    var request = new Request.JSON({
        url: 'functions/update-notes.php',
        onSuccess: function (data) {
            statusSuccess();
            console.log(data);
        },
        onFailure: function (error) {
            statusError(error);
            presentAlert('Error',
                'Failed to update footer text. Please reload the page. ' +
                'Error: ' + error
            );
        }
    }).post({
        year:   getCurrentYear(),
        month:  getCurrentMonth(),
        notes:  notes
    });

    refreshCalendar();
    return true;
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
    $('status-icon').setProperty('class',
        'fa fa-spin fa-circle-o-notch center');
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
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

/*#############
### WINDOWS ###
#############*/

function createWindow (titleText) {
    var win = new Element('div', { class: 'admin-window' });

    // title bar
    var title = new Element('h2',   { class: 'admin-window-title'   });
    var span  = new Element('span', { text: titleText               });
    var done  = new Element('a',    {
        class:  'admin-window-done',
        href:   '#',
        text:   'Done'
    });
    done.addEvent('click', closeWindow);
    title.adopt(span, done);
    win.adopt(title);

    return win;
}

// shortcut for simple text alerts
function presentAlert (title, msg) {
    var win = createWindow(title);
    var padding = new Element('div', {
        class:  'admin-window-padding',
        text:   msg
    });
    win.adopt(padding);
    presentAnyWindow(win);
    return win;
}

var presentedWindow;

// present a window atop an overlay
function presentAnyWindow (win) {
    if (presentedWindow == win) return;
    if (presentedWindow) closeWindow();

    var overlay = new Element('div', { class: 'admin-overlay' });
    overlay.adopt(win);
    document.body.adopt(overlay);
    overlay.setStyle('display', 'block');

    presentedWindow = win;
    return true;
}

// close the current window
function closeWindow (e) {
    if (e) e.preventDefault();
    if (!presentedWindow) return;

    // do something first
    var beforeClose = presentedWindow.beforeClose;
    if (beforeClose) beforeClose();

    // destroy the window
    presentedWindow.parentElement.destroy();
    presentedWindow = null;

}
