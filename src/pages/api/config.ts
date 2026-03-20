import type { APIRoute } from 'astro';
import { getEnv, jsonResponse } from '../../utils/api-helpers';
import { isSameOrigin } from '../../utils/auth-helpers';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const username = getEnv('DUOLINGO_USERNAME');

  const jwt = getEnv('DUOLINGO_JWT');

  const configured =
    username !== '' &&
    jwt !== '' &&
    username !== 'your_duolingo_username' &&
    jwt !== 'your_jwt_token_here';

  return jsonResponse({ 
    configured,
    hints: {
      hasUsername: username !== '',
      hasJwt: jwt !== '',
      isDefaultUsername: username === 'your_duolingo_username',
      isDefaultJwt: jwt === 'your_jwt_token_here'
    }
  });
};
