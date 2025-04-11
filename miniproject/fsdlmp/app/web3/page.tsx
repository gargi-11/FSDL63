"use client"

import { useState } from "react"
import Link from "next/link"
import { Leaf, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Web3Page() {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState({ title: "", message: "", type: "info" })

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        // Request account access
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        setWalletAddress(accounts[0])
        setIsConnected(true)

        setAlertMessage({
          title: "Wallet Connected",
          message: `Successfully connected to ${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`,
          type: "success",
        })
        setShowAlert(true)
      } catch (error) {
        setAlertMessage({
          title: "Connection Failed",
          message: "Failed to connect to wallet. Please try again.",
          type: "error",
        })
        setShowAlert(true)
      }
    } else {
      setAlertMessage({
        title: "MetaMask Not Found",
        message: "Please install MetaMask to use this feature.",
        type: "warning",
      })
      setShowAlert(true)
    }
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setWalletAddress("")

    setAlertMessage({
      title: "Wallet Disconnected",
      message: "Your wallet has been disconnected.",
      type: "info",
    })
    setShowAlert(true)
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
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
              Home
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="/dashboard">
              Dashboard
            </Link>
            <Link className="text-sm font-medium text-olive-green hover:underline underline-offset-4" href="/web3">
              Web3
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 bg-beige/10">
        <div className="container py-6 md:py-12">
          {showAlert && (
            <Alert
              className={`mb-6 ${
                alertMessage.type === "success"
                  ? "border-green-200 bg-green-50"
                  : alertMessage.type === "error"
                    ? "border-red-200 bg-red-50"
                    : alertMessage.type === "warning"
                      ? "border-yellow-200 bg-yellow-50"
                      : "border-blue-200 bg-blue-50"
              }`}
            >
              <Wallet
                className={`h-4 w-4 ${
                  alertMessage.type === "success"
                    ? "text-green-600"
                    : alertMessage.type === "error"
                      ? "text-red-600"
                      : alertMessage.type === "warning"
                        ? "text-yellow-600"
                        : "text-blue-600"
                }`}
              />
              <AlertTitle
                className={
                  alertMessage.type === "success"
                    ? "text-green-600"
                    : alertMessage.type === "error"
                      ? "text-red-600"
                      : alertMessage.type === "warning"
                        ? "text-yellow-600"
                        : "text-blue-600"
                }
              >
                {alertMessage.title}
              </AlertTitle>
              <AlertDescription
                className={
                  alertMessage.type === "success"
                    ? "text-green-700"
                    : alertMessage.type === "error"
                      ? "text-red-700"
                      : alertMessage.type === "warning"
                        ? "text-yellow-700"
                        : "text-blue-700"
                }
              >
                {alertMessage.message}
              </AlertDescription>
              <Button
                variant="outline"
                size="sm"
                className={`ml-auto ${
                  alertMessage.type === "success"
                    ? "border-green-200 text-green-600 hover:bg-green-100"
                    : alertMessage.type === "error"
                      ? "border-red-200 text-red-600 hover:bg-red-100"
                      : alertMessage.type === "warning"
                        ? "border-yellow-200 text-yellow-600 hover:bg-yellow-100"
                        : "border-blue-200 text-blue-600 hover:bg-blue-100"
                }`}
                onClick={() => setShowAlert(false)}
              >
                Dismiss
              </Button>
            </Alert>
          )}

          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-olive-green">Blockchain Integration</h1>
              <p className="text-muted-foreground">
                Connect your wallet and interact with the CarbonTrack smart contract
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-olive-green/20">
                <CardHeader>
                  <CardTitle className="text-olive-green">Wallet Connection</CardTitle>
                  <CardDescription>Connect your Ethereum wallet to interact with the blockchain</CardDescription>
                </CardHeader>
                <CardContent>
                  {isConnected ? (
                    <div className="space-y-4">
                      <div className="rounded-lg border p-4 border-olive-green/20">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-olive-green/20 p-2">
                            <Wallet className="h-5 w-5 text-olive-green" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">Connected Wallet</h3>
                            <p className="text-sm text-muted-foreground">
                              {walletAddress.substring(0, 6)}...{walletAddress.substring(38)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full border-olive-green text-olive-green hover:bg-olive-green/10"
                        onClick={disconnectWallet}
                      >
                        Disconnect Wallet
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className="w-full bg-olive-green hover:bg-olive-green/90 text-white"
                      onClick={connectWallet}
                    >
                      <Wallet className="mr-2 h-4 w-4" />
                      Connect Wallet
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card className="border-olive-green/20">
                <CardHeader>
                  <CardTitle className="text-olive-green">Smart Contract</CardTitle>
                  <CardDescription>View and interact with the CarbonTrack smart contract</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="info">
                    <TabsList className="grid grid-cols-3 bg-olive-green/10">
                      <TabsTrigger
                        value="info"
                        className="data-[state=active]:bg-olive-green data-[state=active]:text-white"
                      >
                        Info
                      </TabsTrigger>
                      <TabsTrigger
                        value="balance"
                        className="data-[state=active]:bg-olive-green data-[state=active]:text-white"
                      >
                        Balance
                      </TabsTrigger>
                      <TabsTrigger
                        value="actions"
                        className="data-[state=active]:bg-olive-green data-[state=active]:text-white"
                      >
                        Actions
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="info" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Contract Address:</span>
                          <span className="text-sm text-muted-foreground">0x1234...5678</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Network:</span>
                          <span className="text-sm text-muted-foreground">Ethereum Mainnet</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Total Users:</span>
                          <span className="text-sm text-muted-foreground">1,245</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Total Carbon Saved:</span>
                          <span className="text-sm text-muted-foreground">125,890 kg</span>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="balance" className="space-y-4 pt-4">
                      {isConnected ? (
                        <div className="space-y-4">
                          <div className="rounded-lg border p-4 border-olive-green/20">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Green Coin Balance:</span>
                              <span className="text-xl font-bold text-olive-green">1,240</span>
                            </div>
                          </div>
                          <div className="rounded-lg border p-4 border-olive-green/20">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Carbon Credits:</span>
                              <span className="text-xl font-bold text-olive-green">245.8 kg</span>
                            </div>
                          </div>
                          <Button className="w-full bg-olive-green hover:bg-olive-green/90 text-white">
                            Refresh Balance
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-muted-foreground">Connect your wallet to view your balance</p>
                        </div>
                      )}
                    </TabsContent>
                    <TabsContent value="actions" className="space-y-4 pt-4">
                      {isConnected ? (
                        <div className="space-y-4">
                          <Button className="w-full bg-olive-green hover:bg-olive-green/90 text-white">
                            Log Carbon Activity
                          </Button>
                          <Button className="w-full bg-olive-green hover:bg-olive-green/90 text-white">
                            Claim Green Coins
                          </Button>
                          <Button className="w-full bg-olive-green hover:bg-olive-green/90 text-white">
                            Transfer Green Coins
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-muted-foreground">Connect your wallet to perform actions</p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            <Card className="border-olive-green/20">
              <CardHeader>
                <CardTitle className="text-olive-green">Transaction History</CardTitle>
                <CardDescription>View your recent blockchain transactions</CardDescription>
              </CardHeader>
              <CardContent>
                {isConnected ? (
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4 border-olive-green/20">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-olive-green/20 p-2">
                          <Leaf className="h-5 w-5 text-olive-green" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">Carbon Activity Logged</h3>
                          <p className="text-sm text-muted-foreground">Tx: 0x8723...9f12</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-olive-green">+26 coins</p>
                          <p className="text-xs text-muted-foreground">Today, 8:30 AM</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4 border-olive-green/20">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-olive-green/20 p-2">
                          <Wallet className="h-5 w-5 text-olive-green" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">Reward Redeemed</h3>
                          <p className="text-sm text-muted-foreground">Tx: 0x7612...3e45</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-red-500">-500 coins</p>
                          <p className="text-xs text-muted-foreground">Yesterday, 2:15 PM</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4 border-olive-green/20">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-olive-green/20 p-2">
                          <Leaf className="h-5 w-5 text-olive-green" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">Carbon Activity Logged</h3>
                          <p className="text-sm text-muted-foreground">Tx: 0x4567...8d90</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-olive-green">+105 coins</p>
                          <p className="text-xs text-muted-foreground">3 days ago, 4:45 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Wallet className="h-12 w-12 text-olive-green/40 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-olive-green mb-2">Connect Your Wallet</h3>
                    <p className="text-muted-foreground mb-4">
                      Connect your Ethereum wallet to view your transaction history
                    </p>
                    <Button className="bg-olive-green hover:bg-olive-green/90 text-white" onClick={connectWallet}>
                      Connect Wallet
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
