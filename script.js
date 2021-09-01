//getting the elements
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')
const form = document.getElementById('form')

function showError(input, msg) {
    let inputParent = input.parentElement
    inputParent.className = 'form-control error'
    document.querySelectorAll(`#${input.id} + small`)[0].innerHTML = msg
}

function showSuccess(input) {
    let inputParent = input.parentElement
    inputParent.className = 'form-control success'
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(email.value).toLowerCase())) {
        showError(email, 'Digite um email válido.')
    }
}

const checkPasswdLength = (input, min, max) => {
    if(!(input.value.trim().length === 0) && !(input.value.trim().length >= min && input.value.trim().length <= max)) {
        showError(password, `Senha deve ter entre ${min} a ${max} caracteres.`)
    }
}

const checkPasswdConfirmation = (passwd, passwd2) => {
    !(passwd.value === passwd2.value) && showError(passwd2, 'As senhas devem ser iguais.')
}

function checkSubmit(inputArray) {
    inputArray.forEach(input => {
        if(input.value.trim() === '') {
            showError(input, `${getFieldNameCapitalized(input)} é necessário`)
        } else {
            showSuccess(input)
        }
    });
}

const getFieldNameCapitalized = input => input.id[0].toUpperCase() + input.id.slice(1)

form.addEventListener('submit', e => {
    e.preventDefault()

    checkSubmit([username, email, password, password2])
    
    const min = 6
    const max = 12
    validateEmail(email)
    checkPasswdLength(password, 6, 12)
    checkPasswdConfirmation(password, password2)
})