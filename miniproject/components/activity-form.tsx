"use client"

import type React from "react"

import { useState } from "react"
import { Bike, Car, Leaf, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function ActivityForm() {
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)

    if (value && !validateEmail(value)) {
      setEmailError("Please enter a valid email address")
    } else {
      setEmailError("")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (email && !validateEmail(email)) {
      setEmailError("Please enter a valid email address")
      return
    }

    // Here you would normally submit to the blockchain
    console.log("Activity logged")
    setShowSuccess(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }

  return (
    <div className="space-y-4">
      {showSuccess && (
        <Alert className="bg-green-50 border-green-200">
          <Leaf className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-600">Success!</AlertTitle>
          <AlertDescription className="text-green-700">
            Your activity has been logged and is being processed on the blockchain.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="transport">
        <TabsList className="grid grid-cols-3 bg-olive-green/10">
          <TabsTrigger value="transport" className="data-[state=active]:bg-olive-green data-[state=active]:text-white">
            Transport
          </TabsTrigger>
          <TabsTrigger value="energy" className="data-[state=active]:bg-olive-green data-[state=active]:text-white">
            Energy
          </TabsTrigger>
          <TabsTrigger value="other" className="data-[state=active]:bg-olive-green data-[state=active]:text-white">
            Other
          </TabsTrigger>
        </TabsList>
        <TabsContent value="transport" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center gap-2 rounded-lg border p-4 cursor-pointer hover:bg-olive-green/5 border-olive-green/20">
              <Bike className="h-8 w-8 text-olive-green" />
              <span className="text-sm font-medium">Biking</span>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-lg border p-4 cursor-pointer hover:bg-olive-green/5 border-olive-green/20">
              <Car className="h-8 w-8 text-olive-green" />
              <span className="text-sm font-medium">Car Sharing</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="distance">Distance (km)</Label>
            <Input id="distance" type="number" min="0" step="0.1" placeholder="Enter distance" />
          </div>
        </TabsContent>
        <TabsContent value="energy" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center gap-2 rounded-lg border p-4 cursor-pointer hover:bg-olive-green/5 border-olive-green/20">
              <Zap className="h-8 w-8 text-olive-green" />
              <span className="text-sm font-medium">Reduced Usage</span>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-lg border p-4 cursor-pointer hover:bg-olive-green/5 border-olive-green/20">
              <Leaf className="h-8 w-8 text-olive-green" />
              <span className="text-sm font-medium">Green Energy</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (kWh)</Label>
            <Input id="amount" type="number" min="0" placeholder="Enter amount" />
          </div>
        </TabsContent>
        <TabsContent value="other" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="activity-type">Activity Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select activity type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tree-planting">Tree Planting</SelectItem>
                <SelectItem value="recycling">Recycling</SelectItem>
                <SelectItem value="composting">Composting</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" placeholder="Describe your activity" />
          </div>
        </TabsContent>
      </Tabs>

      <div className="space-y-2">
        <Label htmlFor="email">Email for confirmation (optional)</Label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={handleEmailChange}
          className={emailError ? "border-red-500" : ""}
        />
        {emailError && <p className="text-xs text-red-500">{emailError}</p>}
      </div>

      <Button className="w-full bg-olive-green hover:bg-olive-green/90 text-white" onClick={handleSubmit}>
        Log Activity
      </Button>
    </div>
  )
}
