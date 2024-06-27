const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_KEY);

const YOUR_DOMAIN = "http://localhost:5173";

exports.create_payment_intent = [
  asyncHandler(async (req, res, next) => {
    console.log("test");
    console.log(req.session.user.items);
    console.log(req.session.body);

    const session = await stripe.checkout.sessions.create({
      line_items: req.session.user.items.map((item) => {
        return {
          quantity: item.quantity,
          price_data: {
            currency: "usd",
            product_data: {
              name: item.itemID,
            },
            unit_amount: item.cost,
          },
        };
      }),
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });

    res.status(200).json(session.url);
  }),
];
