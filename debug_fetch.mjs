import fs from 'fs';

const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjYzMDcyMDAwMDAsImlhdCI6MCwic3ViIjo5NjAyOTczMzF9.TWkdPhk8w63lp1voqaMGY1P-uLkiBmff-jfantry7ZY';
const USERNAME = 'xuench';
const USER_ID = '960297331';

async function test() {
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Cookie': `jwt_token=${JWT}`,
        'Authorization': `Bearer ${JWT}`,
        'Referer': 'https://www.duolingo.com/learn',
        'Origin': 'https://www.duolingo.com'
    };

    try {
        console.log('Fetching public search...');
        const r1 = await fetch(`https://www.duolingo.com/2017-06-30/users?username=${USERNAME}`, { headers });
        const json1 = await r1.json();
        fs.writeFileSync('f:/duodash/test_search.json', JSON.stringify(json1, null, 2));
        console.log(`Search status: ${r1.status}`);

        console.log('Fetching user details by ID...');
        const r2 = await fetch(`https://www.duolingo.com/2017-06-30/users/${USER_ID}`, { headers });
        const text2 = await r2.text();
        fs.writeFileSync('f:/duodash/test_details.json', text2);
        console.log(`Details status: ${r2.status}`);

        console.log('Fetching fields query...');
        const FIELDS = 'id,username,gems,lingots,totalGems,gemsTotalCount,tier,league_tier,leaderboard_league,trackingProperties,hasPlus,xpGains';
        const r3 = await fetch(`https://www.duolingo.com/2017-06-30/users?id=${USER_ID}&fields=${FIELDS}`, { headers });
        const json3 = await r3.json();
        fs.writeFileSync('f:/duodash/test_fields.json', JSON.stringify(json3, null, 2));
        console.log(`Fields status: ${r3.status}`);

    } catch (err) {
        console.error('Fetch error:', err);
    }
}

test();
