import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';


const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
}


export default PrivateRoute;