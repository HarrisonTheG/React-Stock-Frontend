import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { AppBar, Button } from '@material-ui/core';
import { Link, useRouteMatch } from 'react-router-dom';

import SessionService from '../../session/SessionService';

function MyTabs() {

  const routeMatch = useRouteMatch(['/search/:ticker', '/watchlist', '/history']);
  const currentTab = routeMatch?.path;

  const logoutClicked = () => {
    SessionService.clearAllSessionStorage();
    //console.log(SessionService.getSessionStorageOrDefault('username', null));
  }

  return (
      <Box display="flex" sx={{ width: '100%' }} borderColor="divider" borderBottom={1} border={1} paddingLeft="15%" paddingRight="15%" bgcolor="#FFFFFF">
      <Tabs value={currentTab} textColor="secondary">
        <Tab label="Search Stock" value="/search/:ticker" to="/search/:ticker" component={Link} />
        <Tab label="My Watchlist" value="/watchlist" to="/watchlist" component={Link} />
        <Tab label="History" value="/history" to="/history" component={Link} />
      </Tabs>
      
      <Button value="/login" to="/login" component={Link} onClick={logoutClicked} style={{marginLeft: '30%'}}>
        { SessionService.getSessionStorageOrDefault('username', null) !== null ? 'Logout' : 'Login' }</Button>
    </Box>
  );
}

export default function TabsRouter() {
  return (
    <AppBar>
      <MyTabs />
    </AppBar>

  );
}