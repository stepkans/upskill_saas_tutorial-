/* global $, Stripe */
//Document ready
$(document).on('turbolinks:load', function() {
    var theForm = $('#pro_form');
    var submitBtn = $('#form-submit-btn');

    //Set Stripe public key.
    Stripe.setPublishableKey($('meta[name="stripe-key"]').attr('content'));
    
    //when user clicks submit btn,
    submitBtn.click(function(event){
       //prevents default submission behaviour.Accounts
       event.preventDefault();
       submitBtn.val("Processing").prop('disabled', true);
       //collect the credit card fields.
       var ccNum = $('#card_number').val(),
           cvcNum = $('#card_code').val(),
           expMonth = $('#card_month').val(),
           expYear = $('#card_year').val();
           
        //use Stripe Js library to check for card errors
        var error = false // boolean, true or false
        
        //Validate card number
        if (!Stripe.card.validateCardNumber(ccNum)) {
          error = true
          alert('The credit card number appears to be invalid ')
        }
        
        //Validate CVC number
        if (!Stripe.card.validateCVC(cvcNum)) {
          error = true
          alert('The CVC number appears to be invalid ')
        }
        
        //Validate Expiration date
        if (!Stripe.card.validateExpiry(expMonth, expYear)) {
          error = true
          alert('The Expiration Date appears to be invalid ')
        }
        
        if (error){
          //if there are card errors , dont send to Stripe
          //reenable the submit button so they can reenter details and send
          submitBtn.prop('disabled', false).val("Sign Up");
          
        } else {
          //Send the card info to Stripe.
          Stripe.createToken({
            number: ccNum,
            cvc: cvcNum,
            exp_month: expMonth,
            expYear: expYear
          }, stripeResponseHandler); //for once token you can stop here
        }
           
        return false;
    });
   
    //stripe will return a card token.
    function stripeResponseHandler(status, response){
      //get token from response
      var token = response.id;
      
      //Inject the card token in a hidden field.
      theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
      
      //submit form to our Rails App.Accounts
      theForm.get(0).submit(); //arrays strt from 0
    }
});