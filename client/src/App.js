import React,{useState,useEffect} from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Visitors from './components/Visitors';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});



function App() {

  return (
    <ApolloProvider client={client}>
      <Router>
        <Sidebar/>  
            <div className="App container ">
                  <Route exact path="/" component={ ()=> <h1>Home</h1> } />
                  <Route path="/visitors" component={Visitors } />
            </div>
        <Footer/>
      </Router>

      
     
    </ApolloProvider>
  );
}

export default App;

