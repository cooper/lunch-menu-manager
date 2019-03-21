document.addEvent('domready', fetchCalendar);
document.addEvent('domready', createMenuDays);

var months = [
    'January',   'February', 'March',    'April',
    'May',       'June',     'July',     'August',
    'September', 'October',  'November', 'December'
], weekdays = [
    'Sunday',   'Monday',   'Tuesday',  'Wednesday',
    'Thursday', 'Friday',   'Saturday'
];

var MenuDay = new Class({

    initialize: function (year, month, day) {
        this.year  = year;
        this.month = month;
        this.day   = day;
        this.date  = new Date(year, month, day);
        this.breakfast = '';
        this.lunch     = '';
    },

    // property breakfast
    // property lunch

    // save the menu for this day
    // using Request API
    update: function () {
        statusLoading();
        var request = new Request.JSON({
            url: 'functions/update-menu.php',
            onSuccess: function (data) {
                if (data.error) {
                    statusError(data.error);
                    presentAlert('Error',
                        'Failed to save recent changes. Please reload the ' +
                        'page. Error: ' + data.error
                    );
                }
                else {
                    statusSuccess();
                }
            },
            onError: function (text, error) {
                statusError(error);
                presentAlert('Error',
                    'Failed to save recent changes. Please reload the page. ' +
                    'Error: ' + error
                );
            }
        }).post({
            year:       this.year,
            month:      this.month + 1,
            day:        this.day,
            breakfast:  this.breakfast,
            lunch:      this.lunch
        });
    },

    // pretty date name
    // e.g. Monday, March 14, 2016
    prettyName: function () {
        return this.weekdayName() + ', ' + this.shortName() + ', ' + this.year;
    },

    // short date name
    // e.g. March 22
    shortName: function () {
        return months[this.month] + ' ' + this.day;
    },

    // weekday name
    // e.g. Monday
    weekdayName: function () {
        return weekdays[this.date.getDay()]
    },

    // date string for API
    // e.g. 3-9-1997
    apiDateString: function () {
        return (this.month + 1) + '-' + this.day + '-' + this.year;
    },

    // text for the calendar view
    // if in breakfast mode, returns breakfast
    // if in lunch mode, returns lunch
    displayText: function () {
        return getCurrentMode() == 'breakfast' ? this.breakfast : this.lunch;
    }

});

function getCurrentMode() {
    if (document.getElement('.lunch-calendar').hasClass('mode-breakfast'))
        return 'breakfast';
    return 'lunch';
}

function getCurrentYear() {
    return document.getElement('.lunch-calendar').data('year');
}

function getCurrentMonth() {
    return document.getElement('.lunch-calendar').data('month');
}

function getCurrentMonthName() {
    return months[ getCurrentMonth() - 1 ];
}

function isAdmin() {
    return document.getElement('.lunch-calendar').hasClass('administrator');
}

function fetchCalendar() {
    var request = new Request.JSON({
        url: 'api/fetch-month.php',
        onSuccess: injectCalendarData
    }).get({
        year:  getCurrentYear(),
        month: getCurrentMonth()
    });
}

// create menu day objects
function createMenuDays() {
    var previousDay;
    $$('table.lunch-calendar tbody td').each(function (td) {

        // fake day
        if (!td.data('year'))
            return;

        // create menu day object
        var menuDay = new MenuDay(
            td.data('year'),
            td.data('month') - 1,
            td.data('day')
        );
        menuDay.td = td;
        menuDay.menuItems = td.getElement('.menu-items');
        td.store('menuDay', menuDay);

        // relative days
        if (previousDay) {
            menuDay.previousDay = previousDay;
            previousDay.nextDay = menuDay;
        }
        previousDay = menuDay;

    });
}

var currentNotes, currentTopLeft;
function injectCalendarData(data) {

    // notes for the month
    if (typeof data.notes != 'undefined' && data.notes.length)
        currentNotes = data.notes;
    else
        currentNotes = undefined;


    // top left
    if (typeof data.topLeft != 'undefined' && data.topLeft.length)
        currentTopLeft = data.topLeft;
    else
        currentTopLeft = undefined;

    // update each menu day
    $$('table.lunch-calendar tbody td').each(function (td) {
        var menuDay = td.retrieve('menuDay');

        // no menu day? this cell might have other notes.
        if (!menuDay) {
            var name = 'note-' + getCurrentMonth() + '-' +
                td.data('cell') + '-' + getCurrentYear();
            if (data[name])
                td.store('cellNotes', data[name].notes);
            return;
        }

        // inject meal info
        var dayData = data[menuDay.apiDateString()];
        if (!dayData) return;
        ['breakfast', 'lunch'].each(function (i) {
            menuDay[i] = !dayData[i] ? '' : dayData[i];
        });

    });

    // refresh the displayed menu
    refreshCalendar();

}

function getCalendarNotes() {
    var notes = window.currentNotes || '';
    return notes
}

function replaceNewlines(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/\n/g, '<br />');
}

// refresh the calendar for the current mode
function refreshCalendar() {

    // notes for the month
    var menuNotes = $('menu-notes-notes');
    if (typeof currentNotes != 'undefined') {

        var notes = replaceNewlines(currentNotes);
        if (isAdmin() && (!notes || !notes.length))
            notes = '(no footer text)';

        menuNotes.setProperty('html', notes);
    }

    // top left
    var captionLeft = $('caption-left');
    if (typeof currentTopLeft != 'undefined') {
        if (currentTopLeft.length)
            captionLeft.setStyle('opacity', 1);
        captionLeft.setProperty('text', currentTopLeft);
    }
    else {
        captionLeft.setStyle('opacity', 0);
    }

    // update menu text
    $$('table.lunch-calendar tbody td').each(function (td) {
        var menuDay   = td.retrieve('menuDay'),
            cellNotes = td.retrieve('cellNotes');
        if (!menuDay) {
            if (typeof cellNotes == 'string' && cellNotes.length)
                td.getElement('.notes-items').setProperty('html',
                    replaceNewlines(cellNotes));
            return;
        }
        else {
            menuDay.menuItems.setProperty('html',
                replaceNewlines(menuDay.displayText()));
        }
    });

}
