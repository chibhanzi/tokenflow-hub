import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BusinessDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-display font-bold text-navy mb-6">Business Dashboard</h1>

        <div className="grid grid-cols-1 gap-4">
          <Link to="/business/tokens">
            <Button className="w-full h-16 bg-navy hover:bg-navy-dark text-white font-semibold">
              Manage Tokens
            </Button>
          </Link>
          <Link to="/business/investors">
            <Button variant="outline" className="w-full h-16">
              View Investors
            </Button>
          </Link>
          <Link to="/business/profile">
            <Button variant="outline" className="w-full h-16">
              Business Profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;