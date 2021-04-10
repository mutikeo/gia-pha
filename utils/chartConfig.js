import OrgChart from '@balkangraph/orgchart.js';

export const chartConfig = {
  template: 'mila',
  enableDragDrop: true,
  assistantSeparation: 170,
  align: OrgChart.ORIENTATION,
  toolbar: {
    fullScreen: true,
    zoom: true,
    fit: true,
    expandAll: true
  },
  nodeBinding: {
    field_0: 'name',
    field_1: 'title',
    img_0: 'img'
  },
  tags: {
    'top-management': {
      template: 'invisibleGroup',
      subTreeConfig: {
        orientation: OrgChart.orientation.bottom,
        collapse: {
          level: 1
        }
      }
    },
    'it-team': {
      subTreeConfig: {
        layout: OrgChart.mixed,
        collapse: {
          level: 1
        }
      },
    },
    'hr-team': {
      subTreeConfig: {
        layout: OrgChart.treeRightOffset,
        collapse: {
          level: 1
        }
      },
    },
    'sales-team': {
      subTreeConfig: {
        layout: OrgChart.treeLeftOffset,
        collapse: {
          level: 1
        }
      },
    },
    'department': {
      template: 'group',
    }
  }
};
