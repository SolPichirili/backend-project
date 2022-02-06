const telValidator = (e) =>{
    e.preventDefault();

    if(!register.tel.value.includes('+549')){
        alert('Por favor coloque el código de país');
    }
}

module.exports = {
    telValidator
}