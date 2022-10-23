import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AppBar, Box, Button, CssBaseline, Drawer, List, ListItem, Toolbar } from '@mui/material';
import './App.css';
import SiteBreadcrumbs from './Components/SiteBreadcrumbs';
import Page1 from "./MainPages/Page1";
import Page2 from "./MainPages/Page2";
import Page3 from "./MainPages/Page3";

function App() {
  const [open, setOpen] = useState(false);

  function toggleDrawer(e: React.KeyboardEvent | React.MouseEvent) {
  
    const ke = e as React.KeyboardEvent;

    if (e.type === "keydown" && (ke.key === "Tab" || ke.key === "Shift")) {
      return;
    }

    setOpen(!open);
  }

  interface myLink {
    url: string,
    element: React.ReactNode,
    name: string
  }

  const links :Array<myLink> = [{
    url: "/page1",
    element: (<Page1/>),
    name: "Page 1"
  },{
    url: "/page2",
    element: (<Page2 />),
    name: "Page 2"
  },{
    url: "/page3",
    element: (<Page3/>),
    name: "Page 3"
  }];
  
const drawerWidth = 240;

  return (
    /*
    npm install @mui/material @emotion/react @emotion/styled --legacy-peer-deps
    npm install @mui/icons-material --legacy-peer-deps
 */

      <BrowserRouter> 
      
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>         
              <Button  variant="contained" onClick={toggleDrawer}>Open Nav</Button>
              <SiteBreadcrumbs></SiteBreadcrumbs>
          </Toolbar>
        </AppBar>
        <Drawer 
          open={open} 
          onClose={toggleDrawer}
      
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
                >
          <div
            style={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
          >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                {
                  links.map((link) => (
                  <ListItem button key={link.url} component={Link} to={link.url}>             
                      {link.name}
                    </ListItem>
                  ))
                }
                </List>
            </Box>
          </div>
        </Drawer>  
        
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            
            <Toolbar />
            <Routes>      
            {
              links.map((link) => ( 
                <Route key={link.name} path={link.url}  element={(link.element)} />
              ))
            }
            </Routes>     
          </Box>
        </Box>
      </BrowserRouter> 
  );
}

export default App;
