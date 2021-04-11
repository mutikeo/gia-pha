import OrgChart from '@balkangraph/orgchart.js';

export const chartConfig = {
  template: 'mila',
  enableDragDrop: true,
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
    field_0: 'name',
    field_1: 'title',
    img_0: 'img'
  },
  tags: {
    woman: {
      template: 'ana',
    }
  }
};
