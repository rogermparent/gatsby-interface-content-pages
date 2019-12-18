# Gatsby Interface: Content Pages

This is an extremely simple Gatsby plugin that does two things:

1. Adds an interface node type when added to `gatsby-config.js`
2. Exports its name and fields for use in inheritance or implementation.

The plugin takes no options, and because of the way Gatsby's Theme plugin resolution works this means only one instance will be added regardless of how many plugins or theme have it in their `gatsby-config`.

## ContentPage interface fields

### pagePath: String!

This is the path the resulting page should be written to.

### template: String!

This string represents the path to the component that this page will be rendered with.
While this interface plugin doesn't implement logic, convention is to make this either a path relative to the final project's base directory or an absolute path- this is how this project's sister plugin `gatsby-plugin-create-content-pages` uses it.

### parent: Node

This is the standard `parent` field all Nodes have, but it's explicitly defined here so it can be safely used in queries even when no `ContentPage` nodes exist.

Templates should use this field with conditional fragments to grab the content they need, if not with another interface.

For example: 

```graphql
contentPage {
  parent {
    ... on Mdx {
      body
      timeToRead
    }
  }
}
```
