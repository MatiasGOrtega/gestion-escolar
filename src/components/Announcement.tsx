import React from 'react'

function Announcement() {
  return (
    <div className='bg-white p-4 rounded-lg'>
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-semibold'>Announcement</h1>
        <span className='text-xs text-gray-400'>View All</span>
      </div>
      <div className='flex flex-col gap-4 mt-4'>
        <div className='bg-sky-100 rounded-md p-4'>
          <div className='flex items-center justify-between'>
            <h2 className='font-medium'>Lorem ipsum dolor sit</h2>
            <span className='text-xs text-gray-400 bg-white rounded-md p-1'>2025-01-01</span>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4 mt-4'>
        <div className='bg-yellow-100 rounded-md p-4'>
          <div className='flex items-center justify-between'>
            <h2 className='font-medium'>Lorem ipsum dolor sit</h2>
            <span className='text-xs text-gray-400 bg-white rounded-md p-1'>2025-01-01</span>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4 mt-4'>
        <div className='bg-purple-100 rounded-md p-4'>
          <div className='flex items-center justify-between'>
            <h2 className='font-medium'>Lorem ipsum dolor sit</h2>
            <span className='text-xs text-gray-400 bg-white rounded-md p-1'>2025-01-01</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Announcement