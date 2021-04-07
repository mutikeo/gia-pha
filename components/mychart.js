import React, { useRef, useEffect } from 'react';
import OrgChart from '@balkangraph/orgchart.js';

const MyChart = (props) => {

  const divRef = useRef();

  useEffect(() => {
    OrgChart.templates.ana.plus = '<circle cx="15" cy="15" r="15" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle>'
        + '<text text-anchor="middle" style="font-size: 18px;cursor:pointer;" fill="#757575" x="15" y="22">{collapsed-children-count}</text>';
    
    const chart = new OrgChart(divRef.current, {
      template: "ana",
      nodes: props.nodes,
      nodeMenu:{
        details: { text:"Chi tiết" },
        edit: { text:"Sửa" },
        add: { text:"Thêm" },
        remove: {text:"Xóa" }
      },
      align: OrgChart.ORIENTATION,
      toolbar: {
          fullScreen: true,
          zoom: true,
          fit: true,
          expandAll: true
      },
      
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