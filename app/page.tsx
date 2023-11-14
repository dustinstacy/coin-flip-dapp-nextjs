'use client'

import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'

export default function Home() {
    const [isConnected, setIsConnected] = useState(false)
    const [hasMetamask, setHasMetamask] = useState(false)
    const [wager, setWager] = useState(0.1)

    let provider
    let signer = null

    const connectWallet = async () => {
        const { ethereum } = window

        if (ethereum !== 'undefined') {
            try {
                await ethereum.request({ method: 'eth_requestAccounts' })
                setIsConnected(true)
                provider = new ethers.BrowserProvider(ethereum)
                signer = await provider.getSigner()
            } catch (e) {
                console.log(e)
            }
        } else {
            setIsConnected(false)
        }
    }

    const handleWagerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setWager(Number(value))
    }

    const placeWager = (entrantsGuess: Number, entrantsWager: Number) => {}

    useEffect(() => {
        if (typeof window.ethereum !== 'undefined') {
            setHasMetamask(true)
        }
    })

    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            Coin Flip Dapp
            <div>
                {hasMetamask ? (
                    isConnected ? (
                        'Connected! '
                    ) : (
                        <button onClick={() => connectWallet()}>Connect</button>
                    )
                ) : (
                    'Please install metamask'
                )}
            </div>
            <input
                className='text-black text-center w-[50px]'
                type='number'
                step={0.1}
                min={0.1}
                max={5.0}
                value={wager.toFixed(1)}
                onChange={handleWagerChange}
            />
            <div className='w-1/4 flex justify-between'>
                <button onClick={() => placeWager(0, wager)}>Heads</button>
                <button onClick={() => placeWager(1, wager)}>Tails</button>
            </div>
        </main>
    )
}
