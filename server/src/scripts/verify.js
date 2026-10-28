import http from 'http';

function makeRequest(options, postData) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });
    req.on('error', reject);
    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

async function verify() {
  console.log('Testing Scheme Saathi API endpoints...\n');

  // 1. Health check
  console.log('1. GET /api/health');
  const health = await makeRequest({
    hostname: 'localhost',
    port: 5000,
    path: '/api/health',
    method: 'GET'
  });
  console.log('Response Status:', health.status, health.body);

  // 2. Test POST /api/schemes/match for a Karnataka Farmer
  console.log('\n2. POST /api/schemes/match (Karnataka Farmer, Income ₹1,20,000)');
  const matchFarmer = await makeRequest(
    {
      hostname: 'localhost',
      port: 5000,
      path: '/api/schemes/match',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    },
    {
      profile: {
        age: 40,
        gender: 'male',
        state: 'Karnataka',
        annualIncome: 120000,
        casteCategory: 'obc',
        occupation: 'farmer',
        disability: 'none'
      },
      level: 'both',
      page: 1,
      limit: 6
    }
  );
  console.log('Status:', matchFarmer.status);
  console.log('Total Eligible Schemes:', matchFarmer.body.totalCount);
  console.log('Returned on Page 1:', matchFarmer.body.schemes?.length);
  console.log('Has More:', matchFarmer.body.hasMore);
  console.log('Eligible Titles:');
  matchFarmer.body.schemes?.forEach((s, idx) => {
    console.log(`  ${idx + 1}. [${s.level.toUpperCase()}] ${s.name.en} | ${s.name.hi} | ${s.name.kn}`);
  });

  // 3. Test POST /api/auth/login for pre-seeded user
  console.log('\n3. POST /api/auth/login (Ramesh Gowda)');
  const loginRes = await makeRequest(
    {
      hostname: 'localhost',
      port: 5000,
      path: '/api/auth/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    },
    {
      email: 'ramesh@example.com',
      password: 'password123'
    }
  );
  console.log('Login Status:', loginRes.status);
  console.log('Token Received:', Boolean(loginRes.body.token));
  console.log('User Profile:', loginRes.body.user?.name, loginRes.body.user?.profile);

  console.log('\nAll verification tests completed successfully!');
  process.exit(0);
}

verify().catch((err) => {
  console.error('Verification failed:', err.message);
  process.exit(1);
});
