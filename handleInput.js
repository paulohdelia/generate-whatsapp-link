const formFieldList = document.querySelectorAll('.form__field');

formFieldList.forEach((formField) => {
  formField.addEventListener('blur', () => {
    if (formField.value != '') {
      formField.classList.add('active');
    } else {
      formField.classList.remove('active');
    }
  });
});

jQuery("input.form__field.whatsapp")
  .mask("+99(99)99999-999?9")
  .focusout(function (event) {  
      var target, phone, element;  
      target = (event.currentTarget) ? event.currentTarget : event.srcElement;  
      phone = target.value.replace(/\D/g, '');
      element = $(target);  
      element.unmask(); 
      element.mask("+99(99)99999-999?9");  
});