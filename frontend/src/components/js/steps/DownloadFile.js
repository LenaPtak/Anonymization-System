import React from "react";
import "../../css/steps/DownloadFile.css";


export default function DownloadFile(uploadedFiles) {

  const downloadFile = () => {

    uploadedFiles.uploadedFiles.forEach(file => {      
      fetch("http://127.0.0.1:8000/api/file/"+file.name, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
        }
      })
        .catch((e) => console.log(`e: ${e}`))
        .then((response) => response.blob())
        .then((blob) => {
          // Create blob link to download
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", file.name);
  
          // Append to html link element page
          document.body.appendChild(link);
  
          // Start download
          link.click();
  
          // Clean up and remove the link
          link.parentNode.removeChild(link);
        });
    });
  };


  return (
    <div className="download-file">
      <button className="download-file__btn" label="Download" onClick={downloadFile}>
        Download files
      </button>
    </div>
  );
}
