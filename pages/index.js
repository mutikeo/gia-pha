import React from 'react';
import Layout from '../components/layout';
import dynamic from 'next/dynamic';
import { demoConfig } from '../utils/demo';

const MyChart = dynamic(
  () => import('../components/mychart'),
  { ssr: false }
);

const Home = () => (
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

export default Home
