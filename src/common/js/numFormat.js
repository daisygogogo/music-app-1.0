export function millionToString(value){ //过万数字处理成W为单位
    return (Math.floor(value/1000)/10) + 'W';
}

export default{
    millionToString
}