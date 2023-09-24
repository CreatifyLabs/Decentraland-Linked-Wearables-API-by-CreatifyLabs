const ethers = require('ethers')
const MetaWardrobe_Virtual_Womens_Fashion = require('./MetaWardrobe_Virtual_Womens_Fashion.json')
const metadrobeWomenHelper = async (address, collectionName) => {
    const provider = new ethers.providers.JsonRpcProvider(
        "https://polygon-rpc.com/"
    );
    const womenContract = new ethers.Contract(
        MetaWardrobe_Virtual_Womens_Fashion.contractAddress,
        MetaWardrobe_Virtual_Womens_Fashion.abi,
        provider
    )
    let totalSupply = await womenContract.isMinted();
    totalSupply = totalSupply.toNumber();
    let index = []
    let amount = []
    for (let i = 0; i < totalSupply; i++) {
        let getdataofToken = await womenContract.balanceOf(address, i);
        let change = getdataofToken.toNumber()
        index[i] = i;
        amount[i] = change;
    }

    let assets = []
    for (let i = 0; i < index.length; i++) {
        assets.push({
            id: `0x583793583afceeecfd54c2daf33adef80d8e20bf:${amount[i].toString()}`,
            amount: 1,
            urn: {
                decentraland: `urn:decentraland:matic:collections-thirdparty:${collectionName}:0x4c1573189e308d0a4d8bec421082fa8e39eee58e:${totalSupply.toString()}`,
            },
        });
    }
    const toJson = {
        address: address,
        assets: assets,
        total: totalSupply,
        page: 1,
        next: "",
    };

    return toJson;
}


module.exports = { metadrobeWomenHelper }