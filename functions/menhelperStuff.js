const ethers = require('ethers')
const MetaWardrobe_Virtual_Mens_Fashion = require('./MetaWardrobe_Virtual_Mens_Fashion.json')
const metadrobeMenHelper = async (address, collectionName) => {
    const provider = new ethers.providers.JsonRpcProvider(
        "https://polygon-rpc.com/"
    );
    const menContract = new ethers.Contract(
        MetaWardrobe_Virtual_Mens_Fashion.contractAddress,
        MetaWardrobe_Virtual_Mens_Fashion.abi,
        provider
    )
    const assetList = await menContract.balanceOf(address, id);
    let assetNumber = assetList.toNumber()
    let assets = []
    assets.push({
        id: `0x4c1573189e308d0a4d8bec421082fa8e39eee58e: ${assetNumber.toString()}`,
        amount: 1,
        urn: {
            decentraland: `urn:decentraland:matic:collections-thirdparty:${collectionName}:0x4c1573189e308d0a4d8bec421082fa8e39eee58e:${assetNumber.toString()}`,
        },
    });

    const toJson = {
        address: address,
        assets: id,
        total: assets,
        page: 1,
        next: "",
    };

    return toJson;
}


module.exports = { metadrobeMenHelper }