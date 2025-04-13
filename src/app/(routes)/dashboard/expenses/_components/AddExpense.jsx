import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "../../../../../../utils/dbConfig";
import { Budgets, Expenses } from "../../../../../../utils/schema";
import { Loader } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "sonner";

function AddExpense({ budgetId, user, refreshData }) {
  const [name, setName] = useState(""); // Initialize as empty string
  const [amount, setAmount] = useState(""); // Initialize as empty string
  const [loading, setLoading] = useState(false);

  /**
   * Used to Add New Expense
   */
  const addNewExpense = async () => {
    if (!name.trim() || !amount) {
      toast.error("Please enter both name and amount.");
      return;
    }

    setLoading(true);

    try {
      const numericAmount = parseFloat(amount); // Ensure number input
      if (isNaN(numericAmount) || numericAmount <= 0) {
        toast.error("Please enter a valid expense amount.");
        setLoading(false);
        return;
      }

      const result = await db
        .insert(Expenses)
        .values({
          name: name.trim(),
          amount: numericAmount,
          budgetId: budgetId,
          createdAt: moment().format("YYYY-MM-DD"), // Proper date format
        })
        .returning({ insertedId: Expenses.id });

      if (result) {
        toast.success("New Expense Added!");
        setName("");
        setAmount("");
        refreshData();
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error("Failed to add expense. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="border p-5 rounded-2xl">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <Input
          placeholder="e.g. Bedroom Decor"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Amount</h2>
        <Input
          placeholder="e.g. 1000"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Button
        disabled={!(name.trim() && amount) || loading}
        onClick={addNewExpense}
        className="mt-3 w-full rounded-full"
      >
        {loading ? <Loader className="animate-spin" /> : "Add New Expense"}
      </Button>
    </div>
  );
}

export default AddExpense;
