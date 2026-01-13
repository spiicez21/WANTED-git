const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const issueController = require('../controllers/issueController');
const bountyController = require('../controllers/bountyController');
const githubController = require('../controllers/githubController');
const claimsController = require('../controllers/claimsController');

// User Routes
router.get('/users', userController.getAllUsers);
router.get('/users/username/:username', userController.getUserByUsername);
router.get('/users/:github_id', userController.getUserByGithubId);
router.post('/users', userController.createUser);
router.put('/user/profile', userController.updateProfile);

// Issue Routes
router.get('/issues', issueController.getAllIssues);
router.get('/issues/:id', issueController.getIssueById);
router.post('/issues', issueController.createIssue);
router.post('/issues/convert', issueController.convertIssue);

// GitHub REST API Routes
router.get('/github/repos', githubController.getUserRepos);
router.get('/github/issues/:owner/:repo', githubController.fetchRepoIssues);
router.get('/github/contributions', githubController.getContributions);
router.get('/github/top-issues', githubController.fetchTopPublicIssues);

// Bounty Routes
router.get('/bounties', bountyController.getAllBounties);
router.post('/bounties', bountyController.createBounty);

// Claims Routes
router.post('/claims', claimsController.createClaim);
router.get('/claims', claimsController.getMyClaims);

module.exports = router;
