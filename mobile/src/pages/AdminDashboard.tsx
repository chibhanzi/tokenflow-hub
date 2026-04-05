import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-display font-bold text-navy mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 gap-4">
          <Link to="/admin/users">
            <Button className="w-full h-16 bg-navy hover:bg-navy-dark text-white font-semibold">
              Manage Users
            </Button>
          </Link>
          <Link to="/admin/businesses">
            <Button variant="outline" className="w-full h-16">
              Review Businesses
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;