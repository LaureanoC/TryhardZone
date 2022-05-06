const validarLocation = () => {
    let url = window.location.pathname;
    let reg = /index/;
    if (reg.test(url)){
        return "screens/"
    } else {
        return ""
    }
}