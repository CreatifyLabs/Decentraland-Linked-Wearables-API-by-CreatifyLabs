    const ethers = require('ethers')
    const MetaWardrobe_Virtual_Womens_Fashion = require('./MetaWardrobe_Virtual_Womens_Fashion.json')
    const singularHelpWomen = async (tokenId, collectionName) => {
        try {
            const provider = new ethers.providers.JsonRpcProvider(
                "https://polygon-rpc.com/"
            );

            const contract = new ethers.Contract(
                MetaWardrobe_Virtual_Womens_Fashion.contractAddress,
                MetaWardrobe_Virtual_Womens_Fashion.abi,
                provider
            ) 

            return {
                id: `${MetaWardrobe_Virtual_Womens_Fashion.contractAddress}:${tokenId}`,

                amount: 0,
                urn: {
                    decentraland: "",
                }
            };
        } catch (error) {
            return {
                id: `${MetaWardrobe_Virtual_Womens_Fashion.contractAddress}:${tokenId}`,

                amount: 0,
                urn: {
                    decentraland: "",
                },
            };
        }
    }



    module.exports = {singularHelpWomen}