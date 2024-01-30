import axios from "axios";

const JWT = process.env.NEXT_PUBLIC_PINATA_JWT;
const API_KEY = process.env.PINATA_API_KEY;
const API_SECRET_KEY = process.env.PINATA_API_SECRET_KEY;
// Function to upload ArrayBuffer to IPFS
export const uploadToIPFS = async (
    arrayBuffer: ArrayBuffer,
    typeFile?: string,
    fileName?: string,
    metadata?: any
) => {
    try {
        const formData = new FormData();
        console.log("API_KEY", API_KEY)
        console.log("API_SECRET_KEY", API_SECRET_KEY)
        // Transform the ArrayBuffer into a Blob
        let blobStream = new Blob([arrayBuffer], { type: 'application/octet-stream' });
        let blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });
        blob = new Blob([arrayBuffer]);
        console.log("fileName", fileName);
        console.log("metadata", metadata);
        console.log("typeFile", typeFile);

        let fileType = typeFile?.replace("image/", "");
        fileType = typeFile?.replace("video/", "");
        formData.append("file",
            blob,
            `${fileName ?? "nft_bro"}.${fileType ?? "jpg"}`
        );
        const pinataOptions = JSON.stringify({
            cidVersion: 0,
        });

        // Make a POST request to the IPFS API endpoint
        formData.append("pinataOptions", pinataOptions);
        const res = await axios.post(
            "https://api.pinata.cloud/pinning/pinFileToIPFS",
            formData,
            {
                maxBodyLength: Infinity,
                headers: {
                    Accept: "text/plain",
                    pinata_api_key: API_KEY,
                    pinata_secret_api_key: API_SECRET_KEY,
                },
            }
        );
        // Parse the response to get the IPFS hash
        // const ipfsHash = res?.data?.Hash;
        const ipfsHash = res?.data?.IpfsHash;
        const resdata = res?.data;
        console.log("IPFS resdata:", resdata);
        console.log("IPFS hash:", ipfsHash);
        // return ipfsHash;
        return {
            hash: ipfsHash,
            data: resdata,
            res: res,
        };
    } catch (error) {
        console.error("Error uploading to IPFS:", error);
        return undefined;
    }
};
