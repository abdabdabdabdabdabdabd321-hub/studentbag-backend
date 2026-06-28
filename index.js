const http = require("http");
const Stripe = require("stripe");
const querystring = require("querystring");

const stripe = Stripe(
    process.env.STRIPE_SECRET_KEY
);

const server = http.createServer(async (req, res) => {

    if (
        req.url === "/create-checkout-session" &&
        req.method === "POST"
    ) {

        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", async () => {

            try {

                const data =
                    querystring.parse(body);

                const email =
                    data.email;

                console.log("Email:", email);

                const session =
                    await stripe.checkout.sessions.create({

                        mode: "subscription",

                        customer_email: email,

                        line_items: [
                            {
                                price: "price_1TjOlFAMnQJ2HzVZH5X4TgbZ",
                                quantity: 1
                            }
                        ],

                        success_url:
                            "studentbag://success",

                        cancel_url:
                            "https://studentbag-backend.onrender.com/cancel"
                    });

                console.log("Session Created");
                console.log(session.id);

                res.writeHead(200, {
                    "Content-Type": "application/json"
                });

                res.end(
                    JSON.stringify({
                        url: session.url
                    })
                );

            } catch (error) {

                res.writeHead(500);

                res.end(error.message);
            }
        });

        return;
    }

    if (req.url === "/cancel") {

        res.writeHead(200);

        res.end("Payment Cancelled");

        return;
    }

    res.writeHead(200);

    res.end("StudentBag Backend Running");
});

server.listen(3000, () => {

    console.log("Server running on port 3000");

});
