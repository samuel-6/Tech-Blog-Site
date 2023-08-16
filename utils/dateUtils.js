const moment = require('moment');

function formatDate(date) {

    return moment(date).format('MMMM Do YYYY, h:mm:ss a');

}

module.exports = {

    formatDate
    
}