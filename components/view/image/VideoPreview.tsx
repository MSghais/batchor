import React from "react";
import { Box, Image , Text} from "@chakra-ui/react";

interface ImagePreviewProps {
  buffer: ArrayBuffer;
}

const VideoPreview: React.FC<ImagePreviewProps> = ({ buffer }) => {
  const blob = new Blob([buffer], { type: "image/jpeg" }); // Replace 'image/jpeg' with the appropriate MIME type

  return (
    <Box>
      {/* <Image src={URL.createObjectURL(blob)} alt="Preview" 
      /> */}
      <Text>Video preview</Text>
      <video src={URL.createObjectURL(blob)}></video>
    </Box>
  );
};

export default VideoPreview;
