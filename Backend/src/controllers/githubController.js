const axios = require('axios');
const db = require('../config/db');

exports.fetchRepoIssues = async (req, res) => {
    const { owner, repo } = req.params;

    // Ensure user is authenticated and has an access token
    if (!req.user || !req.user.access_token) {
        return res.status(401).json({ error: 'GitHub access token missing. Please re-login.' });
    }

    try {
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/issues`, {
            headers: {
                'Authorization': `Bearer ${req.user.access_token}`,
                'Accept': 'application/vnd.github.v3+json'
            },
            params: {
                state: 'open',
                per_page: 30,
                sort: 'created',
                direction: 'desc'
            }
        });

        // Map and filter (excluding PRs)
        const issues = response.data
            .filter(item => !item.pull_request)
            .map(issue => ({
                github_id: issue.id.toString(),
                issue_number: issue.number,
                title: issue.title,
                url: issue.html_url,
                labels: issue.labels.map(l => l.name),
                user: issue.user.login,
                created_at: issue.created_at
            }));

        res.json(issues);
    } catch (err) {
        console.error('Error fetching from GitHub:', err.response ? err.response.data : err.message);
        res.status(err.response ? err.response.status : 500).json({
            error: 'Failed to fetch issues from GitHub',
            details: err.response ? err.response.data : err.message
        });
    }
};

exports.getUserRepos = async (req, res) => {
    if (!req.user || !req.user.access_token) {
        return res.status(401).json({ error: 'GitHub access token missing' });
    }

    try {
        const response = await axios.get('https://api.github.com/user/repos', {
            headers: {
                'Authorization': `Bearer ${req.user.access_token}`,
                'Accept': 'application/vnd.github.v3+json'
            },
            params: {
                type: 'owner',
                sort: 'updated',
                per_page: 100
            }
        });

        const repos = response.data.map(repo => ({
            id: repo.id,
            name: repo.name,
            full_name: repo.full_name,
            private: repo.private,
            url: repo.html_url,
            description: repo.description
        }));

        res.json(repos);
    } catch (err) {
        res.status(err.response ? err.response.status : 500).json({ error: err.message });
    }
};

exports.getContributions = async (req, res) => {
    if (!req.user || !req.user.access_token) {
        return res.status(401).json({ error: 'GitHub access token missing' });
    }

    const query = `
            query($userName:String!) {
                user(login: $userName) {
                    contributionsCollection {
                        contributionCalendar {
                            totalContributions
                            weeks {
                                contributionDays {
                                    contributionCount
                                    date
                                    color
                                }
                            }
                        }
                    }
                }
            }
        `;

    const username = req.query.username || req.user.username;

    try {
        const response = await axios.post('https://api.github.com/graphql',
            {
                query: query,
                variables: { userName: username }
            },
            {
                headers: {
                    'Authorization': `Bearer ${req.user.access_token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.data.errors) {
            console.error('GitHub GraphQL Errors:', response.data.errors);
            return res.status(500).json({ error: 'GitHub API error', details: response.data.errors });
        }

        const calendar = response.data.data.user.contributionsCollection.contributionCalendar;
        res.json(calendar);
    } catch (err) {
        console.error('Error fetching contributions:', err.message);
        res.status(500).json({ error: 'Failed to fetch contribution data' });
    }
};

exports.fetchTopPublicIssues = async (req, res) => {
    // Dynamic parameters
    const minStars = req.query.min_stars || 10000;
    const language = req.query.language;
    const limit = req.query.limit || 30;

    // Simple cache key based on params
    const cacheKey = `topIssues_${minStars}_${language || 'all'}_${limit}`;
    const now = Date.now();

    if (global.issueCache && global.issueCache[cacheKey] && now - global.issueCache[cacheKey].timestamp < 300000) {
        // Return cached result (valid for 5 mins)
        console.log('Serving top issues from cache');
        return res.json(global.issueCache[cacheKey].data);
    }


    // Construct search query
    let q = `is:issue is:open stars:>${minStars} no:assignee`;
    if (language) {
        q += ` language:${language}`;
    }

    try {
        // We use the search API for this
        const response = await axios.get('https://api.github.com/search/issues', {
            headers: {
                // Use token if available to get higher rate limits, otherwise public access
                ...(req.user && req.user.access_token && { 'Authorization': `Bearer ${req.user.access_token}` }),
                'Accept': 'application/vnd.github.v3+json'
            },
            params: {
                q: q,
                sort: 'created',
                order: 'desc',
                per_page: limit
            }
        });

        const issues = response.data.items.map(issue => ({
            id: issue.id,
            number: issue.number,
            title: issue.title,
            html_url: issue.html_url,
            repository_url: issue.repository_url, // URL to fetch repo details if needed
            state: issue.state,
            created_at: issue.created_at,
            user: {
                login: issue.user.login,
                avatar_url: issue.user.avatar_url
            },
            labels: issue.labels.map(l => ({ name: l.name, color: l.color })),
            comments: issue.comments,
            // Extract repo name from URL for display (e.g., "facebook/react")
            repo_name: issue.repository_url.split('/').slice(-2).join('/')
        }));

        const responseData = {
            count: response.data.total_count,
            issues: issues
        };

        // Save to cache
        if (!global.issueCache) global.issueCache = {};
        global.issueCache[cacheKey] = {
            timestamp: Date.now(),
            data: responseData
        };

        res.json(responseData);
    } catch (err) {
        console.error('Error fetching top public issues:', err.response ? err.response.data : err.message);

        // If rate limited, return mock data
        if (err.response && (err.response.status === 403 || err.response.status === 429)) {
            console.warn('GitHub API rate limited. returning mock data.');
            const mockIssues = [
                {
                    id: 123456789,
                    number: 4829,
                    title: "[Mock] Fix hydration error in Suspense boundaries",
                    html_url: "https://github.com/facebook/react/issues/123",
                    repository_url: "https://api.github.com/repos/facebook/react",
                    state: "open",
                    created_at: new Date().toISOString(),
                    user: { login: "gaearon", avatar_url: "https://github.com/gaearon.png" },
                    labels: [{ name: "Bug", color: "d73a4a" }, { name: "React 19", color: "63a4ff" }],
                    comments: 42,
                    repo_name: "facebook/react"
                },
                {
                    id: 987654321,
                    number: 1337,
                    title: "[Mock] Improve image optimization",
                    html_url: "https://github.com/vercel/next.js/issues/1337",
                    repository_url: "https://api.github.com/repos/vercel/next.js",
                    state: "open",
                    created_at: new Date().toISOString(),
                    user: { login: "vercel_bot", avatar_url: "https://github.com/vercel.png" },
                    labels: [{ name: "Performance", color: "c5def5" }],
                    comments: 12,
                    repo_name: "vercel/next.js"
                }
            ];
            return res.json({ count: 2, issues: mockIssues });
        }

        res.status(err.response ? err.response.status : 500).json({
            error: 'Failed to fetch public issues',
            details: err.response ? err.response.data : err.message
        });
    }
};
