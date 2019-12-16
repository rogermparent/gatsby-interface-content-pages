const contentPageInterfaceName = `ContentPage`;

const contentPageFields = {
  id: `ID!`,
  pagePath: `String!`,
  template: `String!`,
  parent: `Node`
};

const buildContentPageType = overrides => ({
  ...overrides,
  fields:
    overrides.fields !== undefined
      ? {
          ...contentPageFields,
          ...overrides.fields
        }
      : contentPageFields
});

module.exports = {
  contentPageInterfaceName,
  contentPageFields,
  buildContentPageType
};
