export function setCookie(c_name, value, expiredays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}

export function getCookie(c_name) {
    var arr, reg = new RegExp("(^| )" + c_name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return (arr[2]);
    } else {
        return null;
    }
}