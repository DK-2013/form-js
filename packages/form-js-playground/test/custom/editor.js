class CustomPropertiesProvider {
  constructor(propertiesPanel) {
    propertiesPanel.registerProvider(this, 500);
  }

  getGroups(field, editField) {
    return (groups) => {

      if (field.type !== 'range') {
        return groups;
      }
      const generalIdx = findGroupIdx(groups, 'general');
      const generalGroup = groups.find(({ id }) => id === 'general');
      let decimalDigitsEntry;
      generalGroup.entries = generalGroup.entries.filter((entry) => {
        if (entry.id === 'undefined-decimalDigits') {
          decimalDigitsEntry = entry;
          return false;
        }
        return true;
      });

      groups.splice(generalIdx + 1, 0, {
        id: 'range',
        label: 'Range',
        entries: RangeEntries(field, editField, decimalDigitsEntry)
      });

      return groups;
    };
  }
}

CustomPropertiesProvider.$inject = [ 'propertiesPanel' ];

function RangeEntries(field, editField, { component, isEdited }) {
  return [
    {
      id: 'range-min',
      component,
      field,
      editField,
      isEdited,
      path: [ 'range', 'min' ],
      label: 'Minimum'
    },
    {
      id: 'range-max',
      component,
      field,
      editField,
      isEdited,
      path: [ 'range', 'max' ],
      label: 'Maximum'
    },
    {
      id: 'range-step',
      component,
      field,
      editField,
      isEdited,
      path: [ 'range', 'step' ],
      label: 'Step'
    },
  ];
}


export default {
  __init__: [ 'customPropertiesProvider' ],
  customPropertiesProvider: [ 'type', CustomPropertiesProvider ]
};

// helper //////////////////////

function findGroupIdx(groups, id) {
  return groups.findIndex(g => g.id === id);
}