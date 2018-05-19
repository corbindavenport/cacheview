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
    if (document.getElementById("address").value != "") {
        var url = "http://webcache.googleusercontent.com/search?q=cache:" + document.getElementById("address").value;
        window.open(url);
    } else {
        alert("Enter a web address first!")
    }
}

// Google AMP

document.getElementById("google-amp").onclick = function () {
    if (document.getElementById("address").value != "") {
        // Create the window first, because creating it later will trigger a popup block
        var ampWindow = window.open();
        ampWindow.document.write("<html><head><title>AMP</title><meta name='viewport' content='width=400, initial-scale=1'></head><body><h1 style='font-family: Arial; text-align: center; margin-top:20%;'>Loading...</h1></body></html>");
        $.get("https://cors-anywhere.herokuapp.com/" + document.getElementById("address").value, function(data) {
            if ($(data).filter('link[rel="amphtml"]').attr("href") != undefined) {
                var url = $(data).filter('link[rel="amphtml"]').attr("href");
                // Convert scheme-relative URLs into HTTPS URLs
                if (url.startsWith("//")) {
                    url = url.replace("//", "https://");
                    console.log(url);
                }
                try {
                    var canonical = new URL(url);
                }
                catch(err) {
                    ampWindow.close();
                    alert("Unable to load AMP URL: " + url);
                    return;
                }
                // Create AMP link
                var ampDomain = canonical.hostname.replace(/\./g, "-");
                var amp = "https://" + ampDomain + ".cdn.ampproject.org/v/" + canonical.hostname + canonical.pathname + "?amp_js_v=a1";
                // Load AMP page in Window
                ampWindow.location.href = amp;
            } else {
                ampWindow.close();
                alert("An AMP version of this page is not available.");
            }
        });
    } else {
        alert("Enter a web address first!")
    }
}

// Archive.org

document.getElementById("archive-org").onclick = function () {
    if (document.getElementById("address").value != "") {
        var url = "https://web.archive.org/web/" + document.getElementById("address").value;
        window.open(url);
    } else {
        alert("Enter a web address first!")
    }
}