import React from 'react';
import Layout from '../components/layout';
import dynamic from 'next/dynamic';

const MyChart = dynamic(
  () => import('../components/mychart'),
  { ssr: false }
);

const Home = () => (
  <Layout>
    <div style={{ height: '100%' }}>

      <MyChart nodes={
        [{ id: 1, name: "Name1", title: "Tytle1" },
        { id: 2, pid: 1, name: "Name2", title: "Tytle2" },
        { id: 3, pid: 1, name: "Name3", title: "Tytle3" }]} />

    </div>
    <style jsx>{`
      li {
        margin-bottom: 0.5rem;
      }
    `}</style>
  </Layout>
)

export default Home
