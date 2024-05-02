import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { useAccount } from "wagmi";
import { useBalance } from "wagmi";
import { useGasPrice } from "wagmi";
import { useBlock } from "wagmi";

export default function BalanceAlert() {
  const { address } = useAccount();
  const { data } = useBalance({
    address,
  });
  const { data: gasData } = useGasPrice({});
  const { data: block } = useBlock({});

  return (
    <div className="">

      <div style={{ backgroundColor: '#F9D5A7', border: '3px solid #FDC49D', borderRadius: '20px', padding: '20px', fontFamily: 'Arial, sans-serif', color: '#333' }}>
        <div style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '10px' }}>
          <span style={{ color: '#FF6347' }}>⚠️</span> Yo
        </div>
        <div style={{ fontSize: '16px', marginBottom: '5px' }}>
          Estimated Gas is: <span style={{ fontWeight: 'bold' }}>{gasData?.toString()} {data?.symbol}</span>
        </div>
        <div style={{ fontSize: '16px' }}>
          Current Block Number: <span style={{ fontWeight: 'bold' }}>{block?.number.toString()}</span>
        </div>
      </div>
    </div>
  );
}
