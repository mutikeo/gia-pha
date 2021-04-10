import React, { useRef, useEffect, useState, useContext } from 'react';
import OrgChart from '@balkangraph/orgchart.js';
import { useUploady, useItemFinishListener, useItemStartListener, useItemErrorListener } from "@rpldy/uploady";
import { chartConfig } from '../utils/chartConfig';
import { store } from './store';
import Loader from 'react-loader-spinner';
import axios from 'axios';
import get from 'lodash/get';

// chart.search("c", ["Name", "Title"], ["Title"]);
const defaultImg = 'http://res.cloudinary.com/dag3oozxe/image/upload/v1618065818/t2mor4mo9rrpi8jqdmx4.jpg';

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
    const addManager = async (nodeId) => {
      const newNode = { id: OrgChart.randomId(), stpid: nodeId };
      dispatch({ type: 'SET_LOADING_UPLOAD', loading: true });
      const resp = await axios.post('/api/people', newNode);
      const _id = get(resp, 'data.ref["@ref"].id');
      chart.addNode({ ...newNode, _id });
      if (!get(resp, 'data.done')) {
        console.warn('Error while adding data from manager', resp);
      }
      dispatch({ type: 'SET_LOADING_UPLOAD', loading: false });
    };

    if (storeState.user) {
      chartConfig.nodeMenu = {
        details: { text: 'Xem' },
        edit: { text: 'Sửa' },
        add: { text: 'Thêm' },
        remove: { text: 'Xóa' }
      };

      chartConfig.tags = {
        ...chartConfig.tags,
        'menu-without-add': {
          nodeMenu: {
            details: { text: 'Chi tiết' },
            edit: { text: 'Sửa' },
            remove: { text: 'Xóa' }
          }
        },
        'department': {
          template: 'group',
          nodeMenu: {
            addManager: { text: 'Add new manager', icon: OrgChart.icon.add(24, 24, '#7A7A7A'), onClick: addManager },
            remove: { text: 'Remove department' },
            edit: { text: 'Edit department' },
          }
        }
      }
    } else {
      delete chartConfig.nodeMenu;
      delete chartConfig.tags['menu-without-add'];
      delete chartConfig.tags.department.nodeMenu;
    }

    chart = new OrgChart(divRef.current, {
      nodes: props.nodes,
      ...chartConfig
    });

    // Drag & Drop functional
    chart.on('drop', (sender, draggedNodeId, droppedNodeId) => {
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

    chart.on('update', async (sender, oldNode, newNode) => {
      dispatch({ type: 'SET_LOADING_UPLOAD', loading: true });
      const resp = await axios.put(`/api/people?id=${newNode._id}`, newNode)
      if (!get(resp, 'data.done')) {
        console.warn('Error while updating data', newNode._id);
      }
      dispatch({ type: 'SET_LOADING_UPLOAD', loading: false });
    });

    chart.on('add', async (sender, node) => {
      dispatch({ type: 'SET_LOADING_UPLOAD', loading: true });
      const resp = await axios.post('/api/people', { ...node, img: defaultImg });
      const _id = get(resp, 'data.ref["@ref"].id');
      chart.updateNode({ ...node, _id, img: defaultImg });
      if (!get(resp, 'data.done')) {
        console.warn('Error while adding data', resp);
      }
      dispatch({ type: 'SET_LOADING_UPLOAD', loading: false });
    });

    chart.on('remove', async (sender, nodeId, { newPidsForIds = {}, newStpidsForIds = {} }) => {
      dispatch({ type: 'SET_LOADING_UPLOAD', loading: true });
      const nodeRemoved = sender.get(nodeId);
      const result = await axios.delete(`/api/people?id=${nodeRemoved._id}`);
      if (!get(result, 'data.done')) {
        console.warn('Error while removing data');
      } else {
        // set new position for children of the removed node
        for (const id in newPidsForIds) {
          const nodeUpdated = sender.get(id);
          nodeUpdated.pids = newPidsForIds[id];
          await axios.put(`/api/people?id=${nodeUpdated._id}`, nodeUpdated);
        }

        for (const id in newStpidsForIds) {
          const nodeUpdated = sender.get(id);
          nodeUpdated.stpid = newPidsForIds[id];
          await axios.put(`/api/people?id=${nodeUpdated._id}`, nodeUpdated);
        }

      }
      dispatch({ type: 'SET_LOADING_UPLOAD', loading: false });
    });

    chart.editUI.on('field', (sender, args) => {
      if (args.name === '_id' || args.name === 'Add new field') return false;
    });

    chart.editUI.on('imageuploaded',  (sender, file, input) => {
      setInputFile(input);
      uploady.upload(file);
    });

    return () => {
      chart.destroy();
    }
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