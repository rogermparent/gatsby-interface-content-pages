const path = require("path");

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;

  createTypes(`interface ContentPage @nodeInterface {
      id: ID!
      pagePath: String!
      template: String
  }`);
};

exports.createPages = async (
  { graphql, actions, reporter, store },
  themeOptions
) => {
  const { createPage } = actions;
  const {
    createPages = true,
    basePath = "/",
    templateDir = "src/templates",
    defaultTemplate = "default"
  } = themeOptions;

  if (!createPages) return;

  const programDir = store.getState().program.directory;
  const absoluteTemplateDir = path.join(programDir, templateDir);

  const result = await graphql(`
    {
      allContentPage {
        edges {
          node {
            id
            pagePath
            template
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic(result.errors);
  }

  const { allContentPage } = result.data;
  const pages = allContentPage.edges;

  /*
     Try to resolve the default template for the base project.
     If that can't be done, fall back to this theme's default template.
  */
  const defaultTemplateComponent = require.resolve(
    path.join(absoluteTemplateDir, defaultTemplate)
  );

  // Create a page for each ContentPage
  for ({ node: page } of pages) {
    const { pagePath, template } = page;

    if (pagePath) {
      // Get the absolute path of this page's template
      const pageComponent = template
        ? require.resolve(path.join(absoluteTemplateDir, template))
        : defaultTemplateComponent;

      createPage({
        path: pagePath,
        component: pageComponent,
        context: {
          id: page.id
        }
      });
    }
  }
};
