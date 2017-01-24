class ContactsController < ApplicationController 
    #GET request to /contact-us
    #sow new contact form
    def new
      @contact = Contact.new          
    end  
    
    #POST request /contacts
    def create
      #mass assignment of form fields into contact objects
      @contact = Contact.new(contact_params)
      #save the contact object to the database
      if @contact.save
        #store form fields via parametes , into variables
          name = params[:contact][:name]
          email = params[:contact][:email]
          body = params[:contact][:comments]
          
          #plug variables into Contact Mailer
          #email methond and send email
          ContactMailer.contact_email(name, email, body).deliver
          #store success message to the new action
          #and redirect to the new action
          flash[:success] = "Message Sent"
          redirect_to new_contact_path
      else
        #if contact object doesnt save store errors in flash hash
        #and redirect to the new action
          flash[:danger] = @contact.errors.full_messages.join(", ")
          redirect_to new_contact_path
      end  
    
    end
    
    private  
    #to collect data from the form, we need to use
    #strong parameters and whitelist the form fields
        def contact_params
          params.require(:contact).permit(:name, :email, :comments)
        end    
    

end    