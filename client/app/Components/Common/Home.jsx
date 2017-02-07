import React, { Component } from 'react';
import { render } from "react-dom";
import { Card, CardTitle } from 'material-ui/Card';
import NewUsers from './NewUsers.jsx';
import Login from './LoginPage.jsx';

const Home = () => (
  <Card className="container">
    <CardTitle title="synapsepay" />
  </Card>
)

export default Home;
