export const getFinancialAdvice = (data) => {
  if (!data || !data.transactions || !data.budget) {
    return "Not enough data to provide financial advice.";
  }

  let advice = [];
  const { transactions, budget } = data;

  const totalSpent = transactions.reduce((sum, transaction) => 
    sum + transaction.amount, 0
  );
  
  if (totalSpent > budget) {
    advice.push(`You're over budget by ${(totalSpent - budget).toFixed(2)}. Consider reducing expenses.`);
  }

  return advice.join(' ');
};

export default getFinancialAdvice;