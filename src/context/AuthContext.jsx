import { createContext, useContext, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchCurrentUser, loginUser, logoutUser } from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  //auth me response
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: fetchCurrentUser,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const login = async (credential) => {
    await loginUser(credential);
    await queryClient.invalidateQueries(['auth', 'me']);
  };

  const logOut = async (credential) => {
    await logoutUser(credential);

    await queryClient.setQueriesData(['auth', 'me'], null);

    await queryClient.removeQueries(['auth', 'me']);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthLoading: isLoading,
        isAuthError: isError,
        login,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// custome hook for auth context

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) throw new Error('useAuth must be used within Provider');

  return ctx;
};
