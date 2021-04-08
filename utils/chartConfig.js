import OrgChart from '@balkangraph/orgchart.js';

export const chartConfig = {
  template: 'mila',
  enableDragDrop: true,
  assistantSeparation: 170,
  nodeMenu: {
    details: { text: 'Chi tiết' },
    edit: { text: 'Sửa' },
    add: { text: 'Thêm' },
    remove: { text: 'Xóa' }
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
        addManager: { text: 'Add new manager', icon: OrgChart.icon.add(24, 24, '#7A7A7A') },
        remove: { text: 'Remove department' },
        edit: { text: 'Edit department' },
      }
    }
  }
};
