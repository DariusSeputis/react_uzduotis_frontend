import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Screens (pages)
import MyAccountScreen from '../screens/MyAccountScreen';

const ProtectedRoute = () => {
  const history = useHistory();
  // Hooks
  // -- side effects
  useEffect(() => {
    // if user not exists
    if (!localStorage.getItem('team')) history.push('/login');
  });

  return <MyAccountScreen />;
};

export default ProtectedRoute;
