'use client'

import { ethers } from 'ethers'
import { useEffect, useState } from 'react'

export default function Home() {
    const [isConnected, setIsConnected] = useState(false)
    const [hasMetamask, setHasMetamask] = useState(false)

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
            <div className='w-1/4 flex justify-between'>
                <button>Heads</button>
                <button>Tails</button>
            </div>
        </main>
    )
}
