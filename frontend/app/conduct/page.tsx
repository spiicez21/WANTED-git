import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ConductPage() {
    return (
        <main className="min-h-screen bg-[#060606] text-[#EDEDED] font-clash selection:bg-[#D3E97A] selection:text-black flex flex-col">
            <Navbar />

            <div className="flex-1 px-8 md:px-32 lg:px-60 py-12 md:py-20">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-technor font-bold text-white mb-8 tracking-tighter">
                        CODE OF <span className="text-[#D3E97A]">CONDUCT</span>
                    </h1>

                    <div className="space-y-12 text-zinc-400 leading-relaxed">
                        <section>
                            <h2 className="text-xl font-technor font-bold text-white mb-4 uppercase tracking-wider">Our Pledge</h2>
                            <p>
                                In the interest of fostering an open and welcoming environment, we as duelists and platform staff pledge to making participation in our arena and our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-technor font-bold text-white mb-4 uppercase tracking-wider">Our Standards</h2>
                            <p>Examples of behavior that contributes to creating a positive environment include:</p>
                            <ul className="list-disc list-inside mt-4 space-y-2">
                                <li>Using welcoming and inclusive language.</li>
                                <li>Being respectful of differing viewpoints and experiences.</li>
                                <li>Gracefully accepting constructive criticism.</li>
                                <li>Focusing on what is best for the community.</li>
                                <li>Showing empathy towards other community members.</li>
                            </ul>

                            <p className="mt-8">Examples of unacceptable behavior by participants include:</p>
                            <ul className="list-disc list-inside mt-4 space-y-2 text-red-400/80">
                                <li>The use of sexualized language or imagery and unwelcome sexual attention or advances.</li>
                                <li>Trolling, insulting/derogatory comments, and personal or political attacks.</li>
                                <li>Public or private harassment.</li>
                                <li>Publishing others' private information without explicit permission.</li>
                                <li>Other conduct which could reasonably be considered inappropriate in a professional setting.</li>
                            </ul>
                        </section>

                        <section>
                            Platform administrators are responsible for clarifying the standards of acceptable behavior and are expected to take appropriate and fair corrective action in response to any instances of unacceptable behavior.
                        </section>

                        <section>
                            <h2 className="text-xl font-technor font-bold text-white mb-4 uppercase tracking-wider">Enforcement</h2>
                            <p>
                                Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team. All complaints will be reviewed and investigated and will result in a response that is deemed necessary and appropriate to the circumstances. The project team is obligated to maintain confidentiality with regard to the reporter of an incident.
                            </p>
                        </section>

                        <div className="pt-12 border-t border-white/5 text-xs text-zinc-600">
                            Adapted from the Contributor Covenant, version 1.4
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
