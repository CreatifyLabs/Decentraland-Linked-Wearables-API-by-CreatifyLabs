const ethers = require('ethers')
const MetaWardrobe_Virtual_Mens_Fashion = require('./MetaWardrobe_Virtual_Mens_Fashion.json')
const singularHelpMen = async (tokenId, collectionName) => {
    try {
        const provider = new ethers.providers.JsonRpcProvider(
            "https://polygon-rpc.com/"
        );

        const contract = new ethers.Contract(
            MetaWardrobe_Virtual_Mens_Fashion.contractAddress,
            MetaWardrobe_Virtual_Mens_Fashion.abi,
            provider
        )

        return {
            id: `${MetaWardrobe_Virtual_Mens_Fashion.contractAddress}:${tokenId}`,
            amount: 0,
            urn: {
                decentraland: "",
            }
        };
    } catch (error) {
        return {
            id: `${MetaWardrobe_Virtual_Mens_Fashion.contractAddress}:${tokenId}`,

            amount: 0,
            urn: {
                decentraland: "",
            },
        };
    }
}



module.exports = { singularHelpMen }