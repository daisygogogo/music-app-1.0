export default addClass(el, className){

}

export funtion hasClass(el, className){
    let reg = new RegExp('(^||\\s)' + className + '\\s||$');
    return reg.test(el.className);
}