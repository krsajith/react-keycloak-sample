/* eslint-disable react-refresh/only-export-components */
import  { useCallback, useMemo , useContext, createContext} from 'react';
import PropTypes from 'prop-types';


const KeycloakContext = createContext(undefined);

export function KeycloakProvider({ children, keycloak }) {
  const logout = useCallback(() => {
    keycloak.logout();
  }, [keycloak]);

  const refreshToken = useCallback(() => {
    return keycloak.updateToken(5);
  }, [keycloak]);

  const contextValue = useMemo(() => ({
    keycloak,
    isAuthenticated: keycloak.authenticated ?? false,
    logout,
    refreshToken,
  }), [keycloak, logout, refreshToken]);

  return (
    <KeycloakContext.Provider value={contextValue}>
      {children}
    </KeycloakContext.Provider>
  );
}

KeycloakProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validates children as a React node
  keycloak: PropTypes.object.isRequired, // Validates keycloak as a required object
};


// Custom hook to use the Keycloak context
export function useKeycloak() {
  const context = useContext(KeycloakContext);
  if (context === undefined) {
    throw new Error('useKeycloak must be used within a KeycloakProvider');
  }
  return context;
}