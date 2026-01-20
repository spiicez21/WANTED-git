/**
 * Judging Service
 * Handles score calculation and submission evaluation.
 */

const calculateScore = (correctness, efficiency, speed) => {
    /**
     * Score calculation formula:
     * final_score = correctness * 0.6 + efficiency * 0.25 + speed * 0.15
     * 
     * correctness: 1.0 (pass all) or 0.0 (fail any)
     * efficiency: 1.0 (optimal) to 0.0 (baseline) based on time/memory
     * speed: 1.0 (instant) to 0.0 (timeout) based on duel/session duration
     */
    return (correctness * 0.6) + (efficiency * 0.25) + (speed * 0.15);
};

const evaluateSubmission = async (submissionId, code, problem, startTime) => {
    // In a real environment, this would trigger a Docker sandbox execution.
    // For this MVP, we will simulate the judging process.

    console.log(`Judging submission ${submissionId}...`);

    // Simulate execution delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Default simulation results (replace with real sandbox output in production)
    const isCorrect = true; // Simulated
    const executionTime = Math.floor(Math.random() * 500) + 50; // ms
    const memoryUsage = Math.floor(Math.random() * 20000) + 1024; // KB

    // Efficiency calculation (simplified)
    const efficiency = Math.max(0, 1 - (executionTime / problem.time_limit));

    // Speed calculation (time from duel start to submission)
    const now = new Date();
    const timeTaken = now - startTime;
    const speed = Math.max(0, 1 - (timeTaken / (10 * 60 * 1000))); // 10 min threshold

    const finalScore = calculateScore(isCorrect ? 1.0 : 0.0, efficiency, speed);

    return {
        status: isCorrect ? 'ACCEPTED' : 'WRONG_ANSWER',
        executionTime,
        memoryUsage,
        score: finalScore.toFixed(2)
    };
};

module.exports = {
    calculateScore,
    evaluateSubmission
};
