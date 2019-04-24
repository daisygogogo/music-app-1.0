import originalJsopn from 'jsonp';

export default function jsonp(url,params,option){
    url += url.indexOf('?') < 0?`?${param(params)}`:`&${param(params)}`
    return new Promise((resolve, reject) =>{
        originalJsopn(url, option,(err, data) =>{
            if(!err){
                return resolve(data)
            }else{
                return reject(err)
            }
        })
    })
}

export function param(data){
    let paramString = "";
    for(key in data){
        paramString += `&${key}=${data[key]}`
    }
    paramString = paramString?paramString.substr(1):"";
    return paramString;
}