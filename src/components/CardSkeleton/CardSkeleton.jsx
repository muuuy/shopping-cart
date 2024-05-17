import Skeleton from "react-loading-skeleton";

const CardSkeleton = () => {
    <div>
        <div>
            <Skeleton count={10} height={100} />
        </div>
        <div>
            <Skeleton height={100} />
        </div>
    </div>
}

export default CardSkeleton;