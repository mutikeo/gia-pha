import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import get from 'lodash/get';
import Layout from '../components/layout';
import dynamic from 'next/dynamic';
import { store } from '../components/store';
import { pickBy } from 'lodash';

const MyChart = dynamic(
  () => import('../components/mychart'),
  { ssr: false }
);

const Home = () => {
  const { state: storeState, dispatch } = useContext(store);
  useEffect(() => {
    dispatch({ type: 'SET_LOADING', loading: true });
    const fetchData = async () => {
      const resp = await axios.get('/api/people');
      const people = get(resp, 'data').map(p => pickBy(p, (i) => i !== null && i !== undefined));
      console.log('people', people);
      dispatch({ type: 'RESTRUCTURE_PEOPLE', people });
      dispatch({ type: 'SET_LOADING', loading: false });
    };
    fetchData();

  }, []);
  return (
    <Layout>
      <div style={{ height: '100%' }}>
        {
          !storeState.loading &&
          <MyChart nodes={storeState.people} />
        }
      </div>
      <style jsx>{`
        li {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </Layout>
    )
  }

export default Home
