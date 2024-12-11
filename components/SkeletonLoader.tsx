import { FC } from 'react'
import ContentLoader from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';



const SkeletonLoader: FC = () => {
    return (
        <div className="animate-pulse bg-gray-100 rounded-lg p-4">
            <div className="flex items-center justify-between">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
            </div>
            <div className="mt-2 h-2 bg-gray-300 rounded w-1/2"></div>
        </div>

    )
}

export default SkeletonLoader