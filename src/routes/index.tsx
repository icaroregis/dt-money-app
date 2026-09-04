import { useCallback, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

//Private Routes
import { PrivateRoutes } from './PrivateRoutes';

//Public Routes
import { PublicRoutes } from './PublicRoutes';
import { useAuthContext } from '@/context/auth.context';
import { Loading } from '@/screens/Loading';

export default function Routes() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, token } = useAuthContext();

  const Routes = useCallback(() => {
    if (isLoading) {
      return <Loading setLoading={setIsLoading} />;
    }
    if (!user || !token) {
      return <PublicRoutes />;
    }
    return <PrivateRoutes />;
  }, [user, token, isLoading]);

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}