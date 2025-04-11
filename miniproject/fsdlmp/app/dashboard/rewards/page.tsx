"use client"

import { useState } from "react"
import Link from "next/link"
import { BarChart, Calendar, Check, Leaf, Search, Settings, ShoppingBag, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function RewardsPage() {
  const [showAlert, setShowAlert] = useState(false)

  const handleRedeem = () => {
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 3000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-white">
        <div className="flex h-16 items-center px-4 sm:px-6">
          <Link className="flex items-center justify-center" href="/">
            <Leaf className="h-6 w-6 text-olive-green" />
            <span className="ml-2 text-xl font-bold text-olive-green">CarbonTrack</span>
          </Link>
          <nav className="ml-auto flex items-center gap-4 sm:gap-6">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <BarChart className="h-5 w-5 text-olive-green" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard/activities">
                <Calendar className="h-5 w-5 text-olive-green" />
                <span className="sr-only">Activities</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard/rewards">
                <ShoppingBag className="h-5 w-5 text-olive-green" />
                <span className="sr-only">Rewards</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard/settings">
                <Settings className="h-5 w-5 text-olive-green" />
                <span className="sr-only">Settings</span>
              </Link>
            </Button>
            <Avatar>
              <AvatarImage src="" alt="User" />
              <AvatarFallback className="bg-olive-green text-white">JD</AvatarFallback>
            </Avatar>
          </nav>
        </div>
      </header>
      <main className="flex-1 bg-beige/10">
        <div className="container py-6 md:py-12">
          {showAlert && (
            <Alert className="mb-6 border-green-200 bg-green-50">
              <Check className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-600">Reward Redeemed!</AlertTitle>
              <AlertDescription className="text-green-700">
                Your reward has been successfully redeemed. Check your email for details.
              </AlertDescription>
              <Button
                variant="outline"
                size="sm"
                className="ml-auto border-green-200 text-green-600 hover:bg-green-100"
                onClick={() => setShowAlert(false)}
              >
                Dismiss
              </Button>
            </Alert>
          )}

          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-olive-green">Rewards Marketplace</h1>
                <p className="text-muted-foreground">Redeem your green coins for eco-friendly products and services</p>
              </div>
              <div className="flex items-center gap-4">
                <Card className="border-olive-green/20">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Wallet className="h-5 w-5 text-olive-green" />
                    <div>
                      <p className="text-sm font-medium">Available Balance</p>
                      <p className="text-xl font-bold text-olive-green">1,240 coins</p>
                    </div>
                  </CardContent>
                </Card>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search rewards"
                    className="pl-8 w-[200px] bg-white border-olive-green/20"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="border-olive-green/20">
                <CardHeader className="pb-4">
                  <div className="aspect-video relative rounded-md overflow-hidden bg-olive-green/10">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Leaf className="h-12 w-12 text-olive-green opacity-50" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <Badge className="mb-2 bg-olive-green text-white hover:bg-olive-green/90">Eco Fashion</Badge>
                  <CardTitle className="text-olive-green">$20 Off Sustainable Clothing</CardTitle>
                  <CardDescription className="mt-2">
                    Get $20 off your next purchase at EcoThreads, a sustainable clothing brand.
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <div className="text-lg font-bold text-olive-green">500 coins</div>
                  <Button className="bg-olive-green hover:bg-olive-green/90 text-white" onClick={handleRedeem}>
                    Redeem
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-olive-green/20">
                <CardHeader className="pb-4">
                  <div className="aspect-video relative rounded-md overflow-hidden bg-olive-green/10">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Leaf className="h-12 w-12 text-olive-green opacity-50" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <Badge className="mb-2 bg-olive-green text-white hover:bg-olive-green/90">Home & Garden</Badge>
                  <CardTitle className="text-olive-green">Bamboo Cutlery Set</CardTitle>
                  <CardDescription className="mt-2">
                    Reusable bamboo cutlery set with carrying case, perfect for on-the-go meals.
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <div className="text-lg font-bold text-olive-green">350 coins</div>
                  <Button className="bg-olive-green hover:bg-olive-green/90 text-white" onClick={handleRedeem}>
                    Redeem
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-olive-green/20">
                <CardHeader className="pb-4">
                  <div className="aspect-video relative rounded-md overflow-hidden bg-olive-green/10">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Leaf className="h-12 w-12 text-olive-green opacity-50" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <Badge className="mb-2 bg-olive-green text-white hover:bg-olive-green/90">Food & Drink</Badge>
                  <CardTitle className="text-olive-green">Organic Coffee Subscription</CardTitle>
                  <CardDescription className="mt-2">
                    One month subscription to premium organic, fair-trade coffee delivered to your door.
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <div className="text-lg font-bold text-olive-green">800 coins</div>
                  <Button className="bg-olive-green hover:bg-olive-green/90 text-white" onClick={handleRedeem}>
                    Redeem
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-olive-green/20">
                <CardHeader className="pb-4">
                  <div className="aspect-video relative rounded-md overflow-hidden bg-olive-green/10">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Leaf className="h-12 w-12 text-olive-green opacity-50" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <Badge className="mb-2 bg-olive-green text-white hover:bg-olive-green/90">Beauty</Badge>
                  <CardTitle className="text-olive-green">Zero-Waste Skincare Set</CardTitle>
                  <CardDescription className="mt-2">
                    Complete skincare set with plastic-free packaging and natural ingredients.
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <div className="text-lg font-bold text-olive-green">650 coins</div>
                  <Button className="bg-olive-green hover:bg-olive-green/90 text-white" onClick={handleRedeem}>
                    Redeem
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-olive-green/20">
                <CardHeader className="pb-4">
                  <div className="aspect-video relative rounded-md overflow-hidden bg-olive-green/10">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Leaf className="h-12 w-12 text-olive-green opacity-50" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <Badge className="mb-2 bg-olive-green text-white hover:bg-olive-green/90">Transportation</Badge>
                  <CardTitle className="text-olive-green">Electric Scooter Rental</CardTitle>
                  <CardDescription className="mt-2">
                    Free 3-day rental of an electric scooter from GreenRide, our mobility partner.
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <div className="text-lg font-bold text-olive-green">1,200 coins</div>
                  <Button className="bg-olive-green hover:bg-olive-green/90 text-white" onClick={handleRedeem}>
                    Redeem
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-olive-green/20">
                <CardHeader className="pb-4">
                  <div className="aspect-video relative rounded-md overflow-hidden bg-olive-green/10">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Leaf className="h-12 w-12 text-olive-green opacity-50" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <Badge className="mb-2 bg-olive-green text-white hover:bg-olive-green/90">Experiences</Badge>
                  <CardTitle className="text-olive-green">Tree Planting Workshop</CardTitle>
                  <CardDescription className="mt-2">
                    Join a guided tree planting workshop in your local community forest.
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <div className="text-lg font-bold text-olive-green">400 coins</div>
                  <Button className="bg-olive-green hover:bg-olive-green/90 text-white" onClick={handleRedeem}>
                    Redeem
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
