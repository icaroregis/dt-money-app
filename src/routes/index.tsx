import { useCallback, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

//Private Routes
import { PrivateRoutes } from './PrivateRoutes';

//Public Routes
import { PublicRoutes } from './PublicRoutes';
import { useAuthContext } from '@/context/auth.context';

export default function Routes() {
  const { user, token } = useAuthContext();

  const Routes = useCallback(() => {
    if (!user || !token) {
      return <PublicRoutes />;
    }
    return <PrivateRoutes />;
  }, [user, token]);

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}