import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import get from 'lodash/get';
import Layout from '../components/layout';
import dynamic from 'next/dynamic';
import { store } from '../components/store';
import { pickBy } from 'lodash';
import { CLOUD_NAME, UPLOAD_PRESET } from '../utils/auth';

const MyChart = dynamic(
  () => import('../components/mychart'),
  { ssr: false }
);

const Uploady = dynamic(
  () => import('@rpldy/uploady'),
  { ssr: false }
);

const Home = () => {
  const { state: storeState, dispatch } = useContext(store);
  useEffect(() => {
    dispatch({ type: 'SET_LOADING', loading: true });
    const fetchData = async () => {
      const resp = await axios.get('/api/people');
      const people = get(resp, 'data').map(p => pickBy(p, (i) => i !== null && i !== undefined));
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
          <Uploady
            destination={{
              url: `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
              params: {
                upload_preset: UPLOAD_PRESET,
              },
            }}
          >
            <MyChart nodes={storeState.people} />
          </Uploady>
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
