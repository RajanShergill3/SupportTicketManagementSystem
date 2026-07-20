import { testApi } from '../helpers';

describe('GET /health', () => {
  it('returns 200 with success=true and status=ok', async () => {
    const response = await testApi.get('/health');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.status).toBe('ok');
  });
});
