var str = "+7(903)-123-45-67";

var reg = /\d/g;

var result = str.match(reg)
// не глобальный регэксп, поэтому ищет только первую цифру
console.log( result ); // 7