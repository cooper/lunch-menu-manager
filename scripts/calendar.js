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
        this.shortName() + ', ' + this.year;
    },
    
    // short date name
    // e.g. March 22
    shortName: function () {
        return months[this.month] + ' ' + this.day;
    }
    
});