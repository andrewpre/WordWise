import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">WordWise</h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Master vocabulary effortlessly with WordWise. 
                Prepare for tests like the ISEE or expand your lexicon with personalized tools that make learning engaging and effective. 
                Study smarter, not harder.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 pd:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          @ 2024 WordWise. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4"
            href="/terms-of-service"
            >
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4"
            href="/privacy-policy"
            >
            Privacy Policy
          </Link>

        </nav>
      </footer>
    </div>
  );
}
