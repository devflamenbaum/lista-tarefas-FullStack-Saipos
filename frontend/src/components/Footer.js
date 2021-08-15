import React from 'react';
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';

export default function Footer() {
  return (
    <AppBar position="static">
      <Container maxWidth="md">
        <Toolbar style={{ justifyContent: 'center' }}>
          <Typography variant="body1" color="inherit">
            © 2021 Dev. Flamenbaum
          </Typography>
          <img
            src="https://cms.saipos.com/storage/uploads/2020/10/22/5f91b01b547f5Logo-Saipos.svg"
            alt="logo"
            width={150}
            height={150}
            style={{ marginLeft: '10px' }}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
