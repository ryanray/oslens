import fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyEnv from '@fastify/env';
import { listCommitsByProject, searchProjectsByOrg } from './github/GithubService';
import { FastifyRequest } from 'fastify/types/request';
import { FastifyReply } from 'fastify/types/reply';

(async () => {

  const schema = {
    type: 'object',
    required: [ 'GITHUB_TOKEN' ],
    properties: {
      GITHUB_TOKEN: {
        type: 'string',
      }
    }
  };

  const options = {
    confKey: 'config', // optional, default: 'config'
    schema: schema,
    dotenv: true,
  };

  const server = fastify({
    ignoreTrailingSlash: true,
    logger: true,
  });

  await server.register(cors, {
    origin: (origin, cb) => {
      // TODO currently allows all origins - definitely want to revisit this before deploying to production
      cb(null, true);
    }
  }).register(fastifyEnv, options);

  server.get('/search', async (request: FastifyRequest, reply: FastifyReply) => {
    // @ts-expect-error TS unable to resolve these fastify query params
    const orgName = request?.query?.orgName;
    if (!orgName) {
      return reply.code(422).send('Organization name is required.');
    }
    const results = await searchProjectsByOrg({ orgName: orgName });
    return results;
  });

  server.get('/commits/:orgName/:repoName', async (request: FastifyRequest, reply: FastifyReply) => {
    // @ts-expect-error TS unable to resolve these fastify params
    const orgName = request?.params?.orgName;
    // @ts-expect-error TS unable to resolve these fastify params
    const repoName = request?.params?.repoName;
    if (!orgName) {
      return reply.code(422).send('Organization name is required.');
    }
    if (!repoName) {
      return reply.code(422).send('Repository name is required.');
    }
    const results = await listCommitsByProject({ orgName, repoName, });
    return results;
  });

  server.listen({ port: 8080 }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
})();
