
'use client'
import React, { useCallback, useState } from "react"
import { Button } from "@/components/ui/button"
import { fetchWrapper } from "@/utils/fetch"
interface WriteReportProps {
    productId: number;
}

  
const Write_report = ({ productId }: WriteReportProps) => {
    const [showTextArea, setShowTextArea] = useState(false);
    const [description, setDescription] = useState('');
  
    const handleSubmit = () => {
      // Triggering the custom report submission logic
      submitReport(productId, description);
    };
  
    // Custom report submission logic separated into a helper function
    const submitReport = (productId: number, description: string) => {
    fetchWrapper('/api/incidents/product', 'POST', {
        productId: productId,
        description: description,
          })
          .then((response) => {
            console.log(response); // Log the response here
            console.log('Response:', response.success);
            if (response.success===true) {
                alert('Report submitted successfully');
                
                setDescription('');
                setShowTextArea(false);
              }else{
                alert('Report submission failed');

              }
             
             
        })
        
    };

    return (
        <div className="w-full mb-8">
            <Button
                className="bg-transparent text-white px-4 py-2 rounded"
                onClick={() => setShowTextArea(!showTextArea)}
            >
                {showTextArea ? (
                    <span role="img" aria-label="hide">🚩</span>
                ) : (
                    <span role="img" aria-label="show">🚩</span>
                )}
            </Button>
            {showTextArea && (
                <>
                    <textarea
                        className="w-full mt-4 p-2 border border-gray-800 rounded bg-gray-800 text-white"
                        rows={4}
                        placeholder="Report whats wrong with this product..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Button
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </>
            )}
        </div>
    );
};
export default Write_report