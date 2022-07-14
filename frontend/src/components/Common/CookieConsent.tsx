import Consent from 'react-cookie-consent';
import { Typography } from '@mui/material';

export const CookieConsent = () => {
  return (
    <Consent
      cookieName="accept-cookies"
      expires={150}
      location="bottom"
      style={{ backgroundColor: '#1976d2' }}
      buttonText="Accept"
      buttonStyle={{ color: '#4e503b', fontSize: 16 }}
    >
      <Typography>
        This website uses cookies to enhance the user experience. By continuing to use this website, you <b>accept</b>{' '}
        the use of the cookies accordingly to our Cookies Policy.
      </Typography>
    </Consent>
  );
};
