import React,{useState,useEffect} from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Visitors from './components/Visitors';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});



function App() {
  const [filter,setFilter]=useState('');

  function filterBy(value){
    setFilter(value);
  }

 
  return (
    <ApolloProvider client={client}>
      <Sidebar/>    
      <div className="App container ">
            <div>
              <em>Filter by: </em>
              <select  onChange={(e)=>{filterBy(e.target.value)}} className="dropdown">
                  <option value="" >All time</option>
                  <option value="today" >Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="lastweek">Last week</option>
                  <option value="thismonth">This month</option>
              </select>
            </div>

      <Visitors filter={filter} />  
      </div>
      <Footer/>
    
    </ApolloProvider>
  );
}

export default App;

