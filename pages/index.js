import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import get from 'lodash/get';
import Layout from '../components/layout';
import dynamic from 'next/dynamic';
import { demoConfig } from '../utils/demo';
import { store } from '../components/store';

const MyChart = dynamic(
  () => import('../components/mychart'),
  { ssr: false }
);

const Home = () => {
  const { state: storeState, dispatch } = useContext(store);
  useEffect(() => {
    const fetchData = async () => {
      const people = await axios.get('/api/people');
      console.log('people', people);
      dispatch({ type: 'RESTRUCTURE_PEOPLE', people: get(people, 'data.people') });
    };
    fetchData();

  }, []);
  return (
    <Layout>
      <div style={{ height: '100%' }}>
        <MyChart nodes={demoConfig} />
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
