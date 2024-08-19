import { ehMaiorDeIdade } from './validar-idade.js';


export function validaDataNascimento(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);

    
    if (nascimento > hoje) {
        return false;
    }

    return ehMaiorDeIdade(dataNascimento);
}
