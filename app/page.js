
import Image from 'next/image'
import TradeSimulation from './components/tradesimulation'
import CurrentLPStatus from './components/current_lp_status';

export default function Home() {

  const barcLpAddress = '0x216387eEDa0586730697e769F1fabcca77b123e1';
  const eagLpAddress = '0x7f00995f977a8a64abd4b888e5cf09d86f91ca66';

  return (
    <main className="flex min-h-screen flex-col items-center pt-8">
      <div className="flex gap-20 font-mono">
        <CurrentLPStatus lpAddress={barcLpAddress} />
        <CurrentLPStatus lpAddress={eagLpAddress} />
      </div>

      <div className='flex justify-center w-full my-4'>
        <TradeSimulation />
      </div>
    </main>
  )
}
