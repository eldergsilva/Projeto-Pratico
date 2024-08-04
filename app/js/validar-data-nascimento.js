import { ehMaiorDeIdade } from './validar-idade.js';

// Função para validar a data de nascimento
export function validaDataNascimento(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);

    // Verificar se a data é válida
    if (nascimento > hoje) {
        return false;
    }

    return ehMaiorDeIdade(dataNascimento);
}
