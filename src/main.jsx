import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { KeycloakProvider } from './keycloak/KeycloakContext.jsx';
import Keycloak from 'keycloak-js';


const keycloak = new Keycloak({
  url: 'https://20.244.80.76:9443',
  realm: 'develop',
  clientId: 'login-app'
});

keycloak.init({ onLoad: 'check-sso' })
  .then(() => {
    const root = createRoot(document.getElementById('root'));
    root.render(
      <KeycloakProvider keycloak={keycloak}>
        <App />
      </KeycloakProvider>
    );
  })
  .catch(error => console.error('Keycloak init error:', error));


