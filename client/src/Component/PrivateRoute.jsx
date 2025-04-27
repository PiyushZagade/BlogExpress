import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './../App';


function PrivateRoute({ children }) {
    const { user } = useContext(UserContext);

    if (!user.full_name) {
        return <Navigate to="/"  />;
    }
    return children;
}
export default PrivateRoute;