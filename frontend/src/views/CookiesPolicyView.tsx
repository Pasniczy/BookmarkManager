import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { BoxStyled } from 'Components/Common/BoxStyled';
import { ViewHeading } from 'Components/Common/ViewHeading';

type Cookie = {
  name: string;
  purpose: string;
  provider: string;
  country: string;
  type: string;
  expires: string;
};

const cookiesTableRows: Cookie[] = [
  {
    name: 'session',
    purpose: 'user authentication',
    provider: 'bookmark-manager.networkmanager.pl',
    country: 'Poland',
    type: 'http_cookie',
    expires: '30 days',
  },
  {
    name: 'accept-cookies',
    purpose: 'user cookie acceptance',
    provider: 'bookmark-manager.networkmanager.pl',
    country: 'Poland',
    type: 'http_cookie',
    expires: '30 days',
  },
];

export const CookiesPolicyView = () => {
  const navigate = useNavigate();

  return (
    <>
      <ViewHeading>Cookies Policy</ViewHeading>
      <Typography variant="subtitle2">Last updated: July 14 2022</Typography>
      <BoxStyled>
        <Button
          type="button"
          variant="contained"
          color="primary"
          size="small"
          sx={{ marginTop: 2 }}
          onClick={() => navigate(-1)}
        >
          Go back
        </Button>
      </BoxStyled>

      <Box>
        <Typography variant="body1">
          The Cookie Policy explains how BookmarkManager uses cookies and similar technologies to recognize you when you
          visit the website at <Link to="/">https://bookmark-manager.networkmanager.pl</Link>. It explains what these
          technologies are and why we use them.
        </Typography>
        <Typography variant="h6" color="primary">
          What are cookies?
        </Typography>
        <Typography variant="body1">
          Cookies are small data files that are placed on your computer or mobile device when you visit a website.
          Cookies are widely used by website owners in order to make their websites work, or to work more efficiently,
          as well as to provide reporting inofmration.
        </Typography>
        <Typography variant="body1">
          Cookies set by the website owner (Bartosz Paśnik) are called "first party cookies". Cookies set yb parties
          other than the website owner are called "third party cookies". Third party cookies enable third party features
          or functionality to be provided on or through the website (e.g. like advertising, interactive content and
          analytics). The parties that set these third party cookies can recognize your computer both when it visits the
          website in question and also when it visits certain other websites.
        </Typography>
        <Typography variant="h6" color="primary">
          Why are we use cookies?
        </Typography>
        <Typography variant="body1">
          BookmarkManager websites uses only first party cookies for technical reasons in order for the website to
          operate. Because we do not use other cookies that essential ones for the website to provide you with services,
          you cannot reject them. By using this website you automatically accept the use of the cookies by the website.
          The Cookie Consent Modal is found in the notification banner when user enters the website for the first time.
        </Typography>
        <Typography>
          The specific types of first party cookies served through our website and the purposes they perform are
          described in the table beelow:
        </Typography>
        <TableContainer component={Paper} sx={{ marginTop: 4, marginBottom: 4 }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Purpose</TableCell>
                <TableCell align="right">Provider</TableCell>
                <TableCell align="right">Country</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Expires</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cookiesTableRows.map((cookie) => (
                <TableRow key={cookie.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {cookie.name}
                  </TableCell>
                  <TableCell align="right">{cookie.purpose}</TableCell>
                  <TableCell align="right">{cookie.provider}</TableCell>
                  <TableCell align="right">{cookie.country}</TableCell>
                  <TableCell align="right">{cookie.type}</TableCell>
                  <TableCell align="right">{cookie.expires}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="h6" color="primary">
          Where can I get further information?
        </Typography>
        <Typography>
          If you have any questions about our use of cookies or other technologies, please email us at
          bartoszpasnik@gmail.com.
        </Typography>
      </Box>
    </>
  );
};
