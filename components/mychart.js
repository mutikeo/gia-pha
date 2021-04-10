import React, { useRef, useEffect, useState, useContext } from 'react';
import OrgChart from '@balkangraph/orgchart.js';
import { useUploady, useItemFinishListener, useItemStartListener, useItemErrorListener } from "@rpldy/uploady";
import { chartConfig } from '../utils/chartConfig';
import { store } from './store';
import Loader from 'react-loader-spinner';
import axios from 'axios';

// chart.search("c", ["Name", "Title"], ["Title"]);

const MyChart = (props) => {
  const divRef = useRef();
  const [inputFile, setInputFile] = useState(null);
  const uploady = useUploady();
  let chart = null;
  const { dispatch, state: storeState } = useContext(store);

  useItemStartListener((item) => {
    dispatch({ type: 'SET_LOADING_UPLOAD', loading: true });
		console.log(`item ${item.id} started uploading`);
	});

	useItemFinishListener((item) => {
		console.log(`item ${item.id} finished uploading, response was: `, item.uploadResponse);
		if (item.uploadStatus === 200) {
			dispatch({ type: 'SET_LOADING_UPLOAD', loading: false });
			inputFile.value = item.uploadResponse.data.url;
		}
	});

	useItemErrorListener((item) => {
		dispatch({ type: 'SET_LOADING_UPLOAD', loading: false });
		console.log(`item ${item.id} failed - `, item.uploadResponse);
	});

  useEffect(() => {

    const addManager = (nodeId) => {
      chart.addNode({ id: OrgChart.randomId(), stpid: nodeId });
    };

    chartConfig.tags.department.nodeMenu.addManager.onClick = addManager;

    chart = new OrgChart(divRef.current, {
      nodes: props.nodes,
      ...chartConfig
    });

    // Drag & Drop functional
    chart.on('drop', function (sender, draggedNodeId, droppedNodeId) {
      const draggedNode = sender.getNode(draggedNodeId);
      const droppedNode = sender.getNode(droppedNodeId);

      if (droppedNode.tags.indexOf("department") != -1 && draggedNode.tags.indexOf("department") == -1) {
        const draggedNodeData = sender.get(draggedNode.id);
        draggedNodeData.pid = null;
        draggedNodeData.stpid = droppedNode.id;
        sender.updateNode(draggedNodeData);
        return false;
      }
    });

    chart.on('update', function (sender, oldNode, newNode) {
      console.log('update', sender, oldNode, newNode);
      dispatch({ type: 'SET_LOADING_UPLOAD', loading: true });
      const resp = axios.put(`/api/people?id=${newNode._id}`, newNode);
      console.log('resp', resp);
      dispatch({ type: 'SET_LOADING_UPLOAD', loading: false });
    });

    chart.editUI.on('field', function(sender, args) {
      if (args.name === '_id' || args.name === 'Add new field') return false;
    });

    chart.editUI.on('imageuploaded', function (sender, file, input) {
      setInputFile(input);
      uploady.upload(file);
    });

  }, []);

  return (
    <>
      {
        storeState.uploading &&
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          className="loading-loader"
        />
      }
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