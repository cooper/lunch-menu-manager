document.addEvent('domready', fetchCalendar);
document.addEvent('domready', createMenuDays);
                  
var months = [
    'January',   'February', 'March',    'April',
    'May',       'June',     'July',     'August',
    'September', 'October',  'November', 'December'
];

var MenuDay = new Class({
    
    initialize: function (year, month, day) {
        this.year  = year;
        this.month = month;
        this.day   = day;
        this.date  = new Date(year, month, day);
        this.breakfast = '';
        this.lunch     = '';
        this.salad     = '';
    },
    
    // property breakfast
    // property lunch
    // property salad
    
    // save the menu for this day
    // using Request API
    update: function () {
        var request = new Request.JSON({
            url: 'functions/update-menu.php',
            onSuccess: function (data) {
                if (data.error) alert('Error: ' + data.error);
            },
            onError: function (text, error) {
                alert('An error occured. Please refresh the page. ' + error);
            }
        }).post({
            year:       this.year,
            month:      this.month + 1,
            day:        this.day,
            breakfast:  this.breakfast,
            lunch:      this.lunch,
            salad:      this.salad
        });
    },

    // pretty date name
    // e.g. March 22, 2015
    prettyName: function () {
        return this.shortName() + ', ' + this.year;
    },
    
    // short date name
    // e.g. March 22
    shortName: function () {
        return months[this.month] + ' ' + this.day;
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
        return getCurrentMode() == 'breakfast' ? this.breakfast :
        this.lunch + (this.salad.length ? "\n" + this.salad + ' salad' : '');
    }
    
});

function getCurrentMode() {
    if ($$('.lunch-calendar')[0].hasClass('mode-breakfast'))
        return 'breakfast';
    return 'lunch';
}

function getCurrentYear() {
    return $$('.lunch-calendar')[0].data('year');
}

function getCurrentMonth() {
    return $$('.lunch-calendar')[0].data('month');
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
        menuDay.menuItems = td.getElementsByClassName('menu-items')[0];
        td.store('menuDay', menuDay);
        
        // relative days
        if (previousDay) {
            menuDay.previousDay = previousDay;
            previousDay.nextDay = menuDay;
        }
        previousDay = menuDay;
        
    });
}

var currentNotes = 'Frontier School Corporation is an Equal Opporunity Employer.';
function injectCalendarData(data) {
    
    // notes for the month
    if (typeof data.notes != 'undefined' && data.notes.length)
        currentNotes = data.notes;
    //else
        //currentNotes = undefined;
    
    // update each menu day
    $$('table.lunch-calendar tbody td').each(function (td) {
        var menuDay = td.retrieve('menuDay');
        if (!menuDay) return;
        var dayData = data[menuDay.apiDateString()];
        if (!dayData) return;
        ['breakfast', 'lunch', 'salad'].each(function (i) {
            menuDay[i] = !dayData[i] ? '' : dayData[i];
        });
    });
    
    // refresh the displayed menu
    refreshCalendar();
    
}

// refresh the calendar for the current mode
function refreshCalendar() {
    
    // notes for the month
    if (typeof currentNotes != 'undefined' && currentNotes.length) {
        $('menu-notes').setStyle('display', 'table-row');
        $('menu-notes').innerText = currentNotes;
    }
    else {
        $('menu-notes').setStyle('display', 'none');
    }
    
    // update menu text
    $$('table.lunch-calendar tbody td').each(function (td) {
        var menuDay = td.retrieve('menuDay');
        if (!menuDay) return;
        menuDay.menuItems.innerText = menuDay.displayText();
    });
    
}