module.exports = {
  date: function () {
    var month = " ";

    var date = new Date().getDate();
    var year = new Date().getFullYear();

    switch (new Date().getMonth()) {
      case 0:
        month = "January";
        break;

      case 1:
        month = "February";
        break;

      case 2:
        month = "March";
        break;

      case 3:
        month = "April";
        break;

      case 4:
        month = "May";
        break;

      case 5:
        month = "June";
        break;

      case 6:
        month = "July";
        break;

      case 7:
        month = "August";
        break;

      case 8:
        month = "September";
        break;

      case 9:
        month = "October";
        break;

      case 10:
        month = "November";
        break;

      case 11:
        month = "December";
        break;

      default:
        month = "Error";
    }

    fullDate = "Date : " + date + " " + month + " " + year;
    return fullDate;
  },

  total: function (one, two, three, four, five) {
    var sum = one + two + three + four + five;
    var tot = Math.round(sum/5);
    return tot;
  },
};
