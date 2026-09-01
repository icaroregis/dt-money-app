import { useCallback, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

//Private Routes
import { PrivateRoutes } from './PrivateRoutes';

//Public Routes
import { PublicRoutes } from './PublicRoutes';

export default function Routes() {
  const [user, setUser] = useState(undefined);
  const Routes = useCallback(() => {
    if (user) {
      return <PrivateRoutes />;
    }
    return <PublicRoutes />;
  }, [user]);

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}