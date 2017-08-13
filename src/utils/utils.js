export const generateUUID = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getNotificationColorByIndex = (index) => {
  const colorsForTheCategories = ['is-primary', 'is-info', 'is-success', 'is-waring', 'is-danger']
  return colorsForTheCategories[index % 5]
}

export const showDate = (timestamp) => {
  var a = new Date(timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
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
