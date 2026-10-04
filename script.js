function visibility_on(id) {
    var e = document.getElementById(id + "_text");
    if (e.style.display == 'none')
        e.style.display = 'block';
    var e = document.getElementById(id + "_img");
    if (e.style.display == 'none')
        e.style.display = 'block';
}

function visibility_off(id) {
    var e = document.getElementById(id + "_text");
    if (e.style.display == 'block')
        e.style.display = 'none';
    var e = document.getElementById(id + "_img");
    if (e.style.display == 'block')
        e.style.display = 'none';
}

function toggle_visibility(id) {
    var e = document.getElementById(id + "_text");
    if (e.style.display == 'inline')
        e.style.display = 'block';
    else
        e.style.display = 'inline';
    var e = document.getElementById(id + "_img");
    if (e.style.display == 'inline')
        e.style.display = 'block';
    else
        e.style.display = 'inline';
}

function toggle_vis(id) {
    var e = document.getElementById(id);
    if (e.style.display == 'none')
        e.style.display = 'inline';
    else
        e.style.display = 'none';
}

function trackCustomEvent(eventName, eventData) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Open publication link buttons in a new tab (skip placeholder "#" links)
    document.querySelectorAll('.pub-links a:not([href="#"])').forEach(function(a) {
        a.target = '_blank';
        a.rel = 'noopener';
    });

    // Track PDF downloads
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' && e.target.href.endsWith('.pdf')) {
            trackCustomEvent('pdf_download', {
                event_category: 'engagement',
                event_label: e.target.href.split('/').pop()
            });
        }
    });
    

    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' && e.target.hostname !== window.location.hostname) {
            trackCustomEvent('external_link_click', {
                event_category: 'engagement',
                event_label: e.target.href
            });
        }
    });
});