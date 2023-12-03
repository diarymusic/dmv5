function getNestedURLParam(url, paramName) {
    var urlParams = new URLSearchParams(url);
    var paramValue = urlParams.get(paramName);
    if(typeof(paramValue)==undefined||paramValue==null){
        return false;
    }
    return paramValue;
}
