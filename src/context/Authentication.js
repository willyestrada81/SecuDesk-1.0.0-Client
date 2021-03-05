// import React, { createContext, useState } from 'react'
// import jwtDecode from 'jwt-decode'

// export const AuthenticationContext = createContext()

// export function Authentication (props) {
//   const [user, setUser] = useState({
//     user: null
//     // isTokenValid: Boolean
//   })
//   // const decodedToken = jwtDecode(localStorage.getItem('jwtToken'))
//   // setUser({
//   //   user: !!decodedToken.exp * 1000 < Date.now()
//   // })
//   // if (localStorage.getItem('jwtToken')) {
//   //   const decodedToken = jwtDecode(localStorage.getItem('jwtToken'))

//   //   if (decodedToken.exp * 1000 < Date.now()) {
//   //     localStorage.removeItem('jwtToken')
//   //     setUser(null)
//   //   } else {
//   //     setUser(decodedToken)
//   //   }
//   // }

//   return (
//     <AuthenticationContext.Provider value={{ user, setUser }}>
//       {props.children}
//     </AuthenticationContext.Provider>
//   )
// }
