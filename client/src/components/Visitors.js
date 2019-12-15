import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.css';

const QUERY = gql`
query VisitorsQuery ($page:Int!)  {
  visitors (page:$page) {
    date
    device
    ip    
    
  }
}
`;


export default function Visitors() {
    const [visitors, setVisitors] = useState([]);
    const [page, setPage] = useState(1);
    const [filter,setFilter]=useState('');

    function Filtered() {
        let filteredVisitors;


        switch (filter) {
            case '':
                filteredVisitors = visitors
            case 'today':
                filteredVisitors = visitors.filter(el => el.date == moment().format("MM/DD/YYYY"))
                break;
            case 'yesterday':
                filteredVisitors = visitors.filter(el => el.date == moment().subtract(1, 'day').format("MM/DD/YYYY"))
                break;
            case 'lastweek':
                filteredVisitors = visitors.filter(el =>
                    moment().diff(moment(el.date), 'days') >= 7
                    &&
                    moment().diff(moment(el.date), 'days') <= 14)
                break;
            case 'thismonth':
                filteredVisitors = visitors.filter(el => moment(el.date).format('M') == moment().format('M'))
                break;
        }
        return <div className="listings">
            {filteredVisitors.map((el, i) => (
                <div key={i} className="listing">
                    <div className="vistor-detail"> <p>Date: </p> <span>{moment(el.date).format(" MMM, ddd D, YYYY")} </span></div>
                    <div className="vistor-detail"> <p>Device: </p> <span> {el.device} </span></div>
                    <div className="vistor-detail"> <p>Ip: </p> <span> {el.ip}</span></div>
                </div>

            ))}
            <div className="page-btns" >
                <button disabled={page===1 ? true : false} type="button" className="btn btn-outline-secondary" onClick={() => { setPage(page - 1) }} >Prev page</button>
                <button disabled={visitors.length<4 ? true : false} type="button" className="btn btn-outline-secondary" onClick={() => { setPage(page + 1) }}>Next page</button>
            </div>
        </div>



    }

   

    return (
        <>
            <Query query={QUERY} variables={{ page }}>
                {({ loading, error, data }) => {
                    if (loading) return <h4>Loading...</h4>;
                    if (error) console.log(error);
                    setVisitors(data.visitors)

                    return (
                        <>
                        <div>
                            <em>Filter by: </em>
                            <select onChange={(e) => {setFilter(e.target.value) ;setPage(1)}} className="dropdown">
                                <option value="" >All Time</option>
                                <option value="today" >Today</option>
                                <option value="yesterday">Yesterday</option>
                                <option value="lastweek">Last Week</option>
                                <option value="thismonth">This Month</option>
                            </select>
                        </div>               
                      {  filter == "" ? <div className="listings">
                        {visitors.map((el,i) => (
                            <div key={i} className="listing">
                                <div className="vistor-detail"> <p>Date: </p> <span>{moment(el.date).format(" MMM, ddd D, YYYY")} </span></div>
                                <div className="vistor-detail"> <p>Device: </p> <span> {el.device} </span></div>
                                <div className="vistor-detail"> <p>Ip: </p> <span> {el.ip}</span></div>
                            </div>
                        ))}
                        <div className="page-btns" >
                            <button disabled={page === 1 ? true : false} type="button" className="btn btn-outline-secondary" onClick={() => { setPage(page - 1) }} >Prev page</button>
                            <button disabled={visitors.length < 4} type="button" className="btn btn-outline-secondary" onClick={() => { setPage(page + 1) }}>Next page</button>
                        </div>
                    </div>
                    
                        : <Filtered />}
                        </>    
                    )
            }}

            </Query>
        </>
    )
}

