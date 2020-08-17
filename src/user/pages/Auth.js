import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { useForm }  from '../../shared/hooks/form-hook';
import { VALIDATOR_EMAIL,
         VALIDATOR_MINLENGTH,
        VALIDATOR_REQUIRE }
      from '../../shared/util/validators';
import { AuthContext } from '../../shared/context/auth-context';      

import './Auth.css';

const Auth = () => {


const auth = useContext(AuthContext);  

const [ isLoginMode, setIsLoginMode ] = useState(true);

const [ formState, inputHandler, setFormData ] = useForm({
        email: {
            value: null,
            isValid: false
        },
        password: {
            value: null,
            isValid: false
        }
    },
    false
);

const authSubmitHandler = (event) => {
    event.preventDefault();
    auth.login();
    console.log( formState.inputs );
}

const switchModeHandler = () => {
    if(!isLoginMode){
        setFormData({
            ...formState.inputs,
            name: undefined, 
        }, formState.inputs.email.isValid && formState.inputs.password.isValid);
    }else{
        setFormData(
            {
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            
        }, false) 
    }
    setIsLoginMode(prevMode => !prevMode);
}



    return (
       <Card className="authentication">
            <h2 >Login Required</h2>
            <hr/>
            <form  onSubmit={ authSubmitHandler } >
            {!isLoginMode && <Input 
                element="input"
                id="name"
                type="text"
                label="Name"
                validators={[ VALIDATOR_REQUIRE()]}
                errorText="Please enter a name."
                onInput={ inputHandler }
                
                 />}    
                <Input
                id="email"
                element="input"
                type="text"
                label="E-mail"
                validators={ [ VALIDATOR_EMAIL() ] }
                errorText="Please enter a valid e-mail."
                onInput={inputHandler}
                />

                <Input
                id="password"
                element="input"
                type="password"
                label="Password"
                validators={ [ VALIDATOR_MINLENGTH(6) ] }
                errorText="Please enter a valid password  ( at least 6 characters )."
                onInput={inputHandler}
                />

                <Button type="submit" disabled={ !formState.isValid } >
                   {isLoginMode ? 'LOGIN' : 'SIGN UP'}
                </Button>

                <Button onClick={ switchModeHandler } inverse> 
                    SWITCH TO { isLoginMode ? 'SIGN UP' : 'LOGIN'} 
                </Button>
              
            </form>
        </Card>
    )
}

export default Auth;
