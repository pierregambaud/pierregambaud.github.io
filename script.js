window.addEventListener('DOMContentLoaded', function() {

  // get the form elements defined in the form HTML above    
  var $emailButton    = document.getElementById('email');
  var $popinContainer = document.getElementById('popin-container');
  var $closeLink      = document.getElementById('hide-popin-text-link');
  var $form           = document.getElementById('contact-form');
  var $emailField     = document.getElementById('email-field');
  var $messageField   = document.getElementById('message-field');
  var $verifField     = document.getElementById('verif-field');
  var $submitButton   = document.getElementById('contact-form-button');
  var $status         = document.getElementById('contact-form-status');


  //     __                  _   _                 
  //    / _|                | | (_)                
  //   | |_ _   _ _ __   ___| |_ _  ___  _ __  ___ 
  //   |  _| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
  //   | | | |_| | | | | (__| |_| | (_) | | | \__ \
  //   |_|  \__,_|_| |_|\___|\__|_|\___/|_| |_|___/
  //                                               
  //                                               

  // popin interactions
  function showPopin() {
    $popinContainer.classList.remove('hidden');
  }

  function hidePopin() {
    $popinContainer.classList.add('hidden');
  }

  // success and error functions for after the form is submitted
  function success() {
    $form.reset();
    $submitButton.classList.add('hidden');
    $emailField.classList.add('hidden');
    $messageField.classList.add('hidden');
    $status.classList.remove('hidden');
    $verifField.classList.remove('hidden');
    $status.innerHTML = `Merci pour votre message, je vous réponds bientôt !`;
  }

  function error() {
    $status.classList.remove('hidden');
    $status.innerHTML = 'Veuillez svp remplir tous les champs';
  }

  function checkHuman(input) {
    if(input && input.toLowerCase() === 'humain') {  
      return true;
    }

    $status.classList.remove('hidden');
    $status.innerHTML = 'Ecrivez svp le mot "HUMAIN" dans le champ anti-spam';
    return false;
  }


  //    _ _     _                           
  //   | (_)   | |                          
  //   | |_ ___| |_ ___ _ __   ___ _ __ ___ 
  //   | | / __| __/ _ \ '_ \ / _ \ '__/ __|
  //   | | \__ \ ||  __/ | | |  __/ |  \__ \
  //   |_|_|___/\__\___|_| |_|\___|_|  |___/
  //                                        
  //                                        

  // handle the popin
  $emailButton.addEventListener('click', function() {
    showPopin();  
  });
  $closeLink.addEventListener('click', function() {
    hidePopin();
  });

  // handle the form submission event
  $form.addEventListener('submit', function(ev) {
    ev.preventDefault();
    let data = new FormData($form);
    let verifFieldContent = [...data][2][1];

    if(checkHuman(verifFieldContent)) {
      ajax($form.method, $form.action, data, success, error);
    }
  });
});


//    _          _                     
//   | |        | |                    
//   | |__   ___| |_ __   ___ _ __ ___ 
//   | '_ \ / _ \ | '_ \ / _ \ '__/ __|
//   | | | |  __/ | |_) |  __/ |  \__ \
//   |_| |_|\___|_| .__/ \___|_|  |___/
//                | |                  
//                |_|                  

// helper function for sending an AJAX request
function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}