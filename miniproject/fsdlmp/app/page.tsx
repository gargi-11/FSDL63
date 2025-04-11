import Link from "next/link"
import { ArrowRight, Leaf, Shield, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-olive-green/10">
        <Link className="flex items-center justify-center" href="#">
          <Leaf className="h-6 w-6 text-olive-green" />
          <span className="ml-2 text-xl font-bold text-olive-green">CarbonTrack</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            How It Works
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
        </nav>
        <div className="ml-4">
          <Button className="bg-olive-green hover:bg-olive-green/90 text-white">Connect Wallet</Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-beige/30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-olive-green">
                  Track Your Carbon Footprint on the Blockchain
                </h1>
                <p className="max-w-[600px] text-gray-700 md:text-xl">
                  Log your personal CO₂ reductions, earn tokenized "green coins," and redeem them at eco-friendly
                  brands. All transparently recorded on the blockchain.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-olive-green hover:bg-olive-green/90 text-white">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="border-olive-green text-olive-green hover:bg-olive-green/10">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-[500px] aspect-video rounded-xl bg-olive-green/20 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Leaf className="h-24 w-24 text-olive-green opacity-50" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-olive-green px-3 py-1 text-sm text-white">How It Works</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-olive-green">
                  Track, Earn, Redeem
                </h2>
                <p className="max-w-[900px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our blockchain-based platform makes it easy to track your carbon-reducing activities and get rewarded
                  for your efforts.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="border-olive-green/20">
                <CardHeader>
                  <Leaf className="h-10 w-10 text-olive-green mb-2" />
                  <CardTitle className="text-olive-green">Track Activities</CardTitle>
                  <CardDescription>
                    Log your eco-friendly activities like biking instead of driving, reducing energy consumption, or
                    planting trees.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700">
                    Our smart algorithm calculates the exact amount of CO₂ you've saved with each activity.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-olive-green/20">
                <CardHeader>
                  <Zap className="h-10 w-10 text-olive-green mb-2" />
                  <CardTitle className="text-olive-green">Earn Green Coins</CardTitle>
                  <CardDescription>
                    Get rewarded with tokenized "green coins" for your positive environmental impact.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700">
                    Your rewards are minted as ERC-20 tokens on the Ethereum blockchain, ensuring transparency and
                    ownership.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-olive-green/20">
                <CardHeader>
                  <Shield className="h-10 w-10 text-olive-green mb-2" />
                  <CardTitle className="text-olive-green">Redeem Rewards</CardTitle>
                  <CardDescription>
                    Use your earned green coins at partner eco-brands for discounts and exclusive products.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700">
                    Our growing network of sustainable brands accepts green coins, creating a circular economy for
                    environmental action.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-beige/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-olive-green">Join Our Community</h2>
                <p className="max-w-[900px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Be part of the solution to climate change. Start tracking your carbon footprint today.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                  <input
                    className="flex h-10 w-full rounded-md border border-olive-green/20 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-olive-green/40"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button className="bg-olive-green hover:bg-olive-green/90 text-white">Subscribe</Button>
                </form>
                <p className="text-xs text-gray-500">By subscribing, you agree to our terms and privacy policy.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t items-center px-4 md:px-6 border-olive-green/10">
        <p className="text-xs text-gray-500">© 2023 CarbonTrack. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
