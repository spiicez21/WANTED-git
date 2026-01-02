const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const issueController = require('../controllers/issueController');
const bountyController = require('../controllers/bountyController');
const githubController = require('../controllers/githubController');

// User Routes
router.get('/users', userController.getAllUsers);
router.get('/users/username/:username', userController.getUserByUsername);
router.get('/users/:github_id', userController.getUserByGithubId);
router.post('/users', userController.createUser);
router.put('/user/profile', userController.updateProfile);

// Issue Routes
router.get('/issues', issueController.getAllIssues);
router.post('/issues', issueController.createIssue);

// GitHub REST API Routes
router.get('/github/repos', githubController.getUserRepos);
router.get('/github/issues/:owner/:repo', githubController.fetchRepoIssues);
router.get('/github/contributions', githubController.getContributions);

// Bounty Routes
router.get('/bounties', bountyController.getAllBounties);
router.post('/bounties', bountyController.createBounty);

module.exports = router;
