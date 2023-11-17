'use client'

import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import { abi, contractAddresses } from '@constants'
import { Contract } from 'ethers'
import { ContractRunner } from 'ethers'
import { Flow_Rounded } from 'next/font/google'

interface ContractAddresses {
    [chainId: number]: string[]
}

export default function Home() {
    const [isConnected, setIsConnected] = useState(false)
    const [hasMetamask, setHasMetamask] = useState(false)
    const [wager, setWager] = useState('0.1')
    const [amount, setAmount] = useState('0.1')
    const { ethereum } = window

    const addressArray: ContractAddresses = contractAddresses

    const connect = async () => {
        if (typeof ethereum != 'undefined') {
            try {
                setIsConnected(true)
                await ethereum.request({ method: 'eth_requestAccounts' })
            } catch (e) {
                console.log(e)
            }
        } else {
            setIsConnected(false)
        }
    }

    // const connectWallet = async () => {
    //     const { ethereum } = window
    //     const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    //     setWalletAddress(accounts[0])
    //     console.log(accounts)

    //     if (ethereum !== 'undefined') {
    //         try {
    //             setIsConnected(true)
    //             provider = new ethers.BrowserProvider(ethereum)
    //             chainId = (await provider.getNetwork()).chainId
    //             console.log(chainId)
    //             contractAddress = addressArray[Number(chainId)]
    //                 ? addressArray[Number(chainId)][0]
    //                 : undefined
    //             console.log(contractAddress)
    //             setCoinFlipContract(new ethers.Contract(contractAddress!, abi, provider))
    //         } catch (e) {
    //             console.log(e)
    //         }
    //     } else {
    //         setIsConnected(false)
    //     }
    // }

    const handleWagerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setWager(value)
    }

    const handleFundingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setAmount(value)
    }

    const placeWager = async (entrantsGuess: Number, wager: string) => {
        if (typeof ethereum !== 'undefined') {
            const provider = new ethers.BrowserProvider(ethereum)
            const signer = await provider.getSigner()
            const chainId = (await provider.getNetwork()).chainId
            const contract = new ethers.Contract(addressArray[Number(chainId)][0], abi, signer)
            try {
                console.log(wager)
                const tx = await contract.enterWager(entrantsGuess, {
                    value: ethers.parseEther(wager),
                })
            } catch (e) {
                console.log(e)
            }
        }
    }

    const fund = async (amount: string) => {
        if (typeof ethereum !== 'undefined') {
            const provider = new ethers.BrowserProvider(ethereum)
            const signer = await provider.getSigner()
            const chainId = (await provider.getNetwork()).chainId
            const contract = new ethers.Contract(addressArray[Number(chainId)][0], abi, signer)
            try {
                const tx = await contract.fund({
                    value: ethers.parseEther(amount),
                })
            } catch (e) {
                console.log(e)
            }
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
                        <>
                            <input
                                className='text-black text-center w-[50px]'
                                value={amount}
                                type='string'
                                onChange={handleFundingChange}
                            />
                            <button onClick={() => fund(amount)}>Fund</button>
                        </>
                    ) : (
                        <button onClick={() => connect()}>Connect</button>
                    )
                ) : (
                    'Please install metamask'
                )}
            </div>
            <input
                className='text-black text-center w-[50px]'
                type='string'
                value={wager}
                onChange={handleWagerChange}
            />
            <div className='w-1/4 flex justify-between'>
                <button onClick={() => placeWager(0, wager)}>Heads</button>
                <button onClick={() => placeWager(1, wager)}>Tails</button>
            </div>
        </main>
    )
}
