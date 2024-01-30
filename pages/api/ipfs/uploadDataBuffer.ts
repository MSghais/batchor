// pages/api/callback.ts
import { NextApiHandler, NextApiRequest } from "next";
import axios from "axios";
import { uploadToIPFS } from "../../../utils/pinata";

const uploadDataImageHandler: NextApiHandler = async (req, res) => {
    try {
        const { fileSelected, typeFile, fileName, metadata, formData } = req.body;
        console.log("typeFile", typeFile);
        // console.log("formData", formData)
        if (!fileSelected && !req.body) {
            return res.json({
                status: 500,
                message: "No buffer data",
            });
        }
        if (formData) {
            //   console.log("formData is available", formData);
            //   let res = await uploadToIPFSWithFormData(formData);
            // console.log("res",res)
        }
        else if (fileSelected) {
            let answerUpload = await uploadToIPFS(
                fileSelected,
                typeFile,
                fileName,
                metadata
            );
            console.log("answedr upload BUFFER", answerUpload);
            if (!answerUpload || answerUpload?.hash) {
                return res.status(500).json({
                    status: 500,
                });
            } else {
                return res.status(200).json({
                    message: "Buffer processed successfully",
                    data: answerUpload?.data,
                    hash: answerUpload?.hash,
                });
            }
        } else {
            let answerUpload = await uploadToIPFS(req.body);
            if (!answerUpload || !answerUpload?.hash) {
                return res.json({
                    status: 500,
                });
            } else {
                return res.status(200).json({
                    message: "Buffer processed successfully",
                    data: answerUpload?.data,
                    hash: answerUpload?.hash,
                });
            }
        }
    } catch (error) {
        console.error("Error during Create image ipfs callback:", error);
        return res.json({
            status: 500,
        });
    }
};

export default uploadDataImageHandler;
