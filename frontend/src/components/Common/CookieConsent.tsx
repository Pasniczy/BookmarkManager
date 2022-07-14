import Consent from 'react-cookie-consent';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

export const CookieConsent = () => {
  return (
    <Consent
      cookieName="accept-cookies"
      expires={30}
      location="bottom"
      style={{ backgroundColor: '#1976d2' }}
      buttonText="Accept"
      buttonStyle={{ fontSize: 16, backgroundColor: '#EBD558', color: '#1976d2' }}
    >
      <Typography>
        This website uses cookies to enhance the user experience. By continuing to use this website, you <b>accept</b>{' '}
        the use of the cookies accordingly to our{' '}
        <Link to="cookies" style={{ color: '#EBD558' }}>
          Cookies Policy
        </Link>
      </Typography>
    </Consent>
  );
};
