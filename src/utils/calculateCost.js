const calculateCost = (pokemon) => {    
    if (pokemon) {
        console.log(50000.00 * (pokemon.types.length))
        return 5000.00 * (pokemon.types.length);
    }
}

export default calculateCost