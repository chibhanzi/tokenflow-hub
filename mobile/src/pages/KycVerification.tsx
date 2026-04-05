import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useKyc } from "@/contexts/KycContext";

const KycVerification = () => {
  const [idFile, setIdFile] = useState("");
  const [selfieFile, setSelfieFile] = useState("");
  const { submitKyc } = useKyc();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (idFile && selfieFile) {
      submitKyc({ idFileName: idFile, selfieFileName: selfieFile });
      navigate("/dashboard/investor");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 pb-24">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-display font-bold text-navy mb-6">KYC Verification</h1>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ID Document</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setIdFile(e.target.files?.[0]?.name || "")}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Selfie</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelfieFile(e.target.files?.[0]?.name || "")}
                className="w-full"
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!idFile || !selfieFile}
              className="w-full bg-navy hover:bg-navy-dark"
            >
              Submit KYC
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KycVerification;