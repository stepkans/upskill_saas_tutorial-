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
       //collect the credit card fields.
       var ccNum = $('#card_number').val(),
           cvcNum = $('#card_code').val(),
           expMonth = $('#card_month').val(),
           expYear = $('#card_year').val();
        //Send the card info to Stripe.
        Stripe.createToken({
          number: ccNum,
          cvc: cvcNum,
          exp_month: expMonth,
          expYear: expYear
        }, stripeResponseHandler);
      
    })
   
    

    //stripe will return a card token.
    //submit form to our Rails App.
});