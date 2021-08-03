import { Container, makeStyles, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Form from './components/Form';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    position: 'relative',
    minHeight: '100vh'
  }
}))

interface AppProps {}

function App({}: AppProps) {
  const styles = useStyles()

  return (
    <div className={[styles.root].join(' ')}>
      <Container maxWidth="md">
        <Typography variant="h5" color="textPrimary" align="center">Form</Typography>
        <Form/>
      </Container>
    </div>
  );
}

export default App;
