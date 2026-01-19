/** @type {import('@graphql-codegen/cli').CodegenConfig} */
const config = {
  schema: [
    {
      'http://localhost:8080/v1/graphql': {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': 'mon-petit-secret',
            'X-Hasura-Role': 'user',
            'X-Hasura-User-Id': '1',
        },
      },
    },
  ],
  documents: ['./src/**/*.tsx', './src/**/*.ts'],

  ignoreNoDocuments: true,

  overwrite: true,
  generates: {
    './src/generated/graphql.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};

export default config;