import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-[#060606] text-[#EDEDED] font-clash selection:bg-[#D3E97A] selection:text-black flex flex-col">
            <Navbar />

            <div className="flex-1 px-8 md:px-32 lg:px-60 py-12 md:py-20">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-technor font-bold text-white mb-8 tracking-tighter">
                        PRIVACY <span className="text-[#D3E97A]">POLICY</span>
                    </h1>

                    <div className="space-y-12 text-zinc-400 leading-relaxed">
                        <section>
                            <h2 className="text-xl font-technor font-bold text-white mb-4 uppercase tracking-wider">1. Data We Collect</h2>
                            <p>
                                When you use WANTED.git, we collect information necessary to provide our services. This includes your GitHub username, public profile information, and data related to your performance in coding challenges. We use GitHub OAuth for authentication, and we do not store your GitHub password.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-technor font-bold text-white mb-4 uppercase tracking-wider">2. How We Use Data</h2>
                            <p>
                                We use your data to:
                            </p>
                            <ul className="list-disc list-inside mt-4 space-y-2">
                                <li>Verify your participation in coding challenges and duels.</li>
                                <li>Calculate your XP and rank on our leaderboards based on speed and efficiency.</li>
                                <li>Process reward payouts through our payment partners.</li>
                                <li>Improve our automated judging engine and user experience.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-technor font-bold text-white mb-4 uppercase tracking-wider">3. Data Sharing</h2>
                            <p>
                                We do not sell your personal data to third parties. We may share information with payment processors (like Stripe) to facilitate payouts, or as required by law. Your public performance data, XP, and rank are visible to other users on the platform.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-technor font-bold text-white mb-4 uppercase tracking-wider">4. Security</h2>
                            <p>
                                We take security seriously and implement industry-standard measures to protect your data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-technor font-bold text-white mb-4 uppercase tracking-wider">5. Cookies</h2>
                            <p>
                                We use cookies and similar technologies to maintain your session and improve your experience on our platform. You can control cookie settings through your browser.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-technor font-bold text-white mb-4 uppercase tracking-wider">6. Your Rights</h2>
                            <p>
                                You have the right to access, correct, or delete your data held by WANTED.git. To exercise these rights, please contact us through our community channels or support email.
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
