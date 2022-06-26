const sitekey = '6Ldp3eUfAAAAADACauJvPBGcN1WJo-_GRmvLog5z'

const KEY = 'sdvvzrug'
const SHIFT = 3
let isActive = false

const buttons = document.querySelectorAll('.button')
const recaptchaGroup = document.querySelector('.recaptcha-group')
const recaptcha = document.querySelector('.g-recaptcha')

const openButton = document.getElementById('open-button')
const preview = document.querySelector('.preview')

const keyInput = document.querySelector('.key')
const submitButton = document.getElementById('submit-button')

function recaptcha_callback() {
    buttons.forEach(button => {
      button.removeAttribute('disabled')  
      button.classList.remove('disabled')
    })
}

recaptcha.setAttribute('data-sitekey', sitekey)
recaptcha.setAttribute('data-callback', 'recaptcha_callback')


function caesar_encrypt(text, shift) {
  let result = ''
  for (let i=0; i<text.length; i++) {
    const char = text[i]
    if (char === char.toUpperCase()) result += String.fromCharCode((char.charCodeAt(0) + shift - 65) % 26 + 65)
    else result += String.fromCharCode((char.charCodeAt(0) + shift - 97) % 26 + 97)
  }
  return result
}

submitButton.addEventListener('click', () => {
  const value = keyInput.value
  if (caesar_encrypt(value, SHIFT) === KEY) {
    isActive = true
    keyInput.classList.remove('red')
    keyInput.classList.add('green')
  } else {
    isActive = false
    keyInput.classList.remove('green')
    keyInput.classList.add('red')
  }
})

function handleImageFile(file) {
  preview.classList.remove('dash')
  const img = document.createElement("img");
  img.classList.add("obj");
  img.file = file;
  preview.appendChild(img);

  const reader = new FileReader();
  reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
  reader.readAsDataURL(file);
}

async function handleTextFile(file) {
  preview.classList.remove('dash')
  const text = await file.text();
  preview.innerHTML = text;
}

function handleOpen() {
  preview.innerHTML = ``
  const fileElement = document.getElementById('file').files[0]
  const fileType = fileElement.type.split('/')[0]

  if (fileType === 'text' || fileType === 'image') {
    document.querySelector('.info').innerHTML = fileElement.name
  }

  if (fileType === 'text') handleTextFile(fileElement)
  else if (fileType === 'image' && isActive) handleImageFile(fileElement)
  else document.querySelector('.info').innerHTML = 'Unsupported type'
}
openButton.addEventListener('click', handleOpen)
