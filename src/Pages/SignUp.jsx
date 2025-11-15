import React, { useEffect, useRef } from "react";
import "../style/Signup.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const SignUp = () => {
    const svgRef = useRef(null);

    // === SVG Line Animation ===
    useEffect(() => {
        const svgns = "http://www.w3.org/2000/svg";
        const root = svgRef.current;
        if (!root) return;

        const ease = 0.75;
        const total = 100;
        let pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        let leader = pointer;

        const handleMove = (e) => {
            pointer.x = e.clientX;
            pointer.y = e.clientY;
        };
        window.addEventListener("mousemove", handleMove);

        function createLine(leader, i) {
            const line = document.createElementNS(svgns, "line");
            root.appendChild(line);

            gsap.set(line, { x: -15, y: -15, alpha: (total - i) / total });

            gsap.to(line, {
                duration: 1000,
                x: "+=1",
                y: "+=1",
                repeat: -1,
                modifiers: {
                    x() {
                        let posX = gsap.getProperty(line, "x");
                        let leaderX = gsap.getProperty(leader, "x");
                        let x = posX + (leaderX - posX) * ease;
                        line.setAttribute("x2", leaderX - x);
                        return x;
                    },
                    y() {
                        let posY = gsap.getProperty(line, "y");
                        let leaderY = gsap.getProperty(leader, "y");
                        let y = posY + (leaderY - posY) * ease;
                        line.setAttribute("y2", leaderY - y);
                        return y;
                    },
                },
            });

            return line;
        }

        for (let i = 0; i < total; i++) {
            leader = createLine(leader, i);
        }

        // cleanup
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    

    // === Page Animations ===
    useGSAP(() => {
        const tl = gsap.timeline();
        gsap.from(".heading", {
            opacity: 0,
            duration: 2.2,
        });

        tl.from(".signup-box", {
            y: 800,
            opacity: 0,
            scale: 0.5,
            duration: 2.5,
            ease: "elastic.out(1,0.5)",
        });
    });

    return (
        <div className="bg-zinc-900 w-screen h-screen flex flex-col items-center justify-center overflow-hidden relative">
            <svg ref={svgRef} className="absolute top-0 left-0 w-full h-full z-0  "></svg>

            <div className="heading mb-16 -mt-20 z-10">
                <h1 className="gradient-text text-8xl">PixelTalk</h1>
            </div>

            <div className="signup-box px-10 py-10 bg-zinc-800 rounded-3xl flex flex-col items-center shadow-2xl z-10">
                <h2 className="subheading text-4xl text-white mb-8">Sign Up</h2>

                <form className="flex flex-col items-center">
                    <div className="signup-inputs flex flex-col gap-4 w-full">
                        <input
                            type="text"
                            placeholder="Username"
                            className="inputs px-4 py-3 rounded-2xl border border-gray-600 bg-zinc-900 text-white placeholder-gray-400 focus:outline-none"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="inputs px-4 py-3 rounded-2xl border border-gray-600 bg-zinc-900 text-white placeholder-gray-400 focus:outline-none"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="inputs px-4 py-3 rounded-2xl border border-gray-600 bg-zinc-900 text-white placeholder-gray-400 focus:outline-none"
                        />
                    </div>

                    <p className="mt-5 text-zinc-400">
                        Already have an account?{" "}
                        <a href="#" className="text-blue-500">
                            Login
                        </a>
                    </p>

                    <div className="submit-btn mt-5">
                        <button className="glow-on-hover rounded-2xl text-white">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
