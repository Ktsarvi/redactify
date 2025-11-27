"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { checkoutCredits } from "@/lib/actions/transaction.action";
import { toast } from "sonner";
import { Button } from "../ui/button";

const Checkout = ({
  plan,
  amount,
  credits,
  buyerId,
}: {
  plan: string;
  amount: number;
  credits: number;
  buyerId: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }, []);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      toast.success("Order placed!", {
        description: "You will receive an email confirmation",
        duration: 5000,
        className: "success-toast",
      });
    }

    if (query.get("canceled")) {
      toast.error("Order canceled!", {
        description: "Continue to shop around and checkout when you're ready",
        duration: 5000,
        className: "error-toast",
      });
    }
  }, []);

  const onCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const transaction = {
        plan,
        amount,
        credits,
        buyerId,
      };

      await checkoutCredits(transaction);
    } catch (error) {
      console.error("Checkout failed:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onCheckout}>
      <section>
        <Button
          type="submit"
          role="link"
          disabled={isLoading}
          className="w-full rounded-full bg-purple-gradient bg-cover text-white hover:bg-purple-700"
        >
          {isLoading ? "Processing..." : "Buy Credit"}
        </Button>
      </section>
    </form>
  );
};

export default Checkout;
