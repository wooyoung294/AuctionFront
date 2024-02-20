// import { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
//
// const PrivateRoute = ({ element }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//
//     useEffect(() => {
//         const profile = sessionStorage.getItem('profile');
//         console.log(profile);
//         setIsAuthenticated(Boolean(profile));
//     }, []);
//
//     return isAuthenticated ? (
//         element
//     ) : (
//         <Navigate to="/" />
//     );
// };
//
// export default PrivateRoute;
