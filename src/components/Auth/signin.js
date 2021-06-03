import React from "react";
import { useHistory } from "react-router";
import fire from "../../config/firebase-config";
import Message from "../StatusMessage/Message";

/**
 * Denne komponenten rendrer en logg-inn side til applikasjonen for brukerne
 */

export default function SignIn() {

    const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [errorMessage, setErrorMessage] = React.useState("");

	const history = useHistory();

	function signinUser(event) {
        event.preventDefault();
        if(!email){
            setErrorMessage("Vennligst tast inn email");
            return;
        }
        if(!password){
            setErrorMessage("Vennligst tast inn passord");
            return;
        }
		fire.auth().signInWithEmailAndPassword(email, password)
		.then((response) => {
		  const user = response.user;
          
		  localStorage.setItem('user', JSON.stringify(
			    {
				  email: user.email,
				  refreshToken: user.refreshToken,
				  displayName: user.displayName,
                  uid: user.uid
				}
			  ));
          const authContainers = document.getElementsByClassName('auth-container');
          authContainers[0].classList.add("animate-form");
          setTimeout(()=> history.push('/home'), 500);
		})
		.catch((error) => {
		  
		  setErrorMessage(error.message);
		});
	}

	function redirectToRegisteration (){		
		history.push('/sign-up');
	}
        
        return (
            <div>
                <div className="app-title">Mytravels.no</div>
                <div className="bg"></div>
                <div className="bg bg2"></div>
                <div className="bg bg3"></div>
                <div className="auth-container">
                <form className="auth-form">
                    <h3 className="auth-header">Logg inn</h3>                    

                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" placeholder="Tast inn email"  onChange={(event)=>setEmail(event.target.value)}/>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Passord</label>
                        <input type="password" className="form-control" placeholder="Tast inn passord"  onChange={(event)=>setPassword(event.target.value)}/>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" onClick={signinUser}>Logg inn</button>
                    <p className="text-right" style={{marginTop: "10px"}}>
                        Ny bruker? <a href="#" onClick={redirectToRegisteration}> Registrer deg </a>
                    </p>

                    {errorMessage && 
				        <Message message={errorMessage} setMessage={setErrorMessage} type={'error'} />
			        }
                </form>
                </div>
            </div>
        );
}