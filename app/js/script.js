import { validarCPF, ehUmCPF } from './validar-cpf.js';
import { ehMaiorDeIdade } from './validar-idade.js';
import { validaDataNascimento } from './validar-data-nascimento.js';

// Função para validar o formulário
export function validarFormulario() {
    const formulario = document.querySelector('[data-formulario]');
    if (!formulario) {
        console.error('Formulário não encontrado');
        return false;
    }

    let formularioValido = true;

    // Validar Nome
    const nomeCampo = formulario.querySelector('#nome');
    const nomeErro = formulario.querySelector('#erro-nome');
    if (nomeCampo && nomeErro) {
        if (nomeCampo.value.trim().length < 3) {
            nomeErro.textContent = 'O nome deve ter pelo menos 3 caracteres.';
            formularioValido = false;
        } else {
            nomeErro.textContent = '';
        }
    } else {
        console.error('Elemento de erro do nome não encontrado');
    }

    // Validar E-mail
    const emailCampo = formulario.querySelector('#email');
    const emailErro = formulario.querySelector('#erro-email');
    if (emailCampo && emailErro) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailCampo.value)) {
            emailErro.textContent = 'O e-mail deve ser válido.';
            formularioValido = false;
        } else {
            emailErro.textContent = '';
        }
    } else {
        console.error('Elemento de erro do e-mail não encontrado');
    }

    // Validar Senha
    const senhaCampo = formulario.querySelector('#senha');
    const senhaErro = formulario.querySelector('#erro-senha');
    if (senhaCampo && senhaErro) {
        if (senhaCampo.value.trim().length < 6) {
            senhaErro.textContent = 'A senha deve ter pelo menos 6 caracteres.';
            formularioValido = false;
        } else {
            senhaErro.textContent = '';
        }
    } else {
        console.error('Elemento de erro da senha não encontrado');
    }

    // Validar CPF
    const cpfCampo = formulario.querySelector('#cpf');
    const cpfErro = formulario.querySelector('#erro-cpf');
    if (cpfCampo && cpfErro) {
        if (!validarCPF(cpfCampo.value)) {
            cpfErro.textContent = 'CPF inválido.';
            formularioValido = false;
        } else {
            cpfErro.textContent = '';
        }
    } else {
        console.error('Elemento de erro do CPF não encontrado');
    }

    // Validar Data de Nascimento
    const aniversarioCampo = formulario.querySelector('#aniversario');
    const aniversarioErro = formulario.querySelector('#erro-aniversario');
    if (aniversarioCampo && aniversarioErro) {
        if (!validaDataNascimento(aniversarioCampo.value)) {
            aniversarioErro.textContent = 'Data de nascimento inválida ou idade menor que 18 anos.';
            formularioValido = false;
        } else {
            aniversarioErro.textContent = '';
        }
    } else {
        console.error('Elemento de erro da data de aniversário não encontrado');
    }

    // Validar Termos
    const termosCampo = formulario.querySelector('input[name="termos"]');
    const termosErro = formulario.querySelector('#erro-termos');
    if (termosCampo && termosErro) {
        if (!termosCampo.checked) {
            termosErro.textContent = 'Você deve aceitar os termos.';
            formularioValido = false;
        } else {
            termosErro.textContent = '';
        }
    } else {
        console.error('Elemento de erro dos termos não encontrado');
    }

    return formularioValido;
}
