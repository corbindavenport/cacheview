// Function from: https://stackoverflow.com/a/23945027
function extractHostname(url) {
    var hostname;
    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }
    hostname = hostname.split(':')[0];
    hostname = hostname.split('?')[0];
    return hostname;
}

// Google Cache

document.getElementById("google-cache").onclick = function () {
    var url = document.getElementById("address").value;
    window.location = "http://webcache.googleusercontent.com/search?q=cache:" + url;
}

// Google AMP
document.getElementById("google-amp").onclick = function () {
    $.get("https://cors-anywhere.herokuapp.com/" + document.getElementById("address").value, function(data) {
        if ($(data).filter('link[rel="amphtml"]').attr("href") != undefined) {
            var canonical = new URL($(data).filter('link[rel="amphtml"]').attr("href"));
            // Create AMP link
            var ampDomain = canonical.hostname.replace(/\./g, "-");
            var amp = "https://" + ampDomain + ".cdn.ampproject.org/v/" + canonical.hostname + canonical.pathname + "?amp_js_v=a1";
            window.location = amp;
        } else {
            alert("An AMP version of this page is not available.")
        }
    });
}

// Archive.org

document.getElementById("archive-org").onclick = function () {
    var url = document.getElementById("address").value;
    window.location = "https://web.archive.org/web/" + url;
}