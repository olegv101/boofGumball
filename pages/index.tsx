import React from 'react';
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from '../components/button';
import type { NextPage } from 'next';
import GumballCard from '../components/gumball-card';
import TransactionCard from '../components/transaction-count-card';
import BalanceAlert from '../components/balance-alert';
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { abi } from '../contract-abi';
import FlipCard, { BackCard, FrontCard } from '../components/FlipCard';
import { Input } from '../components/input';
import { GumballForm } from '../components/gumball-form';

const contractConfig = {
  address: '0x86fbbb1254c39602a7b067d5ae7e5c2bdfd61a30',
  abi,
} as const;

// default 0x86fbbb1254c39602a7b067d5ae7e5c2bdfd61a30
// 0x49f2D79bBaD58bDeEE6961B943c8684b8827a88a


const Home: NextPage = () => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const [totalMinted, setTotalMinted] = React.useState(0n);
  const { isConnected } = useAccount();

  const {
    data: hash,
    writeContract: mint,
    isPending: isMintLoading,
    isSuccess: isMintStarted,
    error: mintError,
  } = useWriteContract();

  const { data: totalSupplyData } = useReadContract({
    ...contractConfig,
    functionName: 'totalSupply',
  });

  const [hasClickedButton, setHasClickedButton] = React.useState(false);

  const {
    data: txData,
    isSuccess: txSuccess,
    error: txError,
  } = useWaitForTransactionReceipt({
    hash,
    query: {
      enabled: !!hash,
    },
  });

  React.useEffect(() => {
    if (totalSupplyData) {
      setTotalMinted(totalSupplyData);
    }
  }, [totalSupplyData]);

  const isMinted = txSuccess;
  const account = useAccount();

  return (
    <div className="page">
      <div className="container">
        <div style={{ flex: '1 1 auto' }}>
          <div style={{ padding: '24px 24px 24px 0' }}>
            <h1>Gumball Machine</h1>
            <div style = {{marginTop: 20, marginBottom: 20,}}><ConnectButton /></div>
            
            <div>
              {account.isConnected && <GumballCard />}
            </div>
            <TransactionCard />

            <div>{account.isConnected && <BalanceAlert />}</div>
            {/* <div>
              {account.isConnected &&
                <button
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    whiteSpace: 'nowrap',
                    borderRadius: '0.375rem',
                    fontSize: '1rem',
                    fontWeight: 500,
                    transition: 'colors 0.15s ease-in-out',
                    backgroundColor: '#6366F1',
                    color: '#F3F4F6',
                    height: '2.5rem',
                    padding: '0.5rem 1rem',
                    opacity: '1'
                  }}
                  disabled={false}
                >
                  Get a Gumball
                </button>
              }
            </div> */}


            {/* {mintError && (
              <p style={{ marginTop: 24, color: '#FF6257' }}>
                Error: {mintError.message}
              </p>
            )}
            {txError && (
              <p style={{ marginTop: 24, color: '#FF6257' }}>
                Error: {txError.message}
              </p>
            )}

            {mounted && isConnected && !isMinted && (
              <button
                style={{ marginTop: 24 }}
                disabled={!mint || isMintLoading || isMintStarted}
                className="button"
                data-mint-loading={isMintLoading}
                data-mint-started={isMintStarted}
                onClick={() =>
                  mint?.({
                    ...contractConfig,
                    functionName: 'mint',
                  })
                }
              >
                {isMintLoading && 'Waiting for approval'}
                {isMintStarted && 'Minting...'}
                {!isMintLoading && !isMintStarted && 'Mint'}
              </button>
            )} */}
          </div>
        </div>

        <div style={{ flex: '0 0 auto' }}>
          <FlipCard>
            <FrontCard isCardFlipped={hasClickedButton}>
              <Image
                layout="responsive"
                src="/nft.png"
                width="500"
                height="500"
                alt="RainbowKit Demo NFT"
              />
              <h1 style={{ marginTop: 24 }}>Gumball bro</h1>
              <ConnectButton />
            </FrontCard>
            <BackCard isCardFlipped={hasClickedButton}>
              <div style={{ padding: 24 }}>
                <Image
                  src="/nft.png"
                  width="80"
                  height="80"
                  alt="RainbowKit Demo NFT"
                  style={{ borderRadius: 8 }}
                />
                <h2 style={{ marginTop: 24, marginBottom: 6 }}>Gumballs added!</h2>
                <p style={{ marginBottom: 24 }}>
                  Your gumballs will update, maybe.
                </p>
                <p style={{ marginBottom: 6 }}>
                  View on{' '}
                  <a href={`https://rinkeby.etherscan.io/tx/${hash}`}>
                    Etherscan
                  </a>
                </p>

              </div>
            </BackCard>
          </FlipCard>
        </div>
      </div>
    </div>
  );
};

export default Home;
