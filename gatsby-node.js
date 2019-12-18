const path = require("path");
const typeDefinition = require("./index");

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;

  const types = [
    schema.buildInterfaceType({
      ...typeDefinition,
      extensions: {
        nodeInterface: {}
      }
    })
  ];

  createTypes(types);
};
