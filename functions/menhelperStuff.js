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
        id: `0xc37059816b006c099b0cd47e9cf783b0ef9cd4e3: ${assetNumber.toString()}`,
        amount: 1,
        urn: {
            decentraland: `urn:decentraland:matic:collections-thirdparty:${collectionName}:0x6f691a8ae2e7dbf6c0e15f1757ad9b80b01196bf:${assetNumber.toString()}`,
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