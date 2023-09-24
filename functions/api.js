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



router.get("/", (req, res) => {
    res.send("Hello This Decentaland Linked Wearables API created by CreatifyLabs");
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
                        address: "0xe9d35942278ba84303954d18fc91fd7166e70c3b",
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
                    address: "0x583793583afceeecfd54c2daf33adef80d8e20bf",
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
