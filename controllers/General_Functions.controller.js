import axios from 'axios';
import asyncHandler from "#middlewares/asyncHandler";


const getNativeCurrencyPrice = asyncHandler(async (req, res) => {
    const { amount, currency } = req.body;

    if (!amount || !currency) {
        return res.status(400).json({ message: "Amount and currency are required" });
    }

    try {

        const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=${currency.toLowerCase()}`;

        const response = await axios.get(apiUrl);

        console.log("🚀 ~ getNativeCurrencyPrice ~ response:", response.data)

        const price = response.data.ethereum[currency.toLowerCase()];

        console.log("🚀 ~ getNativeCurrencyPrice ~ price:", price)

        if (!price) {
            return res.status(404).json({ message: "Price data not found for the requested currency" });
        }

        const totalAmount = price * amount;

        res.status(200).json({
            amount,
            currency,
            price_per_unit: price,
            total_value: totalAmount
        });
    } catch (error) {
        console.error("Error fetching price data:", error);
        res.status(500).json({ message: "An error occurred while fetching the price" });
    }
});

export { getNativeCurrencyPrice };
