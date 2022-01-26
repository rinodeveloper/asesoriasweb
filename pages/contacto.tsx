import Head from 'next/head'
import React, { useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import SEO from '../components/seo'

async function sendMail(){  

  const form = document.getElementById('contact-form') as HTMLFormElement        
  
  const btnEnviar = document.getElementById('btnEnviar') as HTMLInputElement
  btnEnviar.disabled = true;

  const textWait = document.getElementById('textWait') as HTMLInputElement
  textWait.classList.toggle('collapse')

  const name = form.inputName.value
  const email = form.inputMail.value
  const message = form.inputMessage.value
                          
  //Simple POST request with a JSON body using fetch - Sendin Blue
  const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'api-key': process.env.SENDIN_BLUE_API_KEY},
      body: JSON.stringify({
          "sender":{
              "name": name,
              "email": email
          },
          "to":[
              {  
              "name": process.env.RECIPIENT_NAME,
              "email": process.env.RECIPIENT_EMAIL
              }
          ],
          "replyTo":{"email": email},
          "subject": process.env.DEFAULT_SUBJECT+' de '+name,
          "htmlContent": message
        })
  }
  
  //Return response
  fetch(process.env.SENDIN_BLUE_API, requestOptions)
      .then(response => response.json())
      .then(data => {
          //If message was send
          if(data.messageId){
            //Reset form
            form.reset();
            document.getElementById("btnSuccess").click();
          }else{
            //If an error for send message, then...           
            btnEnviar.disabled = false;
            document.getElementById("btnError").click();
          }          
          
          textWait.classList.toggle('collapse')
      })
}


export default function Contacto() {
  
  
    const recaptchaRef = useRef<ReCAPTCHA>(null)
    
    const handleSubmit = async (event) => {
      event.preventDefault()

      try {
        // Execute the reCAPTCHA when the form is submitted
        const captcha = recaptchaRef.current as HTMLFormElement
        captcha.execute()        
      } catch(error) {
        console.log('Error para cargar el g-captcha');        
      }
    }

    const onReCAPTCHAChange = (captchaCode) => {
      // If the reCAPTCHA code is null or undefined indicating that
      // the reCAPTCHA was expired then return early
      if(!captchaCode) { return }
  
      sendMail()
      
      // Reset the reCAPTCHA so that it can be executed again if user 
      // submits another email.   
      const captcha = recaptchaRef.current as HTMLFormElement
      captcha.reset()
    }

    return (
      <>
        <SEO 
          description={ 'Comienza tu asesoría digital para impulsar tu emprendimiento.' }
          title={ process.env.APP_NAME }
          siteTitle={ 'Solicitar asesoría' }
        />         
        <form
          id={'contact-form'}
          onSubmit={handleSubmit}
          className={'container-fluid col col-md-6 col-sm-12 m-auto needs-validation'}
          >                    
            <div className={'row text-center'}>
                <h2 className={'m-auto mb-4'}>¡Hablemos!</h2>
            </div>
            <div className={'form-floating mb-3'}>
                <input 
                    type={'text'} 
                    className={'form-control'} 
                    id={'inputName'} 
                    name={'name'}
                    placeholder={'Juan'}
                    required/>
                <label htmlFor={'inputName'}>¿Cómo te llamas?</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    type={'email'} 
                    className={'form-control'} 
                    id={'inputMail'}
                    name={'email'}
                    placeholder={'juan@waw.com'}
                    required/>
                <label htmlFor={'inputMail'}>Tu mejor Email</label>
            </div>
            <div 
                className="form-floating mb-3">
                <textarea 
                    className={'form-control'} 
                    placeholder={'Cuéntanos sobre tu proyecto'} 
                    id={'inputMessage'}
                    name={'message'}
                    required></textarea>
                <label htmlFor={'inputMessage'}>¿Cómo te puedo ayudar?</label>
            </div>
            <div
              className={'d-flex flex-row align-items-center'}
              >
              <button
                  id={'btnEnviar'}
                  disabled={false}
                  type={'submit'}
                  className={'btn btn-outline-dark'}
                >
                  Enviar mensaje
              </button>
              <div 
                id={'textWait'}
                className="text-secondary ms-2 text-opacity-75 collapse"
                >Espera...</div>
            </div>

            <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible"
              sitekey={process.env.GCAPTCHA_KEY}
              onChange={onReCAPTCHAChange}
            />
        </form>
        
        <button type="button"className={'collapse'} data-bs-toggle="modal" data-bs-target="#sucessModal" id={'btnSuccess'}>
          Success
        </button>
        <button type="button"className={'collapse'} data-bs-toggle="modal" data-bs-target="#errorModal" id={'btnError'}>
          Error
        </button>

        <div className="modal fade hide" id="sucessModal" aria-labelledby="sucessModalCenterTitle"  aria-modal="true" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header  col-12 text-center">
                <h5 className="modal-title justify-items-center" id="sucessModalCenterTitle">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#6200ee" className="bi bi-send" viewBox="0 0 20 20">
                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372l2.8-7Zm-2.54 1.183L5.93 9.363 1.591 6.602l11.833-4.733Z"/>
                    <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z"/>                    
                  </svg>
                  Mensaje enviado
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>
                  ¡Te responderé en breve!
                </p>
              </div>
            </div>
          </div>
        </div>


        <div className="modal fade hide" id="errorModal" aria-labelledby="errorModalCenterTitle"  aria-modal="true" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header  col-12 text-center">
                <h5 className="modal-title justify-items-center" id="sucessModalCenterTitle">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#dc3545" className="bi bi-send" viewBox="0 0 20 20">
                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372l2.8-7Zm-2.54 1.183L5.93 9.363 1.591 6.602l11.833-4.733Z"/>
                    <path d="M14.975 10.025a3.5 3.5 0 1 0-4.95 4.95 3.5 3.5 0 0 0 4.95-4.95Zm-4.243.707a2.501 2.501 0 0 1 3.147-.318l-3.465 3.465a2.501 2.501 0 0 1 .318-3.147Zm.39 3.854 3.464-3.465a2.501 2.501 0 0 1-3.465 3.465Z"/>
                  </svg>
                  Error al enviar
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>
                  ¡Vuelve a intentarlo!
                </p>
              </div>
            </div>
          </div>
        </div>          
      </>
    )
    
}
