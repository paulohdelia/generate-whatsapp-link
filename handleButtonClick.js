const button = document.querySelector('.btn.generate-link');

const form = document.querySelector('.form');
const resetFormButton = document.querySelector('.btn.clear-form');

form.addEventListener('submit', preventPageReloadAndResetInputValues);

function preventPageReloadAndResetInputValues(event) {
  event.preventDefault();
}

resetFormButton.addEventListener('click', () => resetForm(form));

function resetForm(form) {
  form.reset();
  form.querySelectorAll('input').forEach(input => input.classList.remove('active'));
}

button.addEventListener('click', displayWhatsappLink);

function displayWhatsappLink() {
  const whatsappNumber = document.querySelector('#whatsapp').value;
  const message = document.querySelector('#message').value;
  
  const whatsappLink = generateWhatsappLink(whatsappNumber, message);

  const linkElement = document.querySelector('.generated-link');
  const copyButtonElement = document.querySelector('.generated-link-container .btn');

  if (copyButtonElement.textContent !== '') {
    copyButtonElement.textContent = 'Copiar Link';
  }

  linkElement.textContent = whatsappLink;

  if (whatsappLink.includes('Preencha o número de Whatsapp')) {
    copyButtonElement.style.display = 'none';
    linkElement.style.margin = 'auto';
    linkElement.style.wordBreak = 'normal';
    return false;
  }
  
  linkElement.style.wordBreak = 'break-all';
  linkElement.style.marginBottom = '0';
  copyButtonElement.style.display = 'block';

  copyButtonElement.addEventListener('click', () => {
    const wasCopied = copyToClipboard(whatsappLink);

    if (wasCopied) {
      copyButtonElement.textContent = 'Link copiado'
    }
  });
}

function copyToClipboard(text) {
  const tempInput = document.createElement('textarea');
  
  tempInput.value = text;
  
  document.body.appendChild(tempInput);
  tempInput.select();
  tempInput.setSelectionRange(0, 99999);

  document.execCommand('copy');
  tempInput.remove();

  return true;
}

function generateWhatsappLink(whatsappNumber, message = '') {
  if (!checkIfWhatsappNumberIsValid(whatsappNumber)) {
    return 'Preencha o número de Whatsapp';
  }

  const formatedWhatsappNumber = formatWhatsappNumber(whatsappNumber);
  const formatedMessage = formatMessage(message);

  return `https://api.whatsapp.com/send?phone=${formatedWhatsappNumber}&text=${formatedMessage}`;
}

function checkIfWhatsappNumberIsValid(whatsappNumber) {
  return formatWhatsappNumber(whatsappNumber).length === 13;
}

function formatMessage(message = '') {
  return message.replace(/ /g, '+');
}

function formatWhatsappNumber(whatsappNumber) {
  return whatsappNumber.replace(/\D/g, '');
}