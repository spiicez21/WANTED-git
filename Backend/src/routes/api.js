const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const githubController = require('../controllers/githubController');
const claimsController = require('../controllers/claimsController');
const problemController = require('../controllers/problemController');

// User Routes
router.get('/users', userController.getAllUsers);
router.get('/users/username/:username', userController.getUserByUsername);
router.get('/users/:github_id', userController.getUserByGithubId);
router.post('/users', userController.createUser);
router.put('/user/profile', userController.updateProfile);


// GitHub REST API Routes
router.get('/github/repos', githubController.getUserRepos);
router.get('/github/issues/:owner/:repo', githubController.fetchRepoIssues);
router.get('/github/contributions', githubController.getContributions);
router.get('/github/top-issues', githubController.fetchTopPublicIssues);


// Claims Routes
router.post('/claims', claimsController.createClaim);
router.get('/claims', claimsController.getMyClaims);

// Problem Routes
router.get('/problems', problemController.getAllProblems);
router.get('/problems/:id', problemController.getProblemById);

module.exports = router;
