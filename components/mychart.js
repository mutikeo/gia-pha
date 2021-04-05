import React, { useRef, useEffect } from 'react';
import OrgChart from '@balkangraph/orgchart.js';

const MyChart = (props) => {

  const divRef = useRef();

  useEffect(() => {
    const chart = new OrgChart(divRef.current, {
      nodes: props.nodes,
      nodeBinding: {
        field_0: 'name',
        field_1: 'title'
      }
    });

  }, []);

  return (
    <div id="tree" ref={divRef}></div>
  );
};

export default React.memo(MyChart);