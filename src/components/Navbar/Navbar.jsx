import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { AppBar, Button } from '@material-ui/core';
import { MemoryRouter, Route, Link, useRouteMatch, Switch } from 'react-router-dom';


function MyTabs() {
  // You need to provide the routes in descendant order.
  // This means that if you have nested routes like:
  // users, users/new, users/edit.
  // Then the order should be ['users/add', 'users/edit', 'users'].
  const routeMatch = useRouteMatch(['/search', '/watchlist', '/history']);
  const currentTab = routeMatch?.path;

  return (
    <Box display="flex" sx={{ width: '100%' }} borderColor="divider" borderBottom={1} border={1} paddingLeft="15%" paddingRight="15%" bgcolor="#FFFFFF">
      <Tabs value={currentTab} textColor="secondary">
        <Tab label="Search Stock" value="/search" to="/search" component={Link} />
        <Tab label="My Watchlist" value="/watchlist" to="/watchlist" component={Link} />
        <Tab label="History" value="/history" to="/history" component={Link} />
      </Tabs>
      <Box sx={{ width: '40%' }}></Box>
      <Button value="/login" to="/login" component={Link}> Login/Logout</Button>
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