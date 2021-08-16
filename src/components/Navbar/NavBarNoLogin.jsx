import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { AppBar, Button } from '@material-ui/core';
import { Link, useRouteMatch } from 'react-router-dom';
import sessionService from '../../session/SessionService';


function MyTabs() {
  const routeMatch = useRouteMatch(['/search/:ticker']);
  const currentTab = routeMatch?.path;

  return (
    <Box display="flex" sx={{ width: '100%' }} borderColor="divider" borderBottom={1} border={1} paddingLeft="15%" paddingRight="15%" bgcolor="#FFFFFF">
      <Tabs value={currentTab} textColor="secondary">
        <Tab label="Search Stock" value="/search/:ticker" to="/search/:ticker" component={Link} />
      </Tabs>
      <Box sx={{ width: '60%' }}></Box>
      <Button value="/login" to="/login" component={Link} onClick={() => {
          sessionService.clearSessionStorage('username');
      }}> Login</Button>
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
