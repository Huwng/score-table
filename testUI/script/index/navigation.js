(function () {
    const remote = getRemote()
    const crrWindow = remote.getCurrentWindow()
    // handle button more
    let btn_more = _$('#app-morebtn')
    let sidebar = _$('#app-sidebar')
    el_click(btn_more, function () {
        if (btn_more.classList.contains('active')) {
            btn_more.classList.remove('active')
            sidebar.classList.remove('active')
        } else {
            btn_more.classList.add('active')
            sidebar.classList.add('active')
        }
    })
    // handle button minimize
    let btn_close = _$('#app-close')
    el_click(btn_close, function () {
        _$('#float-close').classList.add('active')
    })
    // handle button minimize
    let btn_min = _$('#app-minimize')
    el_click(btn_min, function () {
        crrWindow.minimize()
    })
    // handle maximize button
    let btn_max = _$('#app-maximize')
    el_click(btn_max, function () {
        if (btn_max.classList.contains('maximized')) {
            crrWindow.restore()
            btn_max.classList.remove('maximized')
        } else {
            crrWindow.maximize()
            btn_max.classList.add('maximized')
        }
    })
    // handle float close menu
    el_click(_$('#float-close').children[0], function() {
        beforeQuit()
        remote.app.quit()
    })
    el_click(_$('#float-close').children[1], function() {
        _$('#float-close').classList.remove('active')
    })
}).call(this)