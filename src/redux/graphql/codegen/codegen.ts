import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: 'src/redux/graphql/codegen/schema.graphql',
    documents: 'src/redux/graphql/**/*',
    generates: {
        'src/redux/graphql/codegen/types/': {
            preset: 'client',
        },
    },
};

export default config;
