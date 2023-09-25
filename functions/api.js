const express = require("express");
const serverless = require('serverless-http')
const { metadrobeWomenHelper } = require("./helperStuff");
const { metadrobeMenHelper } = require("./menhelperStuff");
const { singularHelpWomen } = require("./womensingularHelper");
const { singularHelpMen } = require("./mensingularHelper");
const app = express();
const router = express.Router();
const womenCollection = "metawardrobe-virtual-women-s-fashion";
const menCollection = "metawardrobe-virtual-men-s-fashion";



app.use(express.static("dist"));

router.get("/", (req, res) => {
    res.sendFile(__dirname + "/dist/index.html");
});

router.get(
    "/registry/:collectionName/address/:address/assets/:id",
    async (req, res) => {
        const { address, id, collectionName } = req.params;
        try {
            if (collectionName === womenCollection) {
                const toSend = await singularHelpWomen(id, womenCollection);
                res.send(JSON.stringify(toSend));
            } else if (collectionName === menCollection) {
                const toSend = await singularHelpMen(id, menCollection);
                res.send(JSON.stringify(toSend));
            } else {
                res.send(
                    JSON.stringify({
                        address: "0x3b316ea40aa28a84ab435e77510ae76a2e8db527",
                        amount: 0,
                        urn: {
                            decentraland: "",
                        },
                    })
                );
            }
        } catch (err) {
            console.error(err);
            res.send(
                JSON.stringify({
                    address: "0xc37059816b006c099b0cd47e9cf783b0ef9cd4e3",
                    amount: 0,
                    urn: {
                        decentraland: "",
                    },
                })
            );
        }



    }
);




router.get(
    "/registry/:collectionMeme/address/:address/assets",
    async (req, res) => {
        const { address, collectionMeme } = req.params;
        try {
            if (womenCollection === collectionMeme) {
                const toSend = await metadrobeWomenHelper(address, womenCollection);
                res.send(JSON.stringify(toSend));
            } else if (menCollection === collectionMeme) {
                const toSend = await metadrobeMenHelper(address, menCollection);
                res.send(JSON.stringify(toSend));
            } else {
                res.send(
                    JSON.stringify({
                        address: address,
                        assets: [],
                        total: 0,
                        page: 1,
                        next: "",
                    })
                );
            }
        } catch (err) {
            console.error(err);
            res.send(
                JSON.stringify({
                    address: address,
                    assets: [],
                    total: 0,
                    page: 1,
                    next: "",
                })
            );
        }

    }
);






app.use(`/.netlify/functions/api`, router);

module.exports.handler = serverless(app);
