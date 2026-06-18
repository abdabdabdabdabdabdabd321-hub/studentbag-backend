const http = require("http");
const Stripe = require("stripe");

const stripe = Stripe(
    process.env.STRIPE_SECRET_KEY
);

const server = http.createServer(
    async (req, res) => {

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
