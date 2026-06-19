const http = require("http");
const Stripe = require("stripe");

const stripe = Stripe(
    process.env.STRIPE_SECRET_KEY
);

const server = http.createServer(
    async (req, res) => {

        if (req.url === "/create-checkout-session") {

            try {

                const session =
                    await stripe.checkout.sessions.create({

                        mode: "subscription",

                        line_items: [
                            {
                                price: "price_1TjOlFAMnQJ2HzVZH5X4TgbZ",
                                quantity: 1
                            }
                        ],

                        success_url:
                            "studentbag://payment-success",

                        cancel_url:
                            "https://studentbag-backend.onrender.com/cancel"
                    });

                res.writeHead(200, {
                    "Content-Type": "application/json"
                });

                res.end(
                    JSON.stringify({
                        url: session.url
                    })
                );

                return;

            } catch (error) {

                res.writeHead(500, {
                    "Content-Type": "text/plain"
                });

                res.end(error.message);

                return;
            }
        }

        if (req.url === "/cancel") {

            res.writeHead(200, {
                "Content-Type": "text/plain"
            });

            res.end(
                "Payment Cancelled"
            );

            return;
        }

        res.writeHead(200, {
            "Content-Type": "text/plain"
        });

        res.end(
            "StudentBag Backend Running"
        );
    }
);

server.listen(3000, () => {

    console.log(
        "Server running on port 3000"
    );
});
