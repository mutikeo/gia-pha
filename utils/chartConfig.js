import OrgChart from '@balkangraph/orgchart.js';

export const chartConfig = {
  template: 'mila',
  enableDragDrop: false,
  assistantSeparation: 170,
  scaleInitial: OrgChart.match.boundary,
  align: OrgChart.ORIENTATION,
  orderBy: {
    field: "Con thứ"
  },
  collapse: {
    level: 2
  },
  toolbar: {
    fullScreen: true,
    zoom: true,
    fit: true,
    expandAll: true
  },
  nodeBinding: {
    field_0: 'Họ và tên',
    field_1: 'NS-NM',
    img_0: 'Hình ảnh'
  },
  tags: {
    woman: {
      template: 'ana',
    }
  }
};
