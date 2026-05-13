import React from 'react'

const ProductDetailSkeleton = () => {
  return (
    <div className='border-t-2 pt-10 animate-pulse'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* Image gallery skeleton */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full gap-2'>
            {[...Array(4)].map((_, i) => (
              <div key={i} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 bg-gray-200 rounded skeleton-shimmer' style={{ aspectRatio: '1/1' }} />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <div className='w-full bg-gray-200 rounded skeleton-shimmer' style={{ aspectRatio: '1/1.1' }} />
          </div>
        </div>

        {/* Product info skeleton */}
        <div className='flex-1'>
          {/* Title */}
          <div className='h-7 bg-gray-200 rounded-full w-3/4 mt-2 skeleton-shimmer' />
          {/* Stars */}
          <div className='flex items-center gap-1 mt-3'>
            {[...Array(5)].map((_, i) => (
              <div key={i} className='w-4 h-4 bg-gray-200 rounded-full skeleton-shimmer' />
            ))}
            <div className='h-3.5 bg-gray-200 rounded-full w-10 ml-2 skeleton-shimmer' />
          </div>
          {/* Price */}
          <div className='h-8 bg-gray-200 rounded-full w-1/4 mt-5 skeleton-shimmer' />
          {/* Description lines */}
          <div className='mt-5 md:w-4/5 space-y-2'>
            <div className='h-3 bg-gray-200 rounded-full w-full skeleton-shimmer' />
            <div className='h-3 bg-gray-200 rounded-full w-5/6 skeleton-shimmer' />
            <div className='h-3 bg-gray-200 rounded-full w-2/3 skeleton-shimmer' />
          </div>
          {/* Stock */}
          <div className='h-3 bg-gray-200 rounded-full w-1/5 mt-4 skeleton-shimmer' />
          {/* Add to cart button */}
          <div className='h-12 bg-gray-200 rounded w-40 mt-8 skeleton-shimmer' />
          <hr className='mt-8 sm:w-4/5' />
          {/* Meta lines */}
          <div className='mt-5 space-y-2'>
            <div className='h-3 bg-gray-200 rounded-full w-2/5 skeleton-shimmer' />
            <div className='h-3 bg-gray-200 rounded-full w-3/5 skeleton-shimmer' />
            <div className='h-3 bg-gray-200 rounded-full w-2/5 skeleton-shimmer' />
          </div>
        </div>
      </div>

      {/* Description & Review section skeleton */}
      <div className='mt-20'>
        <div className='flex'>
          <div className='border px-5 py-3 h-10 bg-gray-200 w-28 rounded skeleton-shimmer' />
          <div className='border px-5 py-3 h-10 bg-gray-200 w-32 rounded skeleton-shimmer' />
        </div>
        <div className='border px-6 py-6 space-y-3'>
          <div className='h-3 bg-gray-200 rounded-full w-full skeleton-shimmer' />
          <div className='h-3 bg-gray-200 rounded-full w-5/6 skeleton-shimmer' />
          <div className='h-3 bg-gray-200 rounded-full w-4/6 skeleton-shimmer' />
        </div>
      </div>
    </div>
  )
}

export default ProductDetailSkeleton
