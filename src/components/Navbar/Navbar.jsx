import styles from './Navbar.module.css'

const Navbar = () => {
    return (
        <>
        <nav className={styles.nav_container}>
            <a className={styles.logo}>Afterlife</a>
          
                <ul className={styles.nav_list}>
                    <li>Home</li>
                    <li>
                        <a>Shop</a>
                        <div className={styles.dropdown}>
                            <a>temp</a>
                            <a>temp</a>
                        </div>
                    </li>
                </ul>
        </nav>
        </>
    )
}

export default Navbar;