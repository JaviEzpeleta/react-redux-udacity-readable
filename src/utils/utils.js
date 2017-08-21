export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getColorClassForVoteScore = (voteScore) => {
  if (voteScore > 10) return 'is-success'
  if (voteScore > 5) return 'is-info'
  if (voteScore === 0) return 'is-warning'
  if (voteScore < 0) return 'is-danger'
  return 'is-primary'
}

export const getNotificationColorByIndex = (index) => {
  const colorsForTheCategories = ['is-primary', 'is-info', 'is-success', 'is-waring', 'is-danger']
  return colorsForTheCategories[index % 5]
}

export const showDate = (timestamp) => {
  var a = new Date(timestamp);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  hour = ('00'+hour).slice(-2);
  var min = a.getMinutes();
  min = ('00'+min).slice(-2);
  // var sec = a.getSeconds();
  // sec = ('00'+sec).slice(-2);
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min /*+ ':' + sec */;
  return time;
}

export const objectToArray = (obj) => Object.keys(obj).map( (key) => obj[key] )

export const sortByScore = (a, b) => {
  if (a.voteScore > b.voteScore)
    return -1;
  if (a.voteScore < b.voteScore)
    return 1;
  return 0;
}

export const sortByDate = (a, b) => {
  if (a.timestamp > b.timestamp)
    return -1;
  if (a.timestamp < b.timestamp)
    return 1;
  return 0;
}
