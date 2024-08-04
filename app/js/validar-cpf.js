// Exporta a função para validar CPF
export function validarCPF(cpf) {
    // Verifica se o CPF tem exatamente 11 dígitos e não é uma sequência de números iguais
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    let soma = 0;
    let resto;

    // Validação do primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.charAt(i - 1)) * (11 - i);
    }
    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.charAt(9))) {
        return false;
    }

    soma = 0;

    // Validação do segundo dígito verificador
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.charAt(i - 1)) * (12 - i);
    }
    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    return resto === parseInt(cpf.charAt(10));
}

// Função para ser usada com setCustomValidity
export function ehUmCPF(campo) {
    const cpf = campo.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (!validarCPF(cpf)) {
        campo.setCustomValidity('O CPF digitado não é válido.');
    } else {
        campo.setCustomValidity('');
    }
}
