import styles from './ItemCard.module.css';

const ItemCard = () => {
    
    try {
        fetch('https://fakestoreapi.com/products/1')
            .then(res=>res.json())
            .then(json=>console.log(json))
    } catch (error) {
        console.log(error);
    }

    return (
     <>
     <div className={styles.container}>
        <img></img>
     </div>
     </>   
    )
}

export default ItemCard;