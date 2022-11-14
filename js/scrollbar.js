
window.addEventListener('load', function() {
    OverlayScrollbars(document.getElementById('donate-list'), {
        className       : "os-theme-dark",
        sizeAutoCapable : true,
        paddingAbsolute : true,
        scrollbars : {
            clickScrolling : true
        }
    });
    OverlayScrollbars(document.getElementById('goal-list'), {
        className       : "os-theme-dark",
        sizeAutoCapable : true,
        paddingAbsolute : true,
        scrollbars : {
            clickScrolling : true
        }
    });
})
