window.onload = () => {
    getPasslengthValue()
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
}

const passwordLenght = document.querySelector('.pass-length-input'), passLenghtValue = document.querySelector('.length-value'),
    secLevelText = document.querySelector('.sec-level-text')
const optionSwitches = document.querySelectorAll('.form-switch input'), generatedPassValue = document.querySelector('.generated-password input')

const allowedCharacters = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "~`!@#$%^&*()_-+={[}]|\:;<>.?/"
}
/* Genera la contraseña aleatoria de acuerdo a los caracteres seleccionados */
const generateRandomPassword = () => {
    var selectedCharacters = "", newRandomPassword = "", NotRepeatCharacters = false 
    /* Verifica si están marcados espacios y/o símbolos o solamente los caracteres */
    optionSwitches.forEach(option => {        
        if (option.checked) {
            option.id !== 'not-repeat' && option.id !== 'space' ? selectedCharacters += allowedCharacters[option.id] 
                : option.id === 'space' ? selectedCharacters += ` ${selectedCharacters} ` 
                : NotRepeatCharacters = true
        }
    });          
    for (let i = 0; i < passwordLenght.value; i++) {       
        let randomCharacters = selectedCharacters[Math.floor(Math.random() * selectedCharacters.length)];             
        NotRepeatCharacters ? 
            /* Se revisa que ningún caracter se repita, si no se resta-- el índice y vuelve a ejecutarse hasta que encuentra otro distinto */
            !newRandomPassword.includes(randomCharacters) || randomCharacters == " " ? newRandomPassword += randomCharacters : i--
            : newRandomPassword += randomCharacters;   
    }
    generatedPassValue.value = newRandomPassword;
}
const generatePassBtn = document.getElementById('generate-pass')
generatePassBtn.addEventListener('click', generateRandomPassword)

/* Funciones para la parte de la longitud y del nivel de seguridad de la contraseña  */
const passSecurityLevelBar = document.querySelector('.progress-bar')
const passwordSecurityLvl = () => {   
    var inputVal = passwordLenght.value, barWth = '', barBg = '', secTxt = ''                             
    inputVal < 4 ? (barWth = '5%', barBg = '#212529', secTxt = 'Muy débil') : inputVal < 8 ? (barWth = '25%', barBg = '#dc3545', secTxt = 'Débil') 
        : inputVal < 12 ? (barWth = '50%', barBg = '#ffc107', secTxt = 'Buena') : inputVal < 15 ? (barWth = '75%', barBg = '#0d6efd', secTxt = 'Fuerte') 
        : (barWth = '100%', barBg = '#198754', secTxt = 'Muy fuerte')    
    passSecurityLevelBar.style.width = barWth
    passSecurityLevelBar.style.background = barBg
    secLevelText.innerHTML = '&#xf3ed; Nivel de seguridad: ' + secTxt
}

const getPasslengthValue = () => {
    passLenghtValue.innerHTML = 'Contraseña de ' + passwordLenght.value + ' caracteres'
    generateRandomPassword()   
    passwordSecurityLvl()
}
passwordLenght.addEventListener('input', getPasslengthValue)

/* Función para copiar la contraseña al portapapeles */
const copyGeneratedPassBtn = document.getElementById('copy-password')
copyGeneratedPassBtn.addEventListener('click', () => {
    generatedPassValue.select();
    generatedPassValue.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(generatedPassValue.value)        
})

/* Deshabilita el botón en caso de que ninguna opción se encuentre activada */
var switches = $('.form-check-input');
switches.change(function () {
    $('#generate-pass').prop('disabled', switches.filter(':checked').length < 1);
});
switches.change();