const validCPF = cpfUser => {
    
    if(cpfUser.length < 11) return false;

    var Soma;
    var Resto;
    Soma = 0;
    if (cpfUser == "00000000000") return false;

    for (var i=1; i<=9; i++) Soma = Soma + parseInt(cpfUser.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(cpfUser.substring(9, 10)) ) return false;

    Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpfUser.substring(i-1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(cpfUser.substring(10, 11) ) ) return false;
        return true;
};

export { validCPF };