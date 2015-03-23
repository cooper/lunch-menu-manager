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
    
    // update the menu for this day
    // using Request API
    update: function () {
        var request = new Request.JSON({
            url: 'update-menu.php',
            onSuccess: function (data) {
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
    // e.g. March 22, 2015
    prettyName: function () {
        return this.shortName() + ', ' + this.year;
    },
    
    // short date name
    // e.g. March 22
    shortName: function () {
        return months[this.month] + ' ' + this.day;
    },
    
    // text for the calendar view
    // if in breakfast mode, returns breakfast
    // if in lunch mode, returns lunch
    displayText: function () {
        return getCurrentMode() == 'breakfast' ? this.breakfast : this.lunch;
    }
    
});

function getCurrentMode() {
    if ($$('.lunch-calendar')[0].hasClass('mode-breakfast'))
        return 'breakfast';
    return 'lunch';
}

// refresh the calendar items
function refreshCalendar() {
    $$('table.lunch-calendar tbody td').each(function (td) {
        var menuDay = td.retrieve('menuDay');
        if (!menuDay) return;
        menuDay.menuItems.value = menuDay.displayText();
    });
}