import React from 'react'
import { Markup } from 'interweave';


export default function Login() {
  // const [data, setData] = React.useState();
  //   const LoadPage =() =>{
  //       var myHeaders = new Headers();
  //       var requestOptions = {
  //       method: 'GET',
  //       headers: myHeaders,
  //       redirect: 'follow'
  //       };
  //       fetch("/auth?client_id=staging-michelle&scope=openid&redirect_uri=http://localhost:3000/redirect&response_type=code", requestOptions)
  //       .then(response => response.text())
  //       .then(result => setData(result))
  //       .catch(error => console.log('error', error));
  //   }
  //     React.useEffect(()=>{
  //       LoadPage();
  //     });
    return (
        <div>
<object type="text/html" data="https://testauth.boligmappa.no/auth/realms/professional-realm-staging/protocol/openid-connect/auth?client_id=staging-michelle&scope=openid&redirect_uri=http://localhost:3000/redirect&response_type=code"></object>
        </div>
    )
}
