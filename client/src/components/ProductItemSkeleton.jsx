import React from 'react'

const ProductItemSkeleton = () => {
  return (
    <div className='cursor-pointer animate-pulse'>
      {/* Image placeholder */}
      <div className='overflow-hidden bg-gray-200 rounded-sm' style={{ aspectRatio: '1/1.2' }}>
        <div className='w-full h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 skeleton-shimmer' />
      </div>
      {/* Name placeholder */}
      <div className='pt-3 pb-1'>
        <div className='h-3.5 bg-gray-200 rounded-full w-3/4 skeleton-shimmer' />
      </div>
      {/* Price placeholder */}
      <div className='h-3.5 bg-gray-200 rounded-full w-1/3 skeleton-shimmer' />
    </div>
  )
}

export default ProductItemSkeleton
