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
 
  return (
    <Box justifyContent={"left"} alignContent={"left"}>
      <Text>Admin create</Text>

    </Box>
  );
};