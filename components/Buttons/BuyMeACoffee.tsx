import { parseEther } from 'ethers/lib/utils';
import { usePrepareSendTransaction, useSendTransaction } from 'wagmi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChainIcon } from 'connectkit';

import styles from './SendEth.module.css';
import { useEffect } from 'react';

export default function BuyMeACoffee() {
  const { config } = usePrepareSendTransaction({
    request: {
      to: '0x6cf6c2ac234eb8bec53e28ad28b16421fabe4f37',
      value: parseEther('0.00090'),
    },
  });
  const { sendTransaction, isLoading, isError, isSuccess } =
    useSendTransaction(config);

  const handleOnClick = async () => {
    sendTransaction();
  };

  const button = () => {
    const buttonDefaultStyle =
      'bg-black w-52 h-12 text-white rounded-md py-2 px-3';
    const buttonErrorStyle = 'bg-red-500 h-12 text-white rounded-md py-2 px-3';

    if (isLoading) {
      return (
        <button className={buttonDefaultStyle}>
          <AiOutlineLoading3Quarters className="animate-spin m-auto" />
        </button>
      );
    }

    if (isError) {
      return (
        <button className={buttonErrorStyle} onClick={handleOnClick}>
          Error sending. Try again.
        </button>
      );
    }

    return (
      <button className={buttonDefaultStyle} onClick={handleOnClick}>
        Send 0.00090 ETH
      </button>
    );
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Transaction sent', {
        toastId: 'transactionSent',
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  }, [isSuccess]);

  return (
    <>
      <ToastContainer />
      <div
        id={styles.sendEthContainer}
        className="flex flex-wrap w-fit justify-start border-2 border-blue-600 shadow-md rounded-md p-5 gap-5"
      >
        <div className="flex flex-col justify-start">
          <p className="text-xl text-black font-bold">Buy me a coffee 😎!</p>
          <div className="flex gap-3">
            <ChainIcon id={5} />
            <p className=" text-sm text-gray-700 my-auto ">On Goerli</p>
          </div>
        </div>
        {button()}
      </div>
    </>
  );
}
