import React from 'react'

interface HeaderProps {
  header: string
}

const Header: React.FC<HeaderProps> = ({ header }) => {
  return <h1>{header}</h1>
}

export default Header