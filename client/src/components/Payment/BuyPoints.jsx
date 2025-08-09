import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useTheme } from "../../Hooks/CustomeHooks/useTheme";

const packages = [
  { id: 1, points: 50, price: 29 },
  { id: 2, points: 100, price: 49 },
  { id: 3, points: 150, price: 99 },
];

export default function BuyPoints() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [loadingPackageId, setLoadingPackageId] = useState(null);

  const handlePayment = (pkg) => {
    setLoadingPackageId(pkg.id);

    // Simulate payment process
    setTimeout(() => {
      let user = JSON.parse(localStorage.getItem("user")) || {};
      user.points = (user.points || 0) + pkg.points;
      localStorage.setItem("user", JSON.stringify(user));

      toast.success(
        `Payment successful! You have received ${pkg.points} points for ₹${pkg.price}.`
      );

      setLoadingPackageId(null);

      navigate("/notes"); 
    }, 2000);
  };

  // Theme-based classes
  const containerClass = isDark ? "bg-dark text-light" : "bg-light text-dark";
  const cardClass = isDark ? "bg-secondary text-light" : "bg-white text-dark";
  const buttonClass = isDark ? "btn btn-warning" : "btn btn-primary";

  return (
    <div className={`container py-5 min-vh-100 ${containerClass}`}>
      <h2>Buy Points</h2>
      <p>Select your desired points package and pay via PhonePe or Google Pay:</p>

      <div className="row">
        {packages.map((pkg) => (
          <div key={pkg.id} className="col-md-4 mb-3">
            <div className={`card text-center p-3 shadow-sm ${cardClass}`}>
              <h4>{pkg.points} Points</h4>
              <p className="mb-3">₹{pkg.price}</p>
              <button
                disabled={loadingPackageId === pkg.id}
                onClick={() => handlePayment(pkg)}
                className={buttonClass}
              >
                {loadingPackageId === pkg.id ? "Processing..." : "Buy Now"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-muted">
        * This is a demo payment simulation. Integrate your payment gateway for real transactions.
      </p>
    </div>
  );
}
