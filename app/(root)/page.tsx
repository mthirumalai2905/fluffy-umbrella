import React from 'react';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { dummyInterviews } from "@/constants";
import InterviewCard from "@/components/InterviewCard";

export default function Home() {
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice on real interview questions & get instant feedback
          </p>

          <Button asChild className="btn-primary">
            <Link href="/interview">Start an Interview</Link>
          </Button>

          <Image src="/robot.png" alt="robo-dude" width={400} height={400} className="max-sm:hidden" />

          <section className="flex flex-col gap-6 mt-8">
            <h2>Your Interviews</h2>

            <div className="interviews-section">
              <div className="flex flex-wrap gap-4">
                {dummyInterviews.length > 0 ? (
                  dummyInterviews.map((interview) => (
                    <InterviewCard key={interview.id} {...interview} />
                  ))
                ) : (
                  <p>No interviews available</p>
                )}
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-6 mt-8">
            <h2>Take an Interview</h2>

            <div className="interviews-section">
              <p>There are no interviews available</p>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}