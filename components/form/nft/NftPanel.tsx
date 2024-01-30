import { Box, FormLabel, Input, Text, useDisclosure, useToast, Button } from "@chakra-ui/react"
import { useAccount, useNetwork } from "@starknet-react/core";
import React, { useMemo } from "react";
import FileInput from "../../input/FileInput";
import ImagePreview from "../../view/image/ImagePreview";
import axios from "axios"
import GearLoader from "../../loader/GearLoader";
import VideoPreview from "../../view/image/VideoPreview";

export const NftPanel = () => {


  return (
    <Box>
      <Text>Create a NFT a Batch mint</Text>
      <Box>
        <AdminERC721CreateDetails>

        </AdminERC721CreateDetails>

      </Box>
    </Box>
  )
}

export interface IFormNftPanelAdminCreation {
  name: string;
  symbol?: string;
  chainId: number;
  totalSupply?: string;
  mintSupply?: string;
  date: string;
  organizer: string;
  hosts: string[];
  fileContract?: File
  fileNft?: File

}


const AdminERC721CreateDetails = () => {
  let address: string | undefined = useAccount().address;
  let _account = useAccount();
  let chain = useNetwork();
  const formRef = React.useRef<IFormNftPanelAdminCreation>({
    name: "",
    symbol: "",
    chainId: Number(chain.chain?.id.toString()) ?? 5,
    date: "",
    organizer: "",
    hosts: [],
  });


  const form = useMemo(() => {

    return formRef?.current
  }, [formRef.current])


  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isSendingCreate, setIsSendCreate] = React.useState<boolean>(false);
  const [fileSelected, onFileSelected] = React.useState<
    ArrayBuffer | undefined
  >();
  const [ipfsHash, setIpfsHash] = React.useState<string | undefined>();
  const [typeFile, setOnFileType] = React.useState<string | undefined>();

  const onFileType = (type: string) => {
    setOnFileType(type);
  };

  const [file, setFile] = React.useState<File | undefined>(null);

  const handleFileChangeVoid = (file: File) => {
    console.log("file", file)
    setFile(file);
  };

  const handleCreateToken = async () => {
    try {

      setIsSendCreate(true);

      // if (!address) {
      //   toast({
      //     title: "No address connected",
      //     status: "warning",
      //     isClosable: true,
      //   });
      //   return;
      // }
      const PINATA_URL = {
        contractBaseURI:
          "https://gateway.pinata.cloud/ipfs/QmUneZftCM5DXtGmsgBp14mESah7koPFmd1wVMxfduya7N",
        tokenBaseURIUnrevelead:
          "https://gateway.pinata.cloud/ipfs/bafkreifvfov4awv233e2dvaa4akjqdhkjanuqkplyoxssz2a2xnmuamrce",
      };

      let urlImageContractBase = PINATA_URL.contractBaseURI;

      if (fileSelected) {
        const fileName=file?.name
        const typeFile=file?.type
        let res = await axios.post("/api/ipfs/uploadDataBuffer", 
          fileSelected,
          // typeFile: typeFile, fileName,
        {
          headers: {
            "Content-Type": "application/octet-stream",
          },
        });
        console.log("res", res?.data);
        if (!res && !res?.data?.data?.IpfsHash) {
          toast({
            title: "File can't be upload into IPFS",
            status: "warning",
            isClosable: true,
          });
          return;
        }
        setIpfsHash(res?.data?.data?.IpfsHash);
        urlImageContractBase = res?.data?.data?.IpfsHash;
      }

      setIsSendCreate(false);
    } catch (e) {
      console.log("error create ERC721", e)
      toast({
        title: "Issue when create NFT.",
        description: "Please retry or contact the support.",
        status: "error",
        isClosable: true
      })
    }
  };

  console.log("file", file)
  return (
    <Box justifyContent={"left"} alignContent={"left"}>

      <FormLabel>Create params token</FormLabel>

      <Box
        shadow={"2xl"}
        rounded={"2xl"}
        bg={"blackAlpha.400"}
        p={{ base: "1em" }}
      >
        <Box
        //  display={"flex"}
        >

          <Box>


          </Box>
          <Input
            placeholder="Token name : Whatever You Want"
            required
            // value={form.name}
            aria-valuetext={form?.name}
            onChange={(e) => {
              form.name = e.target.value;
            }}
            size="xl"
            className="mt-4 max-w-[500px]"
          ></Input>
          <Input
            placeholder="Symbol : WUW"
            required
            aria-valuetext={form?.symbol}
            onChange={(e) => {
              form.symbol = e.target.value;
            }}
            size="xl"
            className="mt-4 max-w-[500px]"
          ></Input>
          <Input
            placeholder="Total supply: 10000"
            required
            value={form.totalSupply}
            type="number"
            onChange={(e) => {
              form.totalSupply = e.target.value;
            }}
            size="xl"
            className="mt-4 max-w-[500px]"
          ></Input>
          <Input
            placeholder="Mint initial: 100"
            required
            value={form.mintSupply}
            type="number"
            onChange={(e) => {
              form.mintSupply = e.target.value;
            }}
            size="xl"
            className="mt-4 max-w-[500px]"
          ></Input>

          <FormLabel>Collection image</FormLabel>

          <FileInput
            fileSelected={fileSelected}
            onFileSelected={onFileSelected}
            onFileType={onFileType}
            handleFileChangeVoid={handleFileChangeVoid}
          />

        </Box>
        <Box
          maxWidth={{ base: "100%", md: "450px", lg: "550px" }}
          maxHeight={{ base: "100%", md: "450px", lg: "550px" }}
        >


          {fileSelected && (file?.type?.includes("mp4")
            || file?.type?.includes("gif")
          ) && <VideoPreview buffer={fileSelected} />}



          {fileSelected && (!file?.type?.includes("jpeg")
            || !file?.type?.includes("png")
            || !file?.type?.includes("png")
          ) && <ImagePreview buffer={fileSelected} />}

        </Box>

      </Box>

      <Box
        p={{ base: "1em" }}
        // className='flex'
        justifyContent={{ base: "center" }}
        display={"flex"}
        gap="1em"
      >

        <Button
          disabled={isLoading}
          size="lg"
          className="bg-[#0072F5] text-white mt-4 !w-fit"
          onClick={async () => {
            if (!form.name) {
              toast({
                title: "Token name is required",
                status: "warning",
                isClosable: true,
              });
              return;
            } else if (!form.symbol) {
              toast({
                title: "Token symbol is required",
                status: "warning",
                isClosable: true,
              });
              return;
            } else if (!form.totalSupply) {
              toast({
                title: "Total supply is required",
                status: "warning",
                isClosable: true,
              });
              return;
            } else if (!form.mintSupply) {
              toast({
                title: "Token symbol is required",
                status: "warning",
                isClosable: true,
              });
              return;
            } else {
              await handleCreateToken();
            }
          }}
        >
          {isLoading ? (
            <GearLoader
            //  color='currentColor'
            // size='lg'
            />
          ) : (
            "Create"
          )}
        </Button>
      </Box>
      {/* <Toaster position='bottom-left' /> */}
    </Box>
  );
};