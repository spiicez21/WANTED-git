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
