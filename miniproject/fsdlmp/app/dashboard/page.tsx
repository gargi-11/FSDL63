"use client"

import { useState } from "react"
import Link from "next/link"
import { BarChart, Bike, Calendar, Leaf, Settings, ShoppingBag, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ActivityChart } from "@/components/activity-chart"
import { ActivityForm } from "@/components/activity-form"

export default function Dashboard() {
  const [showAlert, setShowAlert] = useState(true)

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
            <Alert className="mb-6 border-olive-green/50 bg-olive-green/10">
              <Wallet className="h-4 w-4 text-olive-green" />
              <AlertTitle className="text-olive-green">Wallet Connected!</AlertTitle>
              <AlertDescription>
                Your Ethereum wallet has been successfully connected. You can now earn and redeem green coins.
              </AlertDescription>
              <Button
                variant="outline"
                size="sm"
                className="ml-auto border-olive-green/50 text-olive-green hover:bg-olive-green/20"
                onClick={() => setShowAlert(false)}
              >
                Dismiss
              </Button>
            </Alert>
          )}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-olive-green/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-olive-green">Total CO₂ Saved</CardTitle>
                <Leaf className="h-4 w-4 text-olive-green" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">245.8 kg</div>
                <p className="text-xs text-muted-foreground">+22% from last month</p>
              </CardContent>
            </Card>
            <Card className="border-olive-green/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-olive-green">Green Coins</CardTitle>
                <Wallet className="h-4 w-4 text-olive-green" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,240</div>
                <p className="text-xs text-muted-foreground">+120 this week</p>
              </CardContent>
            </Card>
            <Card className="border-olive-green/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-olive-green">Activities</CardTitle>
                <Calendar className="h-4 w-4 text-olive-green" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">12 this week</p>
              </CardContent>
            </Card>
            <Card className="border-olive-green/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-olive-green">Rewards Redeemed</CardTitle>
                <ShoppingBag className="h-4 w-4 text-olive-green" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Last redeemed 2 days ago</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-6 md:grid-cols-7 lg:grid-cols-7 mt-6">
            <Card className="col-span-7 md:col-span-4 lg:col-span-4 border-olive-green/20">
              <CardHeader>
                <CardTitle className="text-olive-green">Carbon Savings Overview</CardTitle>
                <CardDescription>Your carbon reduction activities over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ActivityChart />
              </CardContent>
            </Card>
            <Card className="col-span-7 md:col-span-3 lg:col-span-3 border-olive-green/20">
              <CardHeader>
                <CardTitle className="text-olive-green">Log New Activity</CardTitle>
                <CardDescription>Record your carbon-reducing actions</CardDescription>
              </CardHeader>
              <CardContent>
                <ActivityForm />
              </CardContent>
            </Card>
          </div>
          <div className="mt-6">
            <Card className="border-olive-green/20">
              <CardHeader>
                <CardTitle className="text-olive-green">Recent Activities</CardTitle>
                <CardDescription>Your latest carbon-reducing activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 rounded-lg border p-4 border-olive-green/20">
                    <div className="rounded-full bg-olive-green/20 p-2">
                      <Bike className="h-5 w-5 text-olive-green" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Biked to Work</h3>
                      <p className="text-sm text-muted-foreground">5.2 km - Saved 1.3 kg CO₂</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-olive-green">+26 coins</p>
                      <p className="text-xs text-muted-foreground">Today, 8:30 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-lg border p-4 border-olive-green/20">
                    <div className="rounded-full bg-olive-green/20 p-2">
                      <Leaf className="h-5 w-5 text-olive-green" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Planted Tree</h3>
                      <p className="text-sm text-muted-foreground">Oak tree - Estimated 21 kg CO₂ per year</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-olive-green">+105 coins</p>
                      <p className="text-xs text-muted-foreground">Yesterday, 4:15 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-lg border p-4 border-olive-green/20">
                    <div className="rounded-full bg-olive-green/20 p-2">
                      <Wallet className="h-5 w-5 text-olive-green" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Reduced Energy Consumption</h3>
                      <p className="text-sm text-muted-foreground">15% reduction - Saved 8.7 kg CO₂</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-olive-green">+43 coins</p>
                      <p className="text-xs text-muted-foreground">2 days ago, 7:20 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full border-olive-green text-olive-green hover:bg-olive-green/10"
                >
                  View All Activities
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
