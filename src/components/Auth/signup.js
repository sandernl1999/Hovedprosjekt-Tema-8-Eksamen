import React, { useRef } from "react";
import { useHistory } from "react-router";
import fire from "../../config/firebase-config";
import Message from "../StatusMessage/Message";

/**
 * This component renders a Signup page for users to register to application
 */

export default function SignUp() {    

    const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [firstName, setFirstName] = React.useState("");
	const [lastName, setLastName] = React.useState("");
	const [errorMessage, setErrorMessage] = React.useState("");
	const [profilePic, setProfilePic] = React.useState(null);

	const history = useHistory();
    const inputEl = useRef(null);

	function registerUser(event) {	
        event.preventDefault();
        if(!firstName) {
            setErrorMessage("Please enter First Name.");
            return;
        } else if(!email) {
            setErrorMessage("Please enter Email.");
            return;
        } else if(!password) {
            setErrorMessage("Please enter Password.");
            return;
        } else if(!profilePic){
            setErrorMessage("Please select a profile picture.");
            return;
        }
        if(!new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)){
            setErrorMessage("Email format is invalid.");
            return;
        } else if(!new RegExp("^(?=.*[A-Z])(?=.*[0-9]).*$").test(password)){
            setErrorMessage("Password should contain atleast one digit & uppercase letter.");
            return;
        }
		fire.auth().createUserWithEmailAndPassword(email, password)
  		.then((response) => {			
			const user = response.user;			
			localStorage.setItem('user', JSON.stringify(
			    {
				  email: user.email, 
				  refreshToken: user.refreshToken,
				  displayName: `${firstName} ${lastName}`,
                  uid: user.uid
				}
			  ));			

			if(profilePic) {
                // Create a Storage Ref w/ username
			    const storageRef = fire.storage().ref(user.email + '/profilePicture/' + profilePic.name);
		        // Upload file
			    storageRef.put(profilePic).then(snapshot => {
                    navigateToHomepage();
                    snapshot.ref.getDownloadURL().then((downloadURL) => {
                        fire.auth().currentUser.updateProfile({displayName: `${firstName} ${lastName}`}).then(r => console.log(r)).catch(e => console.log(e));
                        const db = fire.firestore();
                        const colRef = db.collection('users');
                        colRef.add({
                            firstName,
                            lastName,
                            email,
                            downloadURL
                        }).then(resp => {
                            console.log(resp);                            
                        });
                      });                    
                });
            } else {
                fire.auth().currentUser.updateProfile({displayName: `${firstName} ${lastName}`}).then(r => console.log(r)).catch(e => console.log(e));
                    const db = fire.firestore();
                    const colRef = db.collection('users');
                    colRef.add({
                        firstName,
                        lastName,
                        email                        
                    }).then(resp => {
                        console.log(resp);
                        navigateToHomepage();
                    });
            }            
  		})
		.catch((error) => {
			console.log(error);
			setErrorMessage(error.message);
		});
	}

    function navigateToHomepage() {
        const authContainers = document.getElementsByClassName('auth-container');
        authContainers[0].classList.add("animate-form");
        setTimeout(()=> history.push('/home'), 500);
    }

	function redirectToSignin() {		
		history.push('/');
	}

    function handleFileUpload(event) {
        setProfilePic(event.target.files[0]);
        const reader = new FileReader();
        reader.onload = function (e) {
            const element = document.getElementById('profile-pic');
            element.setAttribute('src', e.target.result);
            element.setAttribute('width', 100);
            element.setAttribute('height', 100);
            element.removeAttribute('hidden');
        };
        reader.readAsDataURL(event.target.files[0]);
    };

    function handleClick(event) {
        event.preventDefault();
        inputEl.current.click();
    }
    
        return (
            <div>
                <div className="app-title">Mytravels.no</div>
                <div className="bg"></div>
                <div className="bg bg2"></div>
                <div className="bg bg3"></div>
                <div className="auth-container">
                    <form className="auth-form signup-form">
                        <h3 className="auth-header">Sign Up</h3>

                        <div className="form-group">
                                <img id="profile-pic" src="#" alt="profile-pic" style={{borderRadius: "50%"}} hidden={true}/>
                        </div>

                        <div className="form-group" style={{display: "flex", justifyContent: "center"}}>
                                <input
                                    ref={inputEl}
                                    onChange={handleFileUpload}
                                    type="file"
                                    style={{ display: "none" }}
                                    accept="image/x-png,image/gif,image/jpeg"                            
                                />
                                <button className="btn btn-primary btn-block" style={{width: "100px"}} onClick={handleClick}>Add Image</button>
                        </div>

                        <div className="form-group">
                            <label className="form-label">First name</label>
                            <input type="text" className="form-control" placeholder="First name" onChange={(event)=> setFirstName(event.target.value)}/>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Last name</label>
                            <input type="text" className="form-control" placeholder="Last name" onChange={(event)=> setLastName(event.target.value)}/>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Email address</label>
                            <input type="email" className="form-control" placeholder="Enter email" onChange={(event)=> setEmail(event.target.value)}/>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" onChange={(event)=> setPassword(event.target.value)}/>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" onClick={registerUser}>SignUp</button>
                        <p className="text-right" style={{marginTop: "10px"}}>
                            Already registered <a href="#" onClick={redirectToSignin}>signIn?</a>
                        </p>
                        {
                        errorMessage && 
                            <Message message={errorMessage} setMessage={setErrorMessage} type={'error'} />
                        }
                    </form>
                </div>
            </div>
        );    
}