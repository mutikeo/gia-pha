import React, { useRef, useEffect } from 'react';
import OrgChart from '@balkangraph/orgchart.js';
import { chartConfig } from '../utils/chartConfig';

const MyChart = (props) => {

  const divRef = useRef();

  useEffect(() => {

    const addManager = (nodeId) => {
      chart.addNode({ id: OrgChart.randomId(), stpid: nodeId });
    };

    chartConfig.tags.department.nodeMenu.addManager.onClick = addManager;

    const chart = new OrgChart(divRef.current, {
      nodes: props.nodes,
      ...chartConfig
    });

    // Drag & Drop functional
    chart.on('drop', function (sender, draggedNodeId, droppedNodeId) {
      var draggedNode = sender.getNode(draggedNodeId);
      var droppedNode = sender.getNode(droppedNodeId);

      if (droppedNode.tags.indexOf("department") != -1 && draggedNode.tags.indexOf("department") == -1) {
        var draggedNodeData = sender.get(draggedNode.id);
        draggedNodeData.pid = null;
        draggedNodeData.stpid = droppedNode.id;
        sender.updateNode(draggedNodeData);
        return false;
      }
    });

    // Edit fields
    chart.editUI.on('field', function (sender, args) {
      var isDeprtment = sender.node.tags.indexOf("department") != -1;
      var deprtmentFileds = ["name"];

      if (isDeprtment && deprtmentFileds.indexOf(args.name) == -1) {
        return false;
      }
    });

  }, []);

  return (
    <>
      <div id="tree" ref={divRef}></div>
      <style>{`
        #tree {
          width: 100%;
          height: 100%;
        }

        .it-team>rect {
          fill: #b4ffff;
        }

        .it-team>text {
          fill: #039BE5;
        }

        .it-team>[control-node-menu-id] line {
          stroke: #039BE5;
        }

        .it-team>g>.ripple {
          fill: #00efef;
        }

        .hr-team>rect {
          fill: #fff5d8;
        }

        .hr-team>text {
          fill: #ecaf00;
        }

        .hr-team>[control-node-menu-id] line {
          stroke: #ecaf00;
        }

        .hr-team>g>.ripple {
          fill: #ecaf00;
        }

        .sales-team>rect {
          fill: #ffeedd;
        }

        .sales-team>text {
          fill: #F57C00;
        }

        .sales-team>[control-node-menu-id] line {
          stroke: #F57C00;
        }

        .sales-team>g>.ripple {
          fill: #F57C00;
        }
      `}</style>
    </>
  );
};

export default React.memo(MyChart);