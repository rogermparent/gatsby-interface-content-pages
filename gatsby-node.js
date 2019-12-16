const path = require("path");

const {
  contentPageInterfaceName,
  buildContentPageType
} = require("./type-definitions");

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;

  const types = [
    schema.buildInterfaceType(
      buildContentPageType({
        name: contentPageInterfaceName,
        extensions: {
          nodeInterface: {}
        }
      })
    )
  ];

  createTypes(types);
};
