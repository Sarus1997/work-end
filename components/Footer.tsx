import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-200 p-6 text-center">
      <p className="text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Work End. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
