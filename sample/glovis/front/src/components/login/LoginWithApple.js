import React, { Component } from 'react';
import AppleLogin from 'react-apple-login';

export default class LoginWithApple extends Component {
  render() {
    return (
      <AppleLogin  
      clientId={"5469V8YZZ7"} 
      redirectURI={"https://localhost/member/_login"}   
      responseType={"code"} 
      responseMode={"query"}  
      designProp={
        {
           height: 30,
           width: 140,
           color: "black",
           border: false,
           type: "sign-in",
           border_radius: 15,
           scale: 1,
           locale: "en_US", 
         }
       }
      />
    );
  }
}