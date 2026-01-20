import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-[#060606] text-[#EDEDED] font-clash selection:bg-[#D3E97A] selection:text-black flex flex-col">
            <Navbar />

            <div className="flex-1 px-8 md:px-32 lg:px-60 py-12 md:py-20">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-technor font-bold text-white mb-8 tracking-tighter">
                        TERMS OF <span className="text-[#D3E97A]">SERVICE</span>
                    </h1>

                    <div className="space-y-12 text-zinc-400 leading-relaxed">
                        <section>
                            <h2 className="text-xl font-technor font-bold text-white mb-4 uppercase tracking-wider">1. Acceptance of Terms</h2>
                            <p>
                                By accessing or using WANTED.git, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform. These terms govern your use of our competitive coding arena and all related services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-technor font-bold text-white mb-4 uppercase tracking-wider">2. Description of Service</h2>
                            <p>
                                WANTED.git is a platform that hosts, ranks, and facilitates competitive coding challenges. We provide a marketplace where contributors can earn Experience Points (XP) and Credits (CR) for solving these challenges in Solo or Duel modes. Our services include automated judging, real-time matchmaking, and community reputation systems.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-technor font-bold text-white mb-4 uppercase tracking-wider">3. User Accounts</h2>
                            <p>
                                To use most features of WANTED.git, you must connect your GitHub account. You are responsible for maintaining the security of your account and for all activities that occur under your account. We reserve the right to suspend or terminate accounts that violate our terms or engage in fraudulent activity.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-technor font-bold text-white mb-4 uppercase tracking-wider">4. Challenge Rewards and Payouts</h2>
                            <p>
                                Challenge rewards (Credits) are only eligible for payout after a solution is successfully submitted and verified by our automated judging engine. We reserve the right to withhold payouts if we detect gaming, botting, cheating in duels, or any attempt to exploit the reward system.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-technor font-bold text-white mb-4 uppercase tracking-wider">5. Intellectual Property</h2>
                            <p>
                                All code submitted through WANTED.git challenges remains the property of the user but grants WANTED.git a license to use it for judging and educational purposes. By submitting a solution, you represent that you have the right to contribute that code and that it does not infringe on any third-party intellectual property rights.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-technor font-bold text-white mb-4 uppercase tracking-wider">6. Limitation of Liability</h2>
                            <p>
                                WANTED.git is provided "as is" without any warranties. We are not liable for any damages arising from your use of the platform, including but not limited to lost data, lost earnings, or bugs in the software.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-technor font-bold text-white mb-4 uppercase tracking-wider">7. Data Availability & GitHub Affiliation</h2>
                            <p>
                                WANTED.git is an independent platform and is not affiliated with, endorsed by, or sponsored by GitHub, Inc. We utilize public GitHub APIs to facilitate authentication and profile display in accordance with GitHub's Terms of Service.
                            </p>
                        </section>

                        <div className="pt-12 border-t border-white/5 text-xs text-zinc-600">
                            Last Updated: January 20, 2026
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
