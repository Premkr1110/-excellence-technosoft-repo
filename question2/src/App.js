import React, { useEffect, useState } from 'react';
import './App.css';
import UserList from './components/UserList/UserList';
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [appState, setAppState] = useState({
    loading: false,
    page: 0,
    per_page: 0,
    total: 0,
    total_pages: 0,
    previous_page: 0,
    current_page: 1,
    next_page: 2,
    data: []
  });


  //const [previous_page, setPreviousPageState] = React.useState(0);

  const [current_page, setCurrentPageState] = useState(1);

  //const [next_page, setNextPageState] = React.useState(2);


  useEffect(() => {
    setAppState({ loading: true });
    // setNextPageState({ currentPage });
    // setPreviousPageState({ currentPage });
    // setCurrentPageState({ currentPage });
    const apiUrl = `https://reqres.in/api/users?page=${current_page}`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((response) => {
        const { page, per_page, total, total_pages, data } = response;
        setAppState({ ...appState, loading: false, page, per_page, total, total_pages, data });
        console.log(response)
      });
  }, []);

  const next = () => {
    let { current_page, total_pages } = appState;
    if (current_page < total_pages) {
      setCurrentPageState(current_page + 1);
    }
  };

  const previous = () => {
    let { current_page } = appState;
    if (current_page > 1) {
      setCurrentPageState(current_page - 1);
    }
  };

  const currentPage = pageIndex => {
    setCurrentPageState(pageIndex);
  };

  let pagination = [];
  for (let index = 0; index < appState.total_pages; index++) {
    pagination.push(<li class="page-item"><a class="page-link" href="#" onClick={() => currentPage(index + 1)}>{index + 1}</a></li>);
  }

  return (
    <div className='App'>
      <div className='container'>
        <h2 className='list-head'>User Details</h2>
        <UserList isLoading={appState.loading} users={appState.data} />
        <div className="row mt-3">
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
              <li class="page-item"><a class="page-link" href="#" onClick={() => previous()}>Previous</a></li>
              {pagination}
              <li class="page-item"><a class="page-link" href="#" onClick={() => next()}>Next</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );



}

export default App;
