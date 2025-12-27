"use client";
import React from "react";

export default function ProjectsApp() {
    return (
        <div className="p-6 h-full">
            <h2 className="text-2xl font-bold mb-4">Projects</h2>
            <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-video rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors">
                        <span className="text-muted-foreground">Project {i}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
