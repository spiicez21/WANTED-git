const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const issueController = require('../controllers/issueController');
const bountyController = require('../controllers/bountyController');
const githubController = require('../controllers/githubController');

// User Routes
router.get('/users', userController.getAllUsers);
router.get('/users/:github_id', userController.getUserByGithubId);
router.post('/users', userController.createUser);

// Issue Routes
router.get('/issues', issueController.getAllIssues);
router.post('/issues', issueController.createIssue);

// GitHub REST API Routes
router.get('/github/repos', githubController.getUserRepos);
router.get('/github/issues/:owner/:repo', githubController.fetchRepoIssues);

// Bounty Routes
router.get('/bounties', bountyController.getAllBounties);
router.post('/bounties', bountyController.createBounty);

module.exports = router;
