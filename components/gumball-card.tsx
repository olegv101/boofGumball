import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Button } from "./button";
import { useReadContract } from "wagmi";
import { useWriteContract } from "wagmi";
import { GumballForm } from "../components/gumball-form";
import React, { useState } from 'react';

const abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gumballinit",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gumballadd",
        type: "uint256",
      },
    ],
    name: "addFreshGumballs",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getGumball",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumberOfGumballs",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export default function GumballCard() {
  const { writeContract } = useWriteContract();
  async function getAGumball() {
    await writeContract({
      address: "0x6df511640a9ed4615A4679246E561f711FABDD61",
      abi,
      functionName: "getGumball",
      args: [],
    });
  }

  const [hasClickedButton, setHasClickedButton] = React.useState(false);


  function ViewingGumball() {
    const { data } = useReadContract({
      abi,
      address: "0x6df511640a9ed4615A4679246E561f711FABDD61",
      functionName: "getNumberOfGumballs",
    });
    return data;
  }

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', }}>
      <div>
        <div>
          <button
            style={{
              backgroundColor: '#6e7dff',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              marginBottom: 20,
              marginLeft: 80,
            }}
            onClick={() => {
              getAGumball();
              setHasClickedButton(true);
            }}
          >
            Get a Gumball
          </button>
        </div>
        <div style={{
          backgroundColor: '#F05A49',
          borderRadius: '20px',
          padding: '15px',
          color: 'white',
          textAlign: 'center'
        }}>
          <div style={{ borderBottom: '2px solid white', paddingBottom: '10px', marginBottom: '10px' }}>
            <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
              Number of Gumballs: {ViewingGumball()?.toString()}
            </p>
          </div>

          <div style={{ marginTop: '10px' }}>
            <GumballForm />
          </div>
        </div>
      </div>
    </div>
  );
}
