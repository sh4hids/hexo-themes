(function($) {

  function toBengaliNum(t) {
    var r = {
      0: "০",
      1: "১",
      2: "২",
      3: "৩",
      4: "৪",
      5: "৫",
      6: "৬",
      7: "৭",
      8: "৮",
      9: "৯",
      ".": ".",
      "-": "-"
    };
    if (isNaN(parseFloat(t)) || isNaN(t - 0))
      return "Invalid input type";
    var i = "";
    return (t.toString().split("").forEach(function(t) {
      return (i += r[t]);
    }), i);
  }

  var config = {
    apiKey: "AIzaSyDxjeY8j3iuVtNnxZInXq5--NrduBbw6pA",
    authDomain: "prozuktischool-analytics.firebaseapp.com",
    databaseURL: "https://prozuktischool-analytics.firebaseio.com",
    projectId: "prozuktischool-analytics",
    storageBucket: "prozuktischool-analytics.appspot.com",
    messagingSenderId: "834432059721"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var oriUrl = window.location.host;
  var curUrl = oriUrl + window.location.pathname;
  function readVisits(url, selector) {
    var db_key = decodeURI(url.replace(new RegExp('\\/|\\.', 'g'), "_"));
    database.ref(db_key).once("value").then(function(result) {
      var count = parseInt(result.val() || 0) + 1;
      var countBn = toBengaliNum(count);
      if (url.indexOf("localhost:4000") === -1) {
        database.ref(db_key).set(count);
      }
      if (selector.length > 0) {
        selector.html(countBn);
      };
    });
  }
  readVisits(oriUrl, $("#visits .count"));
  if (curUrl && curUrl != "_") {
    readVisits("page/" + curUrl, $("#pageviews .count"));
  }
})(jQuery);
