"use client";

import { Button, TextArea } from "@radix-ui/themes";
import { ethers } from "ethers";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Toaster, toast } from "sonner";

const shortenAddress = (address: string, chars = 4): null | string => {
  if (!address) {
    return null;
  }
  const parsed = address;
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(
    address.length - chars
  )}`;
};

export default function Home() {
  const [addressList, setAddressList] = useState("");
  const [output, setOutputlist] = useState<string[] | string | null>(null);

  return (
    <main className="min-h-screen px-5">
      <Toaster />
      <header className="py-5">
        <h1 className="text-2xl font-bold flex items-center">
          <img
            src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=029"
            className="w-6 mr-2"
            alt=""
          />
          copy-eth-address
        </h1>
      </header>
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <TextArea
            size="2"
            rows={20}
            placeholder="Paste Bulk ETH Address"
            className="w-full"
            onChange={(e) => setAddressList(e.target.value)}
            value={addressList}
          />
          <div className="flex space-x-5 mt-2">
            <Button
              onClick={() => {
                setOutputlist(
                  addressList.split("\n").map((address) => {
                    return address.toLocaleLowerCase().trim();
                  })
                );
              }}
              variant="solid"
            >
              Lowercase
            </Button>
            <Button
              onClick={() => {
                setOutputlist(
                  addressList.split("\n").map((address) => {
                    return address.toLocaleUpperCase().trim();
                  })
                );
              }}
              variant="solid"
            >
              Uppercase
            </Button>
            <Button
              onClick={() => {
                setOutputlist(
                  addressList.split("\n").map((address) => {
                    return shortenAddress(address.trim()) as string;
                  })
                );
              }}
              variant="solid"
            >
              Shorten
            </Button>
            <Button
              onClick={() => {
                setOutputlist(
                  addressList.split("\n").map((address) => {
                    return ethers.getAddress(address.trim());
                  })
                );
              }}
              variant="solid"
            >
              Checksum
            </Button>
          </div>
        </div>
        <div>
          <TextArea
            rows={20}
            size="2"
            value={(output as string[])?.join("\n")}
            placeholder=""
            readOnly
            className="w-full"
          />
          <div className="flex space-x-5 mt-2">
            <CopyToClipboard
              text={output as string}
              onCopy={() => toast.success("copied!")}
            >
              <Button variant="solid">Copy</Button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
      <footer className="text-center border-t mt-10 pb-5">
        <p className="text-sm text-gray-500 pt-5">
          Made with ❤️ by{" "}
          <a
            href="https://twitter.com/pjijin_"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500"
          >
            @pjijin_
          </a>
        </p>
      </footer>
    </main>
  );
}
