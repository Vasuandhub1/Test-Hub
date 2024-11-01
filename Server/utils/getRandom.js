const getRandom=()=>{
    const random=Math.floor(1000 + Math.random() * 9000);
    return random
}

module.exports={getRandom}