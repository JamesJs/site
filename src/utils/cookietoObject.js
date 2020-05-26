export default function cookieToObject(cookie){
    let cookieObjectArray = cookie.split(';');
    let cookieObject= cookieObjectArray.map((value)=>{
        const aux = value.split('=');
        const obj = {[aux[0].trim()]:aux[1].trim()}
        return obj;
    });
    return cookieObject;
}